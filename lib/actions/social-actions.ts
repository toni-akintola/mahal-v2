"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  users,
  friendships,
  studyGroups,
  studyGroupMembers,
} from "@/lib/db/schema";
import { eq, and, or, notInArray, ilike, desc, count, asc } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { UserService } from "@/lib/services/user-service";
import type { FriendRequest } from "@/types/types";

// Helper function to get user and throw error if not found
async function getRequiredUser(clerkUserId: string) {
  const user = await UserService.getUserByClerkId(clerkUserId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

// Friend Request Actions
export async function sendFriendRequest(friendClerkUserId: string) {
  try {
    const { userId: currentClerkUserId } = await auth();
    if (!currentClerkUserId) {
      throw new Error("Not authenticated");
    }

    if (currentClerkUserId === friendClerkUserId) {
      throw new Error("Cannot send friend request to yourself");
    }

    // Get current user and target friend
    const currentUser = await getRequiredUser(currentClerkUserId);
    const friendUserResult = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, friendClerkUserId))
      .limit(1);

    if (friendUserResult.length === 0) {
      throw new Error("User not found");
    }

    const friendUser = friendUserResult[0];

    // Check if friendship already exists
    const existingFriendshipResult = await db
      .select()
      .from(friendships)
      .where(
        or(
          and(
            eq(friendships.userId, currentUser.id),
            eq(friendships.friendId, friendUser.id),
          ),
          and(
            eq(friendships.userId, friendUser.id),
            eq(friendships.friendId, currentUser.id),
          ),
        ),
      )
      .limit(1);

    if (existingFriendshipResult.length > 0) {
      const existingFriendship = existingFriendshipResult[0];
      if (existingFriendship.status === "accepted") {
        throw new Error("Already friends");
      } else if (existingFriendship.status === "pending") {
        throw new Error("Friend request already sent");
      } else if (existingFriendship.status === "blocked") {
        throw new Error("Cannot send friend request");
      }
    }

    // Create friendship
    await db.insert(friendships).values({
      id: nanoid(),
      userId: currentUser.id,
      friendId: friendUser.id,
      status: "pending",
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Friend request sent successfully" };
  } catch (error) {
    console.error("Error sending friend request:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to send friend request",
    };
  }
}

export async function acceptFriendRequest(friendshipId: string) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Update friendship status
    const friendshipResult = await db
      .update(friendships)
      .set({
        status: "accepted",
        acceptedAt: new Date(),
      })
      .where(
        and(
          eq(friendships.id, friendshipId),
          eq(friendships.friendId, user.id), // Only the recipient can accept
          eq(friendships.status, "pending"),
        ),
      )
      .returning();

    if (friendshipResult.length === 0) {
      throw new Error("Friend request not found or already processed");
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Friend request accepted" };
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to accept friend request",
    };
  }
}

export async function declineFriendRequest(friendshipId: string) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Delete the friendship request
    await db.delete(friendships).where(
      and(
        eq(friendships.id, friendshipId),
        eq(friendships.friendId, user.id), // Only the recipient can decline
        eq(friendships.status, "pending"),
      ),
    );

    revalidatePath("/dashboard");
    return { success: true, message: "Friend request declined" };
  } catch (error) {
    console.error("Error declining friend request:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to decline friend request",
    };
  }
}

export async function removeFriend(friendshipId: string) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Delete the friendship
    await db
      .delete(friendships)
      .where(
        and(
          eq(friendships.id, friendshipId),
          or(
            and(
              eq(friendships.userId, user.id),
              eq(friendships.status, "accepted"),
            ),
            and(
              eq(friendships.friendId, user.id),
              eq(friendships.status, "accepted"),
            ),
          ),
        ),
      );

    revalidatePath("/dashboard");
    return { success: true, message: "Friend removed successfully" };
  } catch (error) {
    console.error("Error removing friend:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to remove friend",
    };
  }
}

export async function getFriendRequests() {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Create an alias for the user table to join with friendships
    const senderUser = alias(users, "senderUser");
    const receiverUser = alias(users, "receiverUser");

    // Get pending friend requests received by this user
    const receivedRequests = await db
      .select({
        id: friendships.id,
        userId: friendships.userId,
        friendId: friendships.friendId,
        status: friendships.status,
        createdAt: friendships.createdAt,
        acceptedAt: friendships.acceptedAt,
        user: {
          id: senderUser.id,
          clerkUserId: senderUser.clerkUserId,
          displayName: senderUser.displayName,
          imageUrl: senderUser.imageUrl,
          level: senderUser.level,
          currentStreak: senderUser.currentStreak,
          lastActiveAt: senderUser.lastActiveAt,
        },
      })
      .from(friendships)
      .innerJoin(senderUser, eq(friendships.userId, senderUser.id))
      .where(
        and(
          eq(friendships.friendId, user.id),
          eq(friendships.status, "pending"),
        ),
      )
      .orderBy(desc(friendships.createdAt));

    // Get pending friend requests sent by this user
    const sentRequests = await db
      .select({
        id: friendships.id,
        userId: friendships.userId,
        friendId: friendships.friendId,
        status: friendships.status,
        createdAt: friendships.createdAt,
        acceptedAt: friendships.acceptedAt,
        friend: {
          id: receiverUser.id,
          clerkUserId: receiverUser.clerkUserId,
          displayName: receiverUser.displayName,
          imageUrl: receiverUser.imageUrl,
          level: receiverUser.level,
          currentStreak: receiverUser.currentStreak,
          lastActiveAt: receiverUser.lastActiveAt,
        },
      })
      .from(friendships)
      .innerJoin(receiverUser, eq(friendships.friendId, receiverUser.id))
      .where(
        and(eq(friendships.userId, user.id), eq(friendships.status, "pending")),
      )
      .orderBy(desc(friendships.createdAt));

    return {
      received: receivedRequests.map(
        (req): FriendRequest => ({
          id: req.id,
          user: req.user,
          createdAt: req.createdAt,
        }),
      ),
      sent: sentRequests.map(
        (req): FriendRequest => ({
          id: req.id,
          user: req.friend,
          createdAt: req.createdAt,
        }),
      ),
    };
  } catch (error) {
    console.error("Error getting friend requests:", error);
    return { received: [], sent: [] };
  }
}

export async function getUserFriends() {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    return await UserService.getUserFriends(clerkUserId);
  } catch (error) {
    console.error("Error getting user friends:", error);
    return [];
  }
}

// Study Group Actions
export async function createStudyGroup(
  name: string,
  description: string,
  isPublic: boolean = true,
  maxMembers: number = 20,
) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Create study group
    const studyGroupResult = await db
      .insert(studyGroups)
      .values({
        id: nanoid(),
        name,
        description,
        isPublic,
        maxMembers,
      })
      .returning();

    const studyGroup = studyGroupResult[0];

    // Add creator as admin
    await db.insert(studyGroupMembers).values({
      id: nanoid(),
      userId: user.id,
      studyGroupId: studyGroup.id,
      role: "admin",
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Study group created successfully",
      groupId: studyGroup.id,
    };
  } catch (error) {
    console.error("Error creating study group:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create study group",
    };
  }
}

export async function joinStudyGroup(groupId: string) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Check if group exists
    const studyGroupResult = await db
      .select()
      .from(studyGroups)
      .where(eq(studyGroups.id, groupId))
      .limit(1);

    if (studyGroupResult.length === 0) {
      throw new Error("Study group not found");
    }

    const studyGroup = studyGroupResult[0];

    // Count current members
    const memberCountResult = await db
      .select({ count: count() })
      .from(studyGroupMembers)
      .where(eq(studyGroupMembers.studyGroupId, groupId));

    const memberCount = memberCountResult[0]?.count || 0;

    if (memberCount >= studyGroup.maxMembers) {
      throw new Error("Study group is full");
    }

    // Check if already a member
    const existingMemberResult = await db
      .select()
      .from(studyGroupMembers)
      .where(
        and(
          eq(studyGroupMembers.userId, user.id),
          eq(studyGroupMembers.studyGroupId, groupId),
        ),
      )
      .limit(1);

    if (existingMemberResult.length > 0) {
      throw new Error("Already a member of this study group");
    }

    // Add as member
    await db.insert(studyGroupMembers).values({
      id: nanoid(),
      userId: user.id,
      studyGroupId: groupId,
      role: "member",
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Joined study group successfully" };
  } catch (error) {
    console.error("Error joining study group:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to join study group",
    };
  }
}

export async function leaveStudyGroup(groupId: string) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Remove membership
    await db
      .delete(studyGroupMembers)
      .where(
        and(
          eq(studyGroupMembers.userId, user.id),
          eq(studyGroupMembers.studyGroupId, groupId),
        ),
      );

    // If this was the last admin, promote another member or delete group
    const remainingMembers = await db
      .select()
      .from(studyGroupMembers)
      .where(eq(studyGroupMembers.studyGroupId, groupId))
      .orderBy(asc(studyGroupMembers.joinedAt));

    const remainingAdmins = remainingMembers.filter((m) => m.role === "admin");

    if (remainingAdmins.length === 0 && remainingMembers.length > 0) {
      // Promote the oldest member to admin
      const oldestMember = remainingMembers[0];

      await db
        .update(studyGroupMembers)
        .set({ role: "admin" })
        .where(eq(studyGroupMembers.id, oldestMember.id));
    } else if (remainingMembers.length === 0) {
      // Delete empty group
      await db.delete(studyGroups).where(eq(studyGroups.id, groupId));
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Left study group successfully" };
  } catch (error) {
    console.error("Error leaving study group:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to leave study group",
    };
  }
}

export async function getUserStudyGroups() {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Get user's study group memberships with group details
    const membershipResults = await db
      .select({
        membershipId: studyGroupMembers.id,
        userRole: studyGroupMembers.role,
        joinedAt: studyGroupMembers.joinedAt,
        groupId: studyGroups.id,
        groupName: studyGroups.name,
        groupDescription: studyGroups.description,
        groupIsPublic: studyGroups.isPublic,
        groupMaxMembers: studyGroups.maxMembers,
        groupCreatedAt: studyGroups.createdAt,
      })
      .from(studyGroupMembers)
      .innerJoin(
        studyGroups,
        eq(studyGroupMembers.studyGroupId, studyGroups.id),
      )
      .where(eq(studyGroupMembers.userId, user.id))
      .orderBy(desc(studyGroupMembers.joinedAt));

    // For each group, get all members
    const groupsWithMembers = await Promise.all(
      membershipResults.map(async (membership) => {
        const membersResult = await db
          .select({
            id: users.id,
            displayName: users.displayName,
            imageUrl: users.imageUrl,
            level: users.level,
            role: studyGroupMembers.role,
            joinedAt: studyGroupMembers.joinedAt,
          })
          .from(studyGroupMembers)
          .innerJoin(users, eq(studyGroupMembers.userId, users.id))
          .where(eq(studyGroupMembers.studyGroupId, membership.groupId));

        return {
          id: membership.groupId,
          name: membership.groupName,
          description: membership.groupDescription,
          isPublic: membership.groupIsPublic,
          maxMembers: membership.groupMaxMembers,
          memberCount: membersResult.length,
          members: membersResult,
          userRole: membership.userRole,
          joinedAt: membership.joinedAt,
        };
      }),
    );

    return groupsWithMembers;
  } catch (error) {
    console.error("Error getting user study groups:", error);
    return [];
  }
}

export async function searchPublicStudyGroups(query: string = "") {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      throw new Error("Not authenticated");
    }

    const user = await getRequiredUser(clerkUserId);

    // Get user's current group memberships
    const userMemberships = await db
      .select({ studyGroupId: studyGroupMembers.studyGroupId })
      .from(studyGroupMembers)
      .where(eq(studyGroupMembers.userId, user.id));

    const userGroupIds = userMemberships.map((m) => m.studyGroupId);

    // Build the where condition
    const conditions = [eq(studyGroups.isPublic, true)];

    // Exclude groups user is already in
    if (userGroupIds.length > 0) {
      conditions.push(notInArray(studyGroups.id, userGroupIds));
    }

    // Add search query condition if provided
    if (query) {
      conditions.push(ilike(studyGroups.name, `%${query}%`));
    }

    const whereCondition =
      conditions.length > 1 ? and(...conditions) : conditions[0];

    // First get study groups with member counts
    const studyGroupsWithCounts = await db
      .select({
        id: studyGroups.id,
        name: studyGroups.name,
        description: studyGroups.description,
        maxMembers: studyGroups.maxMembers,
        createdAt: studyGroups.createdAt,
        memberCount: count(studyGroupMembers.id),
      })
      .from(studyGroups)
      .leftJoin(
        studyGroupMembers,
        eq(studyGroups.id, studyGroupMembers.studyGroupId),
      )
      .where(whereCondition)
      .groupBy(
        studyGroups.id,
        studyGroups.name,
        studyGroups.description,
        studyGroups.maxMembers,
        studyGroups.createdAt,
      )
      .orderBy(desc(count(studyGroupMembers.id)), desc(studyGroups.createdAt))
      .limit(20);

    // For each group, get first 3 members as preview
    const groupsWithMembers = await Promise.all(
      studyGroupsWithCounts.map(async (group) => {
        const membersPreview = await db
          .select({
            id: users.id,
            displayName: users.displayName,
            imageUrl: users.imageUrl,
            level: users.level,
            role: studyGroupMembers.role,
          })
          .from(studyGroupMembers)
          .innerJoin(users, eq(studyGroupMembers.userId, users.id))
          .where(eq(studyGroupMembers.studyGroupId, group.id))
          .limit(3);

        return {
          id: group.id,
          name: group.name,
          description: group.description,
          maxMembers: group.maxMembers,
          memberCount: group.memberCount,
          members: membersPreview,
          createdAt: group.createdAt,
        };
      }),
    );

    return groupsWithMembers;
  } catch (error) {
    console.error("Error searching study groups:", error);
    return [];
  }
}
