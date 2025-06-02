/**
 * Comment system types for lesson interactions
 */

export interface Comment {
  id: string;
  lessonId: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  downvotes: number;
  replyCount: number;
  parentCommentId?: string; // For nested replies
  isEdited: boolean;
  isPinned?: boolean;
}

export interface CommentVote {
  id: string;
  userId: string;
  commentId: string;
  type: "upvote" | "downvote";
  createdAt: Date;
}

export interface CommentFilters {
  sortBy?: "newest" | "oldest" | "most_upvoted";
  showReplies?: boolean;
}
