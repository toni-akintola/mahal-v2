"use client";

import { useState, useEffect } from "react";
import { GameCard, GameCardContent } from "@/components/ui/game-card";
import { GameButton } from "@/components/ui/game-button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserSearch } from "@/components/social/UserSearch";
import { StudyGroupSearch } from "@/components/social/StudyGroupSearch";
import { CreateStudyGroupDialog } from "@/components/social/CreateStudyGroupDialog";
import {
  Users,
  UserPlus,
  Check,
  X,
  Clock,
  Crown,
  Shield,
  LogOut,
} from "lucide-react";
import {
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  getUserStudyGroups,
  leaveStudyGroup,
  getUserFriends,
} from "@/lib/actions/social-actions";
import { toast } from "sonner";

interface Friend {
  id: string;
  displayName: string | null;
  imageUrl: string | null;
  level: number;
  currentStreak: number;
  status: "online" | "offline";
}

interface FriendRequest {
  id: string;
  user: {
    id: string;
    clerkUserId: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    currentStreak: number;
  };
  createdAt: Date;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  memberCount: number;
  maxMembers: number;
  userRole: string;
  members: Array<{
    id: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    role: string;
  }>;
}

export function SocialDashboard() {
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<{
    received: FriendRequest[];
    sent: FriendRequest[];
  }>({ received: [], sent: [] });
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showGroupSearch, setShowGroupSearch] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  useEffect(() => {
    loadSocialData();
  }, []);

  const loadSocialData = async () => {
    try {
      setLoading(true);

      // Load all social data in parallel
      const [friendsData, requestsData, groupsData] = await Promise.all([
        getUserFriends(),
        getFriendRequests(),
        getUserStudyGroups(),
      ]);

      setFriends(friendsData || []);
      setFriendRequests(requestsData);
      setStudyGroups(groupsData);
    } catch (error) {
      console.error("Error loading social data:", error);
      toast.error("Failed to load social data");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptFriendRequest = async (requestId: string) => {
    const result = await acceptFriendRequest(requestId);
    if (result.success) {
      toast.success(result.message);
      loadSocialData(); // Refresh data
    } else {
      toast.error(result.message);
    }
  };

  const handleDeclineFriendRequest = async (requestId: string) => {
    const result = await declineFriendRequest(requestId);
    if (result.success) {
      toast.success(result.message);
      loadSocialData(); // Refresh data
    } else {
      toast.error(result.message);
    }
  };

  const handleRemoveFriend = async (friendshipId: string) => {
    const result = await removeFriend(friendshipId);
    if (result.success) {
      toast.success(result.message);
      loadSocialData(); // Refresh data
    } else {
      toast.error(result.message);
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    const result = await leaveStudyGroup(groupId);
    if (result.success) {
      toast.success(result.message);
      loadSocialData(); // Refresh data
    } else {
      toast.error(result.message);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4 text-yellow-400" />;
      case "moderator":
        return <Shield className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <GameCard key={i}>
              <GameCardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </GameCardContent>
            </GameCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-card rounded-2xl p-1">
          <TabsTrigger
            value="friends"
            className="flex items-center gap-2 rounded-xl"
          >
            <Users className="w-4 h-4" />
            Friends
            {friends.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {friends.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="requests"
            className="flex items-center gap-2 rounded-xl"
          >
            <UserPlus className="w-4 h-4" />
            Requests
            {friendRequests.received.length > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {friendRequests.received.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="groups"
            className="flex items-center gap-2 rounded-xl"
          >
            <Users className="w-4 h-4" />
            Groups
            {studyGroups.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {studyGroups.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Friends
              </h2>
              <GameButton
                variant="outline"
                onClick={() => setShowUserSearch(true)}
                className="font-medium"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Friend
              </GameButton>
            </div>

            {friends.length === 0 ? (
              <GameCard>
                <GameCardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    No Friends Yet
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Connect with other learners to stay motivated and practice
                    together.
                  </p>
                  <GameButton
                    variant="primary"
                    onClick={() => setShowUserSearch(true)}
                  >
                    Find Friends
                  </GameButton>
                </GameCardContent>
              </GameCard>
            ) : (
              <div className="grid gap-4">
                {friends.map((friend) => (
                  <GameCard key={friend.id} variant="social">
                    <GameCardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={friend.imageUrl || ""} />
                              <AvatarFallback>
                                {friend.displayName?.[0]?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                                friend.status === "online"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-foreground">
                              {friend.displayName || "Anonymous User"}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>Level {friend.level}</span>
                              <span>{friend.currentStreak} day streak</span>
                              <span
                                className={
                                  friend.status === "online"
                                    ? "text-green-400"
                                    : "text-muted-foreground"
                                }
                              >
                                {friend.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <GameButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFriend(friend.id)}
                          className="text-muted-foreground hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </GameButton>
                      </div>
                    </GameCardContent>
                  </GameCard>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Friend Requests
            </h2>

            {friendRequests.received.length === 0 &&
            friendRequests.sent.length === 0 ? (
              <GameCard>
                <GameCardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    No Pending Requests
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    No friend requests at the moment.
                  </p>
                </GameCardContent>
              </GameCard>
            ) : (
              <div className="space-y-6">
                {friendRequests.received.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Received ({friendRequests.received.length})
                    </h3>
                    <div className="grid gap-4">
                      {friendRequests.received.map((request) => (
                        <GameCard key={request.id} variant="social">
                          <GameCardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage
                                    src={request.user.imageUrl || ""}
                                  />
                                  <AvatarFallback>
                                    {request.user.displayName?.[0]?.toUpperCase() ||
                                      "U"}
                                  </AvatarFallback>
                                </Avatar>

                                <div>
                                  <p className="font-semibold text-foreground">
                                    {request.user.displayName ||
                                      "Anonymous User"}
                                  </p>
                                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span>Level {request.user.level}</span>
                                    <span>
                                      {request.user.currentStreak} day streak
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <GameButton
                                  variant="primary"
                                  size="sm"
                                  onClick={() =>
                                    handleAcceptFriendRequest(request.id)
                                  }
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Accept
                                </GameButton>
                                <GameButton
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeclineFriendRequest(request.id)
                                  }
                                  className="text-muted-foreground hover:text-red-400"
                                >
                                  <X className="w-4 h-4" />
                                </GameButton>
                              </div>
                            </div>
                          </GameCardContent>
                        </GameCard>
                      ))}
                    </div>
                  </div>
                )}

                {friendRequests.sent.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Sent ({friendRequests.sent.length})
                    </h3>
                    <div className="grid gap-4">
                      {friendRequests.sent.map((request) => (
                        <GameCard key={request.id} variant="social">
                          <GameCardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage
                                    src={request.user.imageUrl || ""}
                                  />
                                  <AvatarFallback>
                                    {request.user.displayName?.[0]?.toUpperCase() ||
                                      "U"}
                                  </AvatarFallback>
                                </Avatar>

                                <div>
                                  <p className="font-semibold text-foreground">
                                    {request.user.displayName ||
                                      "Anonymous User"}
                                  </p>
                                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span>Level {request.user.level}</span>
                                    <span>
                                      {request.user.currentStreak} day streak
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">Pending</span>
                              </div>
                            </div>
                          </GameCardContent>
                        </GameCard>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Study Groups
              </h2>
              <div className="flex gap-2">
                <GameButton
                  variant="outline"
                  onClick={() => setShowGroupSearch(true)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Find Groups
                </GameButton>
                <GameButton
                  variant="primary"
                  onClick={() => setShowCreateGroup(true)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Create Group
                </GameButton>
              </div>
            </div>

            {studyGroups.length === 0 ? (
              <GameCard>
                <GameCardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    No Study Groups Yet
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Join or create a study group to learn with friends and stay
                    motivated together.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <GameButton
                      variant="primary"
                      onClick={() => setShowCreateGroup(true)}
                    >
                      Create Group
                    </GameButton>
                    <GameButton
                      variant="outline"
                      onClick={() => setShowGroupSearch(true)}
                    >
                      Find Groups
                    </GameButton>
                  </div>
                </GameCardContent>
              </GameCard>
            ) : (
              <div className="grid gap-4">
                {studyGroups.map((group) => (
                  <GameCard key={group.id} variant="social">
                    <GameCardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">
                              {group.name}
                            </h3>
                            {getRoleIcon(group.userRole)}
                          </div>
                          {group.description && (
                            <p className="text-muted-foreground text-sm mb-3">
                              {group.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                              {group.memberCount}/{group.maxMembers} members
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {group.userRole}
                            </Badge>
                          </div>
                        </div>

                        <GameButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLeaveGroup(group.id)}
                          className="text-muted-foreground hover:text-red-400"
                        >
                          <LogOut className="w-4 h-4" />
                        </GameButton>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Members:
                        </span>
                        <div className="flex -space-x-2">
                          {group.members.slice(0, 5).map((member) => (
                            <Avatar
                              key={member.id}
                              className="w-8 h-8 border-2 border-background"
                            >
                              <AvatarImage src={member.imageUrl || ""} />
                              <AvatarFallback className="text-xs">
                                {member.displayName?.[0]?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {group.memberCount > 5 && (
                            <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                +{group.memberCount - 5}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </GameCardContent>
                  </GameCard>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {showUserSearch && (
        <UserSearch
          onClose={() => setShowUserSearch(false)}
          onRequestSent={() => {
            setShowUserSearch(false);
            loadSocialData();
          }}
        />
      )}

      {showGroupSearch && (
        <StudyGroupSearch
          onClose={() => setShowGroupSearch(false)}
          onGroupJoined={() => {
            setShowGroupSearch(false);
            loadSocialData();
          }}
        />
      )}

      {showCreateGroup && (
        <CreateStudyGroupDialog
          onClose={() => setShowCreateGroup(false)}
          onGroupCreated={() => {
            setShowCreateGroup(false);
            loadSocialData();
          }}
        />
      )}
    </div>
  );
}
