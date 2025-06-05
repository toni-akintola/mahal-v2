"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GameButton } from "@/components/ui/game-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Lock, Loader2, Sparkles, BookOpen } from "lucide-react";
import { createStudyGroup } from "@/lib/actions/social-actions";
import { toast } from "sonner";

interface CreateStudyGroupDialogProps {
  onClose: () => void;
  onGroupCreated: () => void;
}

export function CreateStudyGroupDialog({
  onClose,
  onGroupCreated,
}: CreateStudyGroupDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxMembers: 20,
    isPublic: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    setLoading(true);

    try {
      const result = await createStudyGroup(
        formData.name.trim(),
        formData.description.trim(),
        formData.isPublic,
        formData.maxMembers,
      );

      if (result.success) {
        toast.success(result.message);
        onGroupCreated();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error creating study group:", error);
      toast.error("Failed to create study group");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="space-y-4 pb-2 shrink-0">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Create Study Group
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Start your own learning community and connect with fellow Tagalog
            learners
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-1">
          <form onSubmit={handleSubmit} className="space-y-6 pt-2 pb-6">
            {/* Group Name */}
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-foreground flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-blue-500" />
                Group Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Advanced Tagalog Speakers"
                maxLength={50}
                required
                className="h-12 bg-muted/50 border-border focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-muted-foreground">
                {formData.name.length}/50 characters
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-foreground"
              >
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe your study group's goals and what members can expect..."
                maxLength={200}
                rows={4}
                className="resize-none bg-muted/50 border-border focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/200 characters
              </p>
            </div>

            {/* Max Members */}
            <div className="space-y-3">
              <Label
                htmlFor="maxMembers"
                className="text-sm font-semibold text-foreground flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-green-500" />
                Maximum Members
              </Label>
              <div className="relative">
                <Input
                  id="maxMembers"
                  type="number"
                  value={formData.maxMembers}
                  onChange={(e) =>
                    handleInputChange(
                      "maxMembers",
                      parseInt(e.target.value) || 20,
                    )
                  }
                  min={2}
                  max={100}
                  className="h-12 bg-muted/50 border-border focus:border-blue-500 transition-colors pr-16"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Badge variant="outline" className="bg-background">
                    2-100
                  </Badge>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-foreground">
                Group Visibility
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange("isPublic", true)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.isPublic
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-border bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Globe
                      className={`w-6 h-6 ${formData.isPublic ? "text-blue-500" : "text-muted-foreground"}`}
                    />
                    <span
                      className={`font-medium text-sm ${formData.isPublic ? "text-blue-500" : "text-foreground"}`}
                    >
                      Public
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      Anyone can find and join
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange("isPublic", false)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    !formData.isPublic
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-border bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Lock
                      className={`w-6 h-6 ${!formData.isPublic ? "text-purple-500" : "text-muted-foreground"}`}
                    />
                    <span
                      className={`font-medium text-sm ${!formData.isPublic ? "text-purple-500" : "text-foreground"}`}
                    >
                      Private
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      Invite only
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <GameButton
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12"
                disabled={loading}
              >
                Cancel
              </GameButton>
              <GameButton
                type="submit"
                variant="primary"
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                disabled={loading || !formData.name.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Group
                  </>
                )}
              </GameButton>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
