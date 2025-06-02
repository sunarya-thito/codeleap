import type { Comment, CommentVote } from "@/types/comment";

export const mockComments: Comment[] = [
  // HTML Basics Lesson Comments
  {
    id: "comment-1",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-2",
    userName: "Sarah Chen",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Great explanation of HTML structure! I finally understand the difference between head and body elements. The visual examples really helped me grasp the concept.",
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
    upvotes: 24,
    downvotes: 2,
    replyCount: 4,
    isEdited: false,
    isPinned: true,
  },
  {
    id: "comment-2",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-3",
    userName: "Alex Rodriguez",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "I'm still confused about when to use meta tags. Could someone give me some practical examples? I understand the concept but struggle with real-world applications.",
    createdAt: new Date("2024-01-15T11:15:00Z"),
    updatedAt: new Date("2024-01-15T11:15:00Z"),
    upvotes: 18,
    downvotes: 0,
    replyCount: 3,
    isEdited: false,
  },
  {
    id: "comment-3",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-4",
    userName: "Mike Johnson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "The DOCTYPE declaration example was really helpful. I've been wondering why it's necessary and this lesson explained it perfectly!",
    createdAt: new Date("2024-01-16T09:20:00Z"),
    updatedAt: new Date("2024-01-16T09:20:00Z"),
    upvotes: 12,
    downvotes: 1,
    replyCount: 2,
    isEdited: false,
  },
  {
    id: "comment-4",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-8",
    userName: "Rachel Green",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Quick question: Do I need to memorize all HTML tags or is it okay to look them up as I code?",
    createdAt: new Date("2024-01-16T14:30:00Z"),
    updatedAt: new Date("2024-01-16T14:30:00Z"),
    upvotes: 8,
    downvotes: 0,
    replyCount: 2,
    isEdited: false,
  },

  // Replies to comment-1
  {
    id: "comment-5",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-5",
    userName: "Emma Wilson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Thanks Sarah! I was struggling with the same concept. This lesson really cleared it up for me too. The diagrams were especially helpful.",
    createdAt: new Date("2024-01-15T12:00:00Z"),
    updatedAt: new Date("2024-01-15T12:00:00Z"),
    upvotes: 6,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-1",
    isEdited: false,
  },
  {
    id: "comment-6",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-6",
    userName: "Lisa Park",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "The visual examples in this lesson are fantastic. Makes everything so much clearer! I wish all programming tutorials were this well-designed.",
    createdAt: new Date("2024-01-15T13:30:00Z"),
    updatedAt: new Date("2024-01-15T13:30:00Z"),
    upvotes: 15,
    downvotes: 0,
    replyCount: 1,
    parentCommentId: "comment-1",
    isEdited: false,
  },
  {
    id: "comment-7",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-1",
    userName: "John Doe",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Glad you found it helpful! We're always working to improve our visual explanations. Your feedback means a lot to us! 🙏",
    createdAt: new Date("2024-01-15T14:00:00Z"),
    updatedAt: new Date("2024-01-15T14:00:00Z"),
    upvotes: 8,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-6",
    isEdited: false,
  },
  {
    id: "comment-8",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-9",
    userName: "Tom Wilson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "I've been coding for 2 years and still learned something new from this lesson. Great work!",
    createdAt: new Date("2024-01-15T16:45:00Z"),
    updatedAt: new Date("2024-01-15T16:45:00Z"),
    upvotes: 11,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-1",
    isEdited: false,
  },

  // Replies to comment-2
  {
    id: "comment-9",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-7",
    userName: "David Kim",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content: `Here are some essential meta tags you'll use regularly:

• <meta charset="UTF-8"> - Character encoding (always include this!)
• <meta name="viewport" content="width=device-width, initial-scale=1.0"> - Responsive design
• <meta name="description" content="..."> - Page description for SEO (150-160 chars)
• <meta name="keywords" content="..."> - Keywords for search engines
• <meta property="og:title" content="..."> - Social media sharing title`,
    createdAt: new Date("2024-01-15T15:45:00Z"),
    updatedAt: new Date("2024-01-15T15:45:00Z"),
    upvotes: 32,
    downvotes: 1,
    replyCount: 2,
    parentCommentId: "comment-2",
    isEdited: false,
  },
  {
    id: "comment-10",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-3",
    userName: "Alex Rodriguez",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Perfect! This is exactly what I needed. Thank you so much David! 🙏 The examples make it so much clearer.",
    createdAt: new Date("2024-01-15T16:00:00Z"),
    updatedAt: new Date("2024-01-15T16:00:00Z"),
    upvotes: 7,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-9",
    isEdited: false,
  },
  {
    id: "comment-11",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-10",
    userName: "Sophie Martinez",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Thanks David! I'm bookmarking this comment for future reference. Super helpful! 📚",
    createdAt: new Date("2024-01-15T17:20:00Z"),
    updatedAt: new Date("2024-01-15T17:20:00Z"),
    upvotes: 4,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-9",
    isEdited: false,
  },
  {
    id: "comment-12",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-11",
    userName: "Chris Anderson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      'Don\'t forget about the favicon meta tag too! <link rel="icon" type="image/x-icon" href="/favicon.ico">',
    createdAt: new Date("2024-01-15T18:00:00Z"),
    updatedAt: new Date("2024-01-15T18:00:00Z"),
    upvotes: 9,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-2",
    isEdited: false,
  },

  // Replies to comment-3
  {
    id: "comment-13",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-12",
    userName: "Nina Patel",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "I agree! I always wondered why we needed DOCTYPE. Now I understand it tells the browser which version of HTML we're using.",
    createdAt: new Date("2024-01-16T10:30:00Z"),
    updatedAt: new Date("2024-01-16T10:30:00Z"),
    upvotes: 5,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-3",
    isEdited: false,
  },
  {
    id: "comment-14",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-13",
    userName: "James Lee",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Fun fact: If you don't include DOCTYPE, browsers go into 'quirks mode' which can cause weird rendering issues!",
    createdAt: new Date("2024-01-16T11:15:00Z"),
    updatedAt: new Date("2024-01-16T11:15:00Z"),
    upvotes: 14,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-3",
    isEdited: false,
  },

  // Replies to comment-4
  {
    id: "comment-15",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-14",
    userName: "Maria Garcia",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "It's totally fine to look them up! Even experienced developers use references. Focus on understanding the common ones first (div, p, h1-h6, a, img, etc.)",
    createdAt: new Date("2024-01-16T15:00:00Z"),
    updatedAt: new Date("2024-01-16T15:00:00Z"),
    upvotes: 16,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-4",
    isEdited: false,
  },
  {
    id: "comment-16",
    lessonId: "lesson-2",
    courseId: "course-1",
    userId: "user-15",
    userName: "Kevin Brown",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "I've been coding for 5 years and still look up HTML tags sometimes! MDN Web Docs is your best friend 😄",
    createdAt: new Date("2024-01-16T15:30:00Z"),
    updatedAt: new Date("2024-01-16T15:30:00Z"),
    upvotes: 12,
    downvotes: 0,
    replyCount: 0,
    parentCommentId: "comment-4",
    isEdited: false,
  },

  // CSS Basics Lesson Comments
  {
    id: "comment-17",
    lessonId: "lesson-3",
    courseId: "course-1",
    userId: "user-16",
    userName: "Anna Thompson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "CSS selectors are so powerful! I had no idea you could target elements in so many different ways. The specificity explanation was particularly helpful.",
    createdAt: new Date("2024-01-17T09:00:00Z"),
    updatedAt: new Date("2024-01-17T09:00:00Z"),
    upvotes: 19,
    downvotes: 1,
    replyCount: 3,
    isEdited: false,
    isPinned: true,
  },
  {
    id: "comment-18",
    lessonId: "lesson-3",
    courseId: "course-1",
    userId: "user-17",
    userName: "Robert Davis",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Can someone explain the difference between margin and padding? I keep getting confused about when to use which one.",
    createdAt: new Date("2024-01-17T10:30:00Z"),
    updatedAt: new Date("2024-01-17T10:30:00Z"),
    upvotes: 22,
    downvotes: 0,
    replyCount: 4,
    isEdited: false,
  },
  {
    id: "comment-19",
    lessonId: "lesson-3",
    courseId: "course-1",
    userId: "user-18",
    userName: "Jennifer White",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "The box model diagram in this lesson is amazing! Finally understand how CSS calculates element sizes. This should be required viewing for all beginners!",
    createdAt: new Date("2024-01-17T12:15:00Z"),
    updatedAt: new Date("2024-01-17T12:15:00Z"),
    upvotes: 28,
    downvotes: 0,
    replyCount: 2,
    isEdited: false,
  },

  // JavaScript Basics Lesson Comments
  {
    id: "comment-20",
    lessonId: "lesson-4",
    courseId: "course-1",
    userId: "user-19",
    userName: "Michael Chang",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Variables and data types make so much more sense now! The examples with let, const, and var really helped clarify the differences.",
    createdAt: new Date("2024-01-18T08:45:00Z"),
    updatedAt: new Date("2024-01-18T08:45:00Z"),
    upvotes: 15,
    downvotes: 0,
    replyCount: 2,
    isEdited: false,
  },
  {
    id: "comment-21",
    lessonId: "lesson-4",
    courseId: "course-1",
    userId: "user-20",
    userName: "Laura Johnson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "I'm struggling with understanding scope. Could someone provide a simple example of global vs local scope?",
    createdAt: new Date("2024-01-18T11:20:00Z"),
    updatedAt: new Date("2024-01-18T11:20:00Z"),
    upvotes: 13,
    downvotes: 0,
    replyCount: 3,
    isEdited: false,
  },

  // Python Basics Lesson Comments
  {
    id: "comment-22",
    lessonId: "lesson-6",
    courseId: "course-2",
    userId: "user-21",
    userName: "Daniel Rodriguez",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Python syntax is so clean compared to other languages! Love how readable it is. The indentation-based structure took some getting used to though.",
    createdAt: new Date("2024-01-19T09:30:00Z"),
    updatedAt: new Date("2024-01-19T09:30:00Z"),
    upvotes: 21,
    downvotes: 2,
    replyCount: 3,
    isEdited: false,
    isPinned: true,
  },
  {
    id: "comment-23",
    lessonId: "lesson-6",
    courseId: "course-2",
    userId: "user-22",
    userName: "Sarah Kim",
    userAvatar: "/placeholder.svg?height=32&width=32",
    content:
      "Quick question: What's the difference between print() and return in Python functions?",
    createdAt: new Date("2024-01-19T14:00:00Z"),
    updatedAt: new Date("2024-01-19T14:00:00Z"),
    upvotes: 18,
    downvotes: 0,
    replyCount: 2,
    isEdited: false,
  },
];

// Mock vote data - tracks which users voted on which comments
export const mockCommentVotes: CommentVote[] = [
  // User votes on HTML lesson comments
  {
    id: "vote-1",
    userId: "user-current",
    commentId: "comment-1",
    type: "upvote",
    createdAt: new Date(),
  },
  {
    id: "vote-2",
    userId: "user-current",
    commentId: "comment-9",
    type: "upvote",
    createdAt: new Date(),
  },
  {
    id: "vote-3",
    userId: "user-current",
    commentId: "comment-14",
    type: "upvote",
    createdAt: new Date(),
  },

  // Other users' votes (for realistic vote counts)
  {
    id: "vote-4",
    userId: "user-2",
    commentId: "comment-2",
    type: "upvote",
    createdAt: new Date(),
  },
  {
    id: "vote-5",
    userId: "user-3",
    commentId: "comment-1",
    type: "upvote",
    createdAt: new Date(),
  },
  {
    id: "vote-6",
    userId: "user-4",
    commentId: "comment-9",
    type: "upvote",
    createdAt: new Date(),
  },
  {
    id: "vote-7",
    userId: "user-5",
    commentId: "comment-6",
    type: "upvote",
    createdAt: new Date(),
  },
  {
    id: "vote-8",
    userId: "user-6",
    commentId: "comment-14",
    type: "upvote",
    createdAt: new Date(),
  },
];

// Helper functions for comment data
export function getCommentsByLesson(lessonId: string): Comment[] {
  return mockComments.filter((comment) => comment.lessonId === lessonId);
}

export function getTopLevelComments(lessonId: string): Comment[] {
  return mockComments.filter(
    (comment) => comment.lessonId === lessonId && !comment.parentCommentId
  );
}

export function getRepliesByComment(commentId: string): Comment[] {
  return mockComments.filter(
    (comment) => comment.parentCommentId === commentId
  );
}

export function getCommentById(id: string): Comment | undefined {
  return mockComments.find((comment) => comment.id === id);
}

export function getUserVoteForComment(
  userId: string,
  commentId: string
): CommentVote | undefined {
  return mockCommentVotes.find(
    (vote) => vote.userId === userId && vote.commentId === commentId
  );
}

export function getCommentVotes(commentId: string): CommentVote[] {
  return mockCommentVotes.filter((vote) => vote.commentId === commentId);
}

// Simulate adding a new comment
export function addComment(
  comment: Omit<Comment, "id" | "createdAt" | "updatedAt">
): Comment {
  const newComment: Comment = {
    ...comment,
    id: `comment-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    upvotes: 0,
    downvotes: 0,
    replyCount: 0,
    isEdited: false,
  };

  mockComments.push(newComment);

  // Update parent comment reply count if this is a reply
  if (comment.parentCommentId) {
    const parentComment = getCommentById(comment.parentCommentId);
    if (parentComment) {
      parentComment.replyCount += 1;
    }
  }

  return newComment;
}

// Simulate voting on a comment
export function voteOnComment(
  userId: string,
  commentId: string,
  voteType: "upvote" | "downvote"
): void {
  const existingVote = getUserVoteForComment(userId, commentId);
  const comment = getCommentById(commentId);

  if (!comment) return;

  if (existingVote) {
    // Remove existing vote
    const voteIndex = mockCommentVotes.findIndex(
      (vote) => vote.id === existingVote.id
    );
    if (voteIndex > -1) {
      mockCommentVotes.splice(voteIndex, 1);

      // Update comment vote counts
      if (existingVote.type === "upvote") {
        comment.upvotes -= 1;
      } else {
        comment.downvotes -= 1;
      }
    }

    // If same vote type, just remove it (toggle off)
    if (existingVote.type === voteType) {
      return;
    }
  }

  // Add new vote
  const newVote: CommentVote = {
    id: `vote-${Date.now()}`,
    userId,
    commentId,
    type: voteType,
    createdAt: new Date(),
  };

  mockCommentVotes.push(newVote);

  // Update comment vote counts
  if (voteType === "upvote") {
    comment.upvotes += 1;
  } else {
    comment.downvotes += 1;
  }
}
