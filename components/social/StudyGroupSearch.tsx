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
import { Search, Users, X, Loader2 } from "lucide-react";
import {
  searchPublicStudyGroups,
  joinStudyGroup,
} from "@/lib/actions/social-actions";

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  memberCount: number;
  maxMembers: number;
  members: Array<{
    id: string;
    displayName: string | null;
    imageUrl: string | null;
    level: number;
    role: string;
  }>;
  createdAt: Date;
}

interface StudyGroupSearchProps {
  onClose: () => void;
  onGroupJoined: () => void;
}

export function StudyGroupSearch({
  onClose,
  onGroupJoined,
}: StudyGroupSearchProps) {
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [joiningGroups, setJoiningGroups] = useState<Set<string>>(new Set());

  const searchGroups = useCallback(async (searchQuery: string) => {
    try {
      setLoading(true);
      const groupsData = await searchPublicStudyGroups(searchQuery);
      setGroups(groupsData);
    } catch (error) {
      console.error("Error searching groups:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchGroups(query);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, searchGroups]);

  // Load initial groups on mount
  useEffect(() => {
    searchGroups("");
  }, [searchGroups]);

  const handleJoinGroup = async (groupId: string) => {
    setJoiningGroups((prev) => new Set(prev).add(groupId));

    try {
      const result = await joinStudyGroup(groupId);
      if (result.success) {
        onGroupJoined();
      }
    } catch (error) {
      console.error("Error joining group:", error);
    } finally {
      setJoiningGroups((prev) => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <GameCard className="w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <GameCardHeader>
          <div className="flex items-center justify-between">
            <GameCardTitle>Find Study Groups</GameCardTitle>
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
                placeholder="Search study groups..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>

            <div className="max-h-96 overflow-y-auto space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : groups.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No public study groups found
                </div>
              ) : (
                groups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 bg-muted/30 rounded-xl border border-border space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {group.name}
                        </h3>
                        {group.description && (
                          <p className="text-muted-foreground text-sm mb-2">
                            {group.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {group.memberCount}/{group.maxMembers} members
                          </span>
                          <Badge
                            variant="outline"
                            className={
                              group.memberCount >= group.maxMembers
                                ? "border-red-400 text-red-400"
                                : ""
                            }
                          >
                            {group.memberCount >= group.maxMembers
                              ? "Full"
                              : "Open"}
                          </Badge>
                        </div>
                      </div>

                      <GameButton
                        variant="primary"
                        size="sm"
                        onClick={() => handleJoinGroup(group.id)}
                        disabled={
                          joiningGroups.has(group.id) ||
                          group.memberCount >= group.maxMembers
                        }
                      >
                        {joiningGroups.has(group.id) ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Users className="w-4 h-4 mr-1" />
                            Join Group
                          </>
                        )}
                      </GameButton>
                    </div>

                    {group.members.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Members:
                        </span>
                        <div className="flex -space-x-2">
                          {group.members.map((member) => (
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
                          {group.memberCount > group.members.length && (
                            <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                +{group.memberCount - group.members.length}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
