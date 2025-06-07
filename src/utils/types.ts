// types.ts

// General Reusable Types
export interface Tag {
    id: string;
    name: string;
}

export interface UserEnrollmentData {
    progress: number; // Percentage
    time_spent?: number; // Millis since epoch (Optional in Course Snapshot, present in Course Data)
    start_date?: string; // Present in Course Data
    lessons_completed?: number; // Present in Course Data
    assessments_completed?: number; // Present in Course Data
    next_lesson?: {
        type: "article" | "assessment";
        title: string;
        content_time_length: number; // Seconds
        content_length?: number | null; // Questions, Nullable if not assessment
    };
}

export interface UserData {
    bookmarked: boolean;
    enrollment: UserEnrollmentData | null; // Can be null if not enrolled
}

export interface InstructorSummary {
    slug: string;
    name: string;
}

export type CourseLevel = "beginner" | "intermediate" | "expert";
export type ContentType = "article" | "assessment";
export type AnswerType = "multiple_choice" | "multiple_answer";
export type LessonStatus = "done" | "none";
export type NotificationType = "certificate_achieved" | "discussion_replied";

// --- Courses ---

// Query Course Snapshot List
export interface QueryCourseSnapshotListRequest {
    query?: string;
    after?: string;
    limit?: number; // Default 10
    filter?: string; // Assuming comma-separated string of tag IDs or similar
    view?: "all" | "enrolled" | "bookmarked" | "completed";
    user?: string;
}

export interface CourseSnapshot {
    slug: string;
    name: string;
    description: string;
    tags: Tag[];
    totalLessons: number;
    totalAssessments: number;
    userdata: UserData | null; // userdata might be null if user is not provided or not logged in
}

export interface QueryCourseSnapshotListResponse {
    courses: CourseSnapshot[];
}

// Query Course Data
export interface QueryCourseDataRequestPath {
    courseId: string;
}

export interface QueryCourseDataRequestQuery {
    userId?: string;
    query?: string; // Filter section content
}

export interface CourseContent {
    type: ContentType;
    name: string;
    articleSlug?: string; // if type is article
    quizSlug?: string; // if type is assessment
    content_time_length: number; // Seconds
    unlocked: boolean;
    done: boolean;
    content_length?: number; // Questions, for assessment
    result?: { // This is null if test has not been taken
        score: number;
        pass: boolean;
    } | null;
}

export interface CourseSectionData {
    name: string;
    description: string;
    contents: CourseContent[];
}

export interface QueryCourseDataResponse {
    name: string;
    description: string;
    tags: Tag[];
    userdata: UserData | null; // userdata might be null
    instructor: InstructorSummary;
    last_updated: number; // Millis since epoch
    level: CourseLevel;
    total_lessons: number;
    total_assessments: number;
    sections: CourseSectionData[];
}

// Query Lesson Data
export interface QueryLessonDataRequestPath {
    courseId: string;
    lessonId: string; // This corresponds to articleSlug or quizSlug
}

export interface QueryLessonDataRequestQuery {
    userId: string;
}

export interface AdjacentLessonInfo {
    slug: string;
    name: string;
    type: ContentType;
}

export interface QueryLessonDataResponse {
    content_url: string; // URL to S3 bucket or similar for article content
    previous_lesson?: AdjacentLessonInfo | null;
    next_lesson?: AdjacentLessonInfo | null;
}

// Mark Lesson Status
export interface MarkLessonStatusRequestPath {
    courseId: string;
    lessonId: string;
}

export interface MarkLessonStatusRequestQuery {
    userId: string;
    status: LessonStatus;
}

export interface MarkLessonStatusResponse {
    message: "SAVED";
}

// --- Assessments ---

// Query Assessment Data (Question)
export interface QueryAssessmentQuestionRequestPath {
    assessmentId: string; // This corresponds to quizSlug
    index: string; // Nomor soal (question number, likely 0-indexed)
}

export interface QueryAssessmentQuestionRequestQuery {
    userId: string;
}

export interface AssessmentAnswerOption {
    id: string; // "0", "1", etc.
    content: string; // MARKDOWN CONTENT
    status?: "choosen" | null; // "choosen" if selected by user
}

export interface AssessmentQuestionFlags {
    [questionIndex: string]: "answered" | "flagged" | "answered_flagged" | null; // Added answered_flagged
}

export interface QueryAssessmentQuestionResponse {
    content: string; // MARKDOWN CONTENT (question text)
    answer_type: AnswerType;
    answers: AssessmentAnswerOption[];
    flags: AssessmentQuestionFlags; // Flags for all questions in the assessment
}

// Put Assessment Answer Status
export interface PutAssessmentAnswerStatusRequestPath {
    assessmentId: string;
    index: string; // Question index
}

export interface PutAssessmentAnswerStatusRequestQuery {
    answerId?: string; // ID of the chosen answer (for multiple_choice)
    answerIds?: string[]; // IDs of chosen answers (for multiple_answer) - Assuming based on answer_type
    flag?: boolean;
    userId: string; // Added userId as it's common in assessment interactions
}

export interface PutAssessmentAnswerStatusResponse {
    message: "SAVED";
}

// Review Assessment
export interface ReviewAssessmentRequestPath {
    assessmentId: string;
}

export interface ReviewAssessmentRequestQuery {
    userId: string;
}

export interface AssessmentReviewAnswer {
    content: string; // MARKDOWN CONTENT
    correct: boolean;
    chosen?: boolean; // To indicate if this was the user's choice
}

export interface AssessmentQuestionReview {
    content: string; // MARKDOWN CONTENT (question text)
    answers: AssessmentReviewAnswer[];
    answer_history: string[]; // Array of answer IDs chosen by user in order
    score: number | null; // Score for this specific question (e.g., 0.9 for 90%)
    explanation: string; // MARKDOWN CONTENT
}

export interface ReviewAssessmentResponse {
    score: number | null; // Overall percentage, or null if not scored yet
    time: number; // Seconds spent on the assessment
    retake: boolean; // Whether the user can retake the assessment
    total_tries: number;
    review: AssessmentQuestionReview[] | null; // Null if review is not available yet
}

// --- Certificates ---

// Query Certificate (Public)
export interface QueryCertificatePublicRequestPath {
    certificateId: string;
}

export interface QueryCertificatePublicResponse {
    name: string; // User's name
    tags: Tag[];
    date_issued: string; // "31-12-2025"
    course: {
        slug: string;
        name: string;
    };
}

// Query Certificates (User's)
export interface QueryCertificatesRequest {
    userId: string;
    query?: string;
    after?: string;
}

export interface UserCertificate {
    id: string; // Added certificate ID from Prisma schema for uniqueness
    title: string; // e.g., "HTML Fundamentals Certificate"
    issued_on: string; // "31-12-2025"
    course: {
        id: string; // course-slug
        name: string;
    };
    tags: Tag[];
}

export interface QueryCertificatesResponse {
    certificates: UserCertificate[];
}

// --- Discussions ---
export interface DiscussionUser {
    photo_url: string | null;
    name: string | null;
    self?: boolean | null;
    id: string;
}

export interface DiscussionComment {
    id: string;
    content: string; // CONTENT MARKDOWN
    likes: number;
    dislikes: number;
    created_date: string; // "31-12-2025T02:00:19.000" (ISO 8601 like)
    user: DiscussionUser;
    pinned?: boolean | null;
    replies: number; // Count of replies
    liked_by_user?: boolean; // To indicate if current user liked this
    disliked_by_user?: boolean; // To indicate if current user disliked this
}

// Query Discussion
export interface QueryDiscussionRequestPath {
    courseId: string;
    lessonId: string; // articleSlug or quizSlug
}

export interface QueryDiscussionRequestQuery {
    userId: string; // To determine 'self' and liked/disliked status
    after?: string; // Pagination offset (comment ID)
}

export interface QueryDiscussionResponse {
    count: number; // Total comments for this lesson
    comments: DiscussionComment[];
}

// Query Discussion Replies
export interface QueryDiscussionRepliesRequestPath {
    discussionId: string; // Parent comment ID
}

export interface QueryDiscussionRepliesRequestQuery {
    userId: string; // To determine 'self' and liked/disliked status
    after?: string; // Pagination offset (reply comment ID)
}

export interface QueryDiscussionRepliesResponse {
    count: number; // Total replies for this parent comment
    comments: DiscussionComment[]; // Structure is the same as top-level comments
}

// Post Discussion
export interface PostDiscussionRequestPath {
    courseId: string;
    lessonId: string;
}

export interface PostDiscussionRequestBody {
    userId: string; // API doc says "user": string, assuming it's userId
    content: string;
}

export interface PostDiscussionResponse {
    message: "SAVED";
    comment?: DiscussionComment; // Optionally return the created comment
}

// Reply Discussion
export interface ReplyDiscussionRequestPath {
    // No path parameters, endpoint is /api/v1/discussions
}

export interface ReplyDiscussionRequestBody {
    parent: string; // Parent comment ID
    userId: string; // API doc says "user": string
    content: string;
}

export interface ReplyDiscussionResponse {
    message: "SAVED";
    reply?: DiscussionComment; // Optionally return the created reply
}

// --- User ---

// Query User Data
export interface QueryUserDataRequestPath {
    userId: string;
}

export interface QueryUserDataResponse {
    user: string; // userId
    name?: string; // User's full name, from Prisma User.name
    email?: string; // User's email, from Prisma User.email
    occupation: string | null;
    streak: number;
    photo_url: string | null;
    last_updated_photo_url: string | null; // Assuming this is a timestamp or date string
    roleType?: "ADMIN" | "INSTRUCTOR" | "STUDENT"; // From Prisma User.roleType
}

// Update User Data
export interface UpdateUserDataRequestPath {
    userId: string;
}

export interface UpdateUserDataRequestBody {
    occupation?: string | null;
    name?: string; // Allow updating name
    photo_url?: string | null; // Allow updating photo_url
}

export interface UpdateUserDataResponse {
    message: "SAVED";
}

// Blockade Check
export interface CheckBlockadeRequestQuery {
    userId: string;
}

export interface CheckBlockadeResponse {
    active_assessment: {
        assessment_id: string; // quizSlug
        question_index: number;
        course_id: string; // Added course_id for context
        lesson_id: string; // Added lesson_id (assessment slug) for context
    } | null;
    recent_study: {
        course_id: string;
        lesson_id: string; // articleSlug or quizSlug
        lesson_type?: ContentType; // Added lesson_type for context
        lesson_name?: string; // Added lesson_name for context
        course_name?: string; // Added course_name for context
    } | null;
}

// --- Notifications ---

// Query Notifications
export interface QueryNotificationsRequestQuery {
    userId: string;
    after?: string; // Notification ID for pagination
}

export interface NotificationDataCertificateAchieved {
    courseName: string;
    courseId: string;
    certificateId: string; // Added certificateId for direct link
}

export interface NotificationDataDiscussionReplied {
    replierName: string;
    replierId: string;
    courseName: string;
    courseId: string;
    articleName: string; // Lesson name
    articleId: string; // Lesson slug
    commentId: string; // ID of the comment that was replied to
    replyId: string; // ID of the new reply
}

export interface Notification {
    id: string; // Added notification ID
    type: NotificationType;
    data: NotificationDataCertificateAchieved | NotificationDataDiscussionReplied;
    created_at: string; // Timestamp for sorting
    read: boolean; // To mark notification as read
}

export interface QueryNotificationsResponse {
    notifications: Notification[];
    unread_count: number; // Added unread count
}

// --- Instructor ---

// Create Course
export interface CreateCourseRequestBody {
    name: string;
    description: string;
    tags: string[]; // Array of tag_ids
    level: CourseLevel;
    instructor_id: string;
    thumbnailUrl?: string; // From Prisma, might be set during creation
}

export interface CreateCourseResponse {
    message: "CREATED";
    courseId: string;
}

// Update Course
export interface UpdateCourseRequestPath {
    courseId: string;
}

export interface UpdateCourseRequestBody {
    name?: string;
    description?: string;
    tags?: string[]; // Array of tag_ids
    level?: CourseLevel;
    thumbnailUrl?: string;
}

export interface UpdateCourseResponse {
    message: "UPDATED";
}

// Delete Course
export interface DeleteCourseRequestPath {
    courseId: string;
}

export interface DeleteCourseResponse {
    message: "DELETED";
}

// Create Section in Course
export interface CreateSectionInCourseRequestPath {
    courseId: string;
}

export interface SectionContentItemInput {
    type: ContentType; // "article" | "assessment"
    ref_id: string; // article-id or assessment-id
    // position will be determined by order in array
}

export interface CreateSectionInCourseRequestBody {
    name: string;
    description?: string; // Description is optional in API doc, but good to have
    contents?: SectionContentItemInput[]; // Optional, can add contents later
    position?: number; // Optional, server might auto-assign if not provided
}

export interface CreateSectionInCourseResponse {
    message: "CREATED";
    sectionId: string;
}

// Update Section in Course
export interface UpdateSectionInCourseRequestPath {
    courseId: string;
    sectionId: string;
}

export interface UpdateSectionInCourseRequestBody {
    name?: string;
    description?: string;
    contents?: SectionContentItemInput[]; // Allows reordering and changing content
    position?: number;
}

export interface UpdateSectionInCourseResponse {
    message: "UPDATED";
}

// Delete Section
export interface DeleteSectionRequestPath {
    courseId: string;
    sectionId: string;
}

export interface DeleteSectionResponse {
    message: "DELETED";
}

// Create Article
export interface CreateArticleRequestBody {
    name: string; // "Article Title"
    content_time_length: number; // Seconds
    content_url: string; // "url-to-article-content" (S3 URL)
    // sectionId will be part of how it's linked, but not in this direct API body
}

export interface CreateArticleResponse {
    message: "CREATED";
    articleId: string;
}

// Read Article
export interface ReadArticleRequestPath {
    articleId: string;
}

export interface ReadArticleResponse {
    id: string; // Added from Prisma
    name: string;
    content_time_length: number;
    content_url: string;
    sectionId?: string; // Context if needed
}

// Update Article
export interface UpdateArticleRequestPath {
    articleId: string;
}

export interface UpdateArticleRequestBody {
    name?: string;
    content_time_length?: number;
    content_url?: string;
}

export interface UpdateArticleResponse {
    message: "UPDATED";
}

// Delete Article
export interface DeleteArticleRequestPath {
    articleId: string;
}

export interface DeleteArticleResponse {
    message: "DELETED";
}

// Create Assessment
export interface AssessmentQuestionInputAnswer {
    content: string; // "Answer A" (Markdown)
    correct: boolean;
}

export interface AssessmentQuestionInput {
    content: string; // "Question markdown content"
    answer_type: AnswerType;
    answers: AssessmentQuestionInputAnswer[];
    explanation: string; // "Explanation markdown content"
    // position will be determined by order in array
}

export interface CreateAssessmentRequestBody {
    name: string; // "Assessment Title"
    content_time_length: number; // Seconds (for the whole assessment)
    questions: AssessmentQuestionInput[];
    // sectionId will be part of how it's linked, but not in this direct API body
}

export interface CreateAssessmentResponse {
    message: "CREATED";
    assessmentId: string;
}

// Read Assessment (Instructor view, includes correct answers)
export interface ReadAssessmentRequestPath {
    assessmentId: string;
}

export interface ReadAssessmentResponse {
    id: string; // Added from Prisma
    name: string;
    content_time_length: number;
    questions: AssessmentQuestionInput[]; // Includes correct answers and explanations
    sectionId?: string; // Context if needed
}

// Update Assessment
export interface UpdateAssessmentRequestPath {
    assessmentId: string;
}

export interface UpdateAssessmentRequestBody {
    name?: string;
    content_time_length?: number;
    questions?: AssessmentQuestionInput[]; // Allows full update of questions
}

export interface UpdateAssessmentResponse {
    message: "UPDATED";
}

// Delete Assessment
export interface DeleteAssessmentRequestPath {
    assessmentId: string;
}

export interface DeleteAssessmentResponse {
    message: "DELETED";
}

// List User Enrollments in a Course
export interface ListUserEnrollmentsRequestPath {
    courseId: string;
}

export interface UserEnrollmentDetails {
    user_id: string;
    user_name?: string; // Added for better display
    user_email?: string; // Added for better display
    progress: number; // Percentage
    start_date: string; // ISO 8601 format "2025-01-01T00:00:00.000Z"
    completed_lessons?: number; // Derived from UserProgress
    completed_assessments?: number; // Derived from UserProgress
}

export interface ListUserEnrollmentsResponse {
    enrollments: UserEnrollmentDetails[];
}

// Update User Enrollment in a Course
export interface UpdateUserEnrollmentRequestPath {
    courseId: string;
    userId: string;
}

export interface UpdateUserEnrollmentRequestBody {
    progress?: number; // Percentage
    // Potentially other fields like manually marking lessons/assessments complete by instructor
}

export interface UpdateUserEnrollmentResponse {
    message: "UPDATED";
}

// Delete User Enrollment in a Course
export interface DeleteUserEnrollmentRequestPath {
    courseId: string;
    userId: string;
}

export interface DeleteUserEnrollmentResponse {
    message: "DELETED";
}

// Issue Certificate
export interface IssueCertificateRequestBody {
    userId: string;
    courseId: string;
    date_issued?: string; // "31-12-2025", optional, server can default to now()
    date_invalid_after?: string; // "31-12-2026", optional
}

export interface IssueCertificateResponse {
    message: "CREATED";
    certificateId: string;
}

// Delete Certificate
export interface DeleteCertificateRequestPath {
    certificateId: string;
}

export interface DeleteCertificateResponse {
    message: "DELETED";
}

// --- Common API Responses ---
export interface ApiMessageResponse {
    message: string;
}

export interface ApiErrorResponse {
    error: string;
    details?: any;
}
