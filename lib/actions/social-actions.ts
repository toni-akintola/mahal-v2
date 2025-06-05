/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { UserService } from "@/lib/services/user-service";
import type { FriendRequest } from "@/types/types";

// Custom interfaces for database returns with Prisma includes
interface FriendshipWithUser {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  createdAt: Date;
  acceptedAt: Date | null;
  user: {
    id: string;
    clerkUserId: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    currentStreak: number;
    lastActiveAt: Date;
  };
}

interface FriendshipWithFriend {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  createdAt: Date;
  acceptedAt: Date | null;
  friend: {
    id: string;
    clerkUserId: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    currentStreak: number;
    lastActiveAt: Date;
  };
}

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
    const friendUser = await db.user.findUnique({
      where: { clerkUserId: friendClerkUserId },
    });

    if (!friendUser) {
      throw new Error("User not found");
    }

    // Check if friendship already exists
    const existingFriendship = await db.friendship.findFirst({
      where: {
        OR: [
          { userId: currentUser.id, friendId: friendUser.id },
          { userId: friendUser.id, friendId: currentUser.id },
        ],
      },
    });

    if (existingFriendship) {
      if (existingFriendship.status === "accepted") {
        throw new Error("Already friends");
      } else if (existingFriendship.status === "pending") {
        throw new Error("Friend request already sent");
      } else if (existingFriendship.status === "blocked") {
        throw new Error("Cannot send friend request");
      }
    }

    // Create friendship
    await db.friendship.create({
      data: {
        userId: currentUser.id,
        friendId: friendUser.id,
        status: "pending",
      },
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
    const friendship = await db.friendship.update({
      where: {
        id: friendshipId,
        friendId: user.id, // Only the recipient can accept
        status: "pending",
      },
      data: {
        status: "accepted",
        acceptedAt: new Date(),
      },
    });

    if (!friendship) {
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
    await db.friendship.delete({
      where: {
        id: friendshipId,
        friendId: user.id, // Only the recipient can decline
        status: "pending",
      },
    });

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
    await db.friendship.delete({
      where: {
        id: friendshipId,
        OR: [
          { userId: user.id, status: "accepted" },
          { friendId: user.id, status: "accepted" },
        ],
      },
    });

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

    // Get pending friend requests received by this user
    const receivedRequests = await db.friendship.findMany({
      where: {
        friendId: user.id,
        status: "pending",
      },
      include: {
        user: {
          select: {
            id: true,
            clerkUserId: true,
            displayName: true,
            imageUrl: true,
            level: true,
            currentStreak: true,
            lastActiveAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get pending friend requests sent by this user
    const sentRequests = await db.friendship.findMany({
      where: {
        userId: user.id,
        status: "pending",
      },
      include: {
        friend: {
          select: {
            id: true,
            clerkUserId: true,
            displayName: true,
            imageUrl: true,
            level: true,
            currentStreak: true,
            lastActiveAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      received: receivedRequests.map((req: FriendshipWithUser): FriendRequest => ({
        id: req.id,
        user: req.user,
        createdAt: req.createdAt,
      })),
      sent: sentRequests.map((req: FriendshipWithFriend): FriendRequest => ({
        id: req.id,
        user: req.friend,
        createdAt: req.createdAt,
      })),
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
    const studyGroup = await db.studyGroup.create({
      data: {
        name,
        description,
        isPublic,
        maxMembers,
      },
    });

    // Add creator as admin
    await db.studyGroupMember.create({
      data: {
        userId: user.id,
        studyGroupId: studyGroup.id,
        role: "admin",
      },
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

    // Check if group exists and has space
    const studyGroup = await db.studyGroup.findUnique({
      where: { id: groupId },
      include: {
        members: true,
      },
    });

    if (!studyGroup) {
      throw new Error("Study group not found");
    }

    if (studyGroup.members.length >= studyGroup.maxMembers) {
      throw new Error("Study group is full");
    }

    // Check if already a member
    const existingMember = await db.studyGroupMember.findUnique({
      where: {
        userId_studyGroupId: {
          userId: user.id,
          studyGroupId: groupId,
        },
      },
    });

    if (existingMember) {
      throw new Error("Already a member of this study group");
    }

    // Add as member
    await db.studyGroupMember.create({
      data: {
        userId: user.id,
        studyGroupId: groupId,
        role: "member",
      },
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
    await db.studyGroupMember.delete({
      where: {
        userId_studyGroupId: {
          userId: user.id,
          studyGroupId: groupId,
        },
      },
    });

    // If this was the last admin, promote another member or delete group
    const remainingMembers = await db.studyGroupMember.findMany({
      where: { studyGroupId: groupId },
    });

    const remainingAdmins = remainingMembers.filter((m: { role: string; }) => (m as { role: string }).role === "admin");

    if (remainingAdmins.length === 0 && remainingMembers.length > 0) {
      // Promote the oldest member to admin
      const oldestMember = remainingMembers.sort(
        (a: { joinedAt: Date; }, b: { joinedAt: Date; }) => (a as { joinedAt: Date }).joinedAt.getTime() - (b as { joinedAt: Date }).joinedAt.getTime(),
      )[0];

      await db.studyGroupMember.update({
        where: { id: oldestMember.id },
        data: { role: "admin" },
      });
    } else if (remainingMembers.length === 0) {
      // Delete empty group
      await db.studyGroup.delete({
        where: { id: groupId },
      });
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

    const memberships = await db.studyGroupMember.findMany({
      where: { userId: user.id },
      include: {
        studyGroup: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    displayName: true,
                    imageUrl: true,
                    level: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        joinedAt: "desc",
      },
    });

    return memberships.map((membership: any) => ({
      id: membership.studyGroup.id,
      name: membership.studyGroup.name,
      description: membership.studyGroup.description,
      isPublic: membership.studyGroup.isPublic,
      maxMembers: membership.studyGroup.maxMembers,
      memberCount: membership.studyGroup.members.length,
      members: membership.studyGroup.members.map((m: any) => ({
        ...m.user,
        role: m.role,
        joinedAt: m.joinedAt,
      })),
      userRole: membership.role,
      joinedAt: membership.joinedAt,
    }));
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
    const userMemberships = await db.studyGroupMember.findMany({
      where: { userId: user.id },
      select: { studyGroupId: true },
    });

    const userGroupIds = userMemberships.map((m: any) => m.studyGroupId);

    const studyGroups = await db.studyGroup.findMany({
      where: {
        isPublic: true,
        id: { notIn: userGroupIds }, // Exclude groups user is already in
        OR: query
          ? [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ]
          : undefined,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                imageUrl: true,
                level: true,
              },
            },
          },
        },
      },
      orderBy: [
        { members: { _count: "desc" } }, // Most popular first
        { createdAt: "desc" },
      ],
      take: 20,
    });

    return studyGroups.map((group: any) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      maxMembers: group.maxMembers,
      memberCount: group.members.length,
      members: group.members.slice(0, 3).map((m: any) => ({
        // Show first 3 members as preview
        ...m.user,
        role: m.role,
      })),
      createdAt: group.createdAt,
    }));
  } catch (error) {
    console.error("Error searching study groups:", error);
    return [];
  }
}
