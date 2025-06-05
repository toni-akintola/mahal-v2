"use client";

import { useState, useEffect, useCallback } from "react";
import {
  GameCard,
  GameCardContent,
  GameCardHeader,
  GameCardTitle,
} from "@/components/ui/game-card";
import { GameButton } from "@/components/ui/game-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, X, Loader2 } from "lucide-react";
import { sendFriendRequest } from "@/lib/actions/social-actions";

interface User {
  id: string;
  clerkUserId: string;
  displayName: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  level: number;
  currentStreak: number;
  status: "online" | "offline";
}

interface UserSearchProps {
  onClose: () => void;
  onRequestSent: () => void;
}

export function UserSearch({ onClose, onRequestSent }: UserSearchProps) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingRequests, setSendingRequests] = useState<Set<string>>(
    new Set(),
  );

  const searchUsers = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `/api/search/users?q=${encodeURIComponent(searchQuery)}`,
      );
      const data = await response.json();

      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchUsers(query);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, searchUsers]);

  const handleSendFriendRequest = async (userClerkId: string) => {
    setSendingRequests((prev) => new Set(prev).add(userClerkId));

    try {
      const result = await sendFriendRequest(userClerkId);
      if (result.success) {
        onRequestSent();
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setSendingRequests((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userClerkId);
        return newSet;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <GameCard className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <GameCardHeader>
          <div className="flex items-center justify-between">
            <GameCardTitle>Find Friends</GameCardTitle>
            <GameButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="w-4 h-4" />
            </GameButton>
          </div>
        </GameCardHeader>

        <GameCardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {query.length < 2
                    ? "Type at least 2 characters to search"
                    : "No users found"}
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.imageUrl || ""} />
                          <AvatarFallback>
                            {user.displayName?.[0]?.toUpperCase() ||
                              user.firstName?.[0]?.toUpperCase() ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                            user.status === "online"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-foreground">
                          {user.displayName ||
                            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                            "Anonymous User"}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Level {user.level}</span>
                          <span>{user.currentStreak} day streak</span>
                          <Badge
                            variant="outline"
                            className={
                              user.status === "online"
                                ? "border-green-400 text-green-400"
                                : ""
                            }
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <GameButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleSendFriendRequest(user.clerkUserId)}
                      disabled={sendingRequests.has(user.clerkUserId)}
                    >
                      {sendingRequests.has(user.clerkUserId) ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-1" />
                          Add Friend
                        </>
                      )}
                    </GameButton>
                  </div>
                ))
              )}
            </div>
          </div>
        </GameCardContent>
      </GameCard>
    </div>
  );
}
