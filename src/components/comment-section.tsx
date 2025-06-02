"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Pin,
  MoreHorizontal,
} from "lucide-react";
import {
  getTopLevelComments,
  getRepliesByComment,
  voteOnComment,
  getUserVoteForComment,
} from "@/data/comments";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/types/comment";

interface CommentSectionProps {
  lessonId: string;
  courseId: string;
}

export function CommentSection({ lessonId, courseId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [refreshKey, setRefreshKey] = useState(0);

  // Simulate current user ID (in real app, this would come from auth)
  const currentUserId = "user-current";

  useEffect(() => {
    setComments(getTopLevelComments(lessonId));
  }, [lessonId, refreshKey]);

  const sortedComments = [...comments].sort((a, b) => {
    // Pinned comments always come first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    switch (sortBy) {
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime();
      case "most_upvoted":
        return b.upvotes - a.upvotes;
      default: // newest
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const totalComments = comments.reduce(
    (total, comment) => total + 1 + comment.replyCount,
    0
  );

  const handleNewComment = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {totalComments} {totalComments === 1 ? "Comment" : "Comments"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Share your thoughts and ask questions
          </p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="most_upvoted">Most Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CommentForm
        lessonId={lessonId}
        courseId={courseId}
        currentUserId={currentUserId}
        placeholder="Add a comment..."
        onSubmit={handleNewComment}
      />

      <div className="space-y-4">
        {sortedComments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No comments yet</h3>
              <p className="text-muted-foreground">
                Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              onUpdate={handleNewComment}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface CommentFormProps {
  lessonId: string;
  courseId: string;
  currentUserId: string;
  parentCommentId?: string;
  placeholder?: string;
  onSubmit: () => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}

function CommentForm({
  //   lessonId,
  //   courseId,
  //   currentUserId,
  //   parentCommentId,
  placeholder = "Write a comment...",
  onSubmit,
  onCancel,
  autoFocus = false,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add the comment to our mock data
    // addComment({
    //   lessonId,
    //   courseId,
    //   userId: currentUserId,
    //   userName: "You", // In real app, this would come from user data
    //   userAvatar: "/placeholder.svg?height=32&width=32",
    //   content: content.trim(),
    //   parentCommentId,
    // });

    setContent("");
    setIsSubmitting(false);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            autoFocus={autoFocus}
            className="resize-none"
          />
          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              size="sm"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Comment"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

interface CommentItemProps {
  comment: Comment;
  currentUserId: string;
  onUpdate: () => void;
  isReply?: boolean;
}

function CommentItem({
  comment,
  currentUserId,
  onUpdate,
  isReply = false,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);
  const [localUpvotes, setLocalUpvotes] = useState(comment.upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(comment.downvotes);

  useEffect(() => {
    setReplies(getRepliesByComment(comment.id));
    const existingVote = getUserVoteForComment(currentUserId, comment.id);
    setUserVote(existingVote?.type || null);
  }, [comment.id, currentUserId]);

  const handleVote = (type: "upvote" | "downvote") => {
    const previousVote = userVote;
    const newVote = userVote === type ? null : type;

    // Optimistic update
    setUserVote(newVote);

    // Update local vote counts
    if (previousVote === "upvote") {
      setLocalUpvotes((prev) => prev - 1);
    } else if (previousVote === "downvote") {
      setLocalDownvotes((prev) => prev - 1);
    }

    if (newVote === "upvote") {
      setLocalUpvotes((prev) => prev + 1);
    } else if (newVote === "downvote") {
      setLocalDownvotes((prev) => prev + 1);
    }

    // Update the actual data
    voteOnComment(currentUserId, comment.id, type);
  };

  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handleReplySubmit = () => {
    setShowReplyForm(false);
    setReplies(getRepliesByComment(comment.id));
    onUpdate();
  };

  const getVoteButtonClass = (voteType: "upvote" | "downvote") => {
    const isActive = userVote === voteType;
    const baseClass = "h-8 px-2 transition-colors";

    if (voteType === "upvote") {
      return `${baseClass} ${
        isActive
          ? "text-blue-600 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900"
          : "hover:bg-muted"
      }`;
    } else {
      return `${baseClass} ${
        isActive
          ? "text-red-600 bg-red-50 dark:bg-red-950 hover:bg-red-100 dark:hover:bg-red-900"
          : "hover:bg-muted"
      }`;
    }
  };

  return (
    <div className={`${isReply ? "ml-8 border-l-2 border-muted pl-4" : ""}`}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage
            src={comment.userAvatar || "/placeholder.svg"}
            alt={comment.userName}
          />
          <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm">{comment.userName}</span>
            {comment.isPinned && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                <Pin className="h-3 w-3 mr-1" />
                Pinned
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
            </span>
            {comment.isEdited && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>

          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">
              {comment.content}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={getVoteButtonClass("upvote")}
              onClick={() => handleVote("upvote")}
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              {localUpvotes > 0 && localUpvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={getVoteButtonClass("downvote")}
              onClick={() => handleVote("downvote")}
            >
              <ThumbsDown className="h-3 w-3 mr-1" />
              {localDownvotes > 0 && localDownvotes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleReply}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-1">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>

          {showReplyForm && (
            <div className="mt-3">
              <CommentForm
                lessonId={comment.lessonId}
                courseId={comment.courseId}
                currentUserId={currentUserId}
                parentCommentId={comment.id}
                placeholder={`Reply to ${comment.userName}...`}
                onSubmit={handleReplySubmit}
                onCancel={() => setShowReplyForm(false)}
                autoFocus
              />
            </div>
          )}

          {replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {showReplies ? (
                <>
                  {replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      currentUserId={currentUserId}
                      onUpdate={onUpdate}
                      isReply
                    />
                  ))}
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 h-8"
                  onClick={() => setShowReplies(true)}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  View {replies.length}{" "}
                  {replies.length === 1 ? "reply" : "replies"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
