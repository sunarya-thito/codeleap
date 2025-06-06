// --- Base Types ---
export type ApiResult<T> = Promise<T>;

export abstract class ApiRequest<TResponse> {
    abstract getUrl(): string;
    abstract getMethod(): string;
    getBody(): any | undefined { return undefined; }
    getHeaders(): Record<string, string> { return { 'Content-Type': 'application/json' }; }

    async fetch(): ApiResult<TResponse> {
        const method = this.getMethod();
        const url = this.getUrl();
        const body = this.getBody();
        const headers = this.getHeaders();

        const res = await fetch(url, {
            method,
            headers,
            ...(body ? { body: JSON.stringify(body) } : {}),
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
}

// --- Helper for query params ---
function toQuery(params: Record<string, any>) {
    const q = Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => Array.isArray(v) ? `${k}=${v.join(',')}` : `${k}=${encodeURIComponent(v)}`)
        .join('&');
    return q ? `?${q}` : '';
}

// --- 1. Query Course Snapshot List ---
export interface QueryCourseListOptions {
    query?: string;
    after?: string;
    limit?: number;
    filter?: string[];
    view?: 'all' | 'enrolled' | 'bookmarked' | 'completed';
    user?: string;
}
export interface QueryCourseListResponse {
    courses: {
        slug: string;
        name: string;
        description: string;
        tags: { id: string; name: string }[];
        totalLessons: number;
        totalAssessments: number;
        userdata: {
            bookmarked: boolean;
            enrollment: {
                progress: number;
                time_spent: number;
            };
        };
    }[];
}
export class QueryCourseList extends ApiRequest<QueryCourseListResponse> {
    constructor(public options: QueryCourseListOptions = {}) { super(); }
    getUrl() { return `/api/v1/courses${toQuery(this.options)}`; }
    getMethod() { return 'GET'; }
}

// --- 2. Query Course Data ---
export interface QueryCourseDetailOptions {
    courseId: string;
    userId?: string;
    query?: string;
}
export interface QueryCourseDetailResponse {
    name: string;
    description: string;
    tags: { id: string; name: string }[];
    userdata: {
        bookmarked: boolean;
        enrollment: {
            progress: number;
            start_date: string;
            lessons_completed: number;
            assessments_completed: number;
            next_lesson: {
                type: 'article' | 'assessment';
                title: string;
                content_time_length: number;
                content_length: number | null;
            };
        };
    };
    instructor: { slug: string; name: string; };
    last_updated: number;
    level: 'beginner' | 'intermediate' | 'expert';
    total_lessons: number;
    total_assessments: number;
    sections: {
        name: string;
        description: string;
        contents: (
            | {
                type: 'article';
                name: string;
                articleSlug: string;
                content_time_length: number;
                unlocked: boolean;
                done: boolean;
            }
            | {
                type: 'assessment';
                name: string;
                quizSlug: string;
                content_time_length: number;
                content_length: number;
                unlocked: boolean;
                result: { score: number; pass: boolean } | null;
                done: boolean;
            }
        )[];
    }[];
}
export class QueryCourseDetail extends ApiRequest<QueryCourseDetailResponse> {
    constructor(public options: QueryCourseDetailOptions) { super(); }
    getUrl() {
        const { courseId, ...rest } = this.options;
        return `/api/v1/courses/${courseId}${toQuery(rest)}`;
    }
    getMethod() { return 'GET'; }
}

// --- 3. Query Lesson Data ---
export interface QueryLessonDataOptions {
    courseId: string;
    lessonId: string;
    userId: string;
}
export interface QueryLessonDataResponse {
    content_url: string;
    previous_lesson?: { slug: string; name: string; type: string; };
    next_lesson?: { slug: string; name: string; type: string; };
}
export class QueryLessonData extends ApiRequest<QueryLessonDataResponse> {
    constructor(public options: QueryLessonDataOptions) { super(); }
    getUrl() {
        const { courseId, lessonId, userId } = this.options;
        return `/api/v1/courses/${courseId}/lessons/${lessonId}${toQuery({ userId })}`;
    }
    getMethod() { return 'GET'; }
}

// --- 4. Query Assessment Data ---
export interface QueryAssessmentDataOptions {
    assessmentId: string;
    index: number;
    userId: string;
}
export interface QueryAssessmentDataResponse {
    content: string;
    answer_type: 'multiple_choice' | 'multiple_answer';
    answers: { id: string; content: string; status: 'choosen' | null }[];
    flags: Record<string, string>;
}
export class QueryAssessmentData extends ApiRequest<QueryAssessmentDataResponse> {
    constructor(public options: QueryAssessmentDataOptions) { super(); }
    getUrl() {
        const { assessmentId, index, userId } = this.options;
        return `/api/v1/assessments/${assessmentId}/questions/${index}${toQuery({ userId })}`;
    }
    getMethod() { return 'GET'; }
}

// --- 5. Put Assessment Answer Status ---
export interface PutAssessmentAnswerStatusOptions {
    assessmentId: string;
    index: number;
    answerId?: string;
    flag?: boolean;
}
export interface PutAssessmentAnswerStatusResponse {
    message: string;
}
export class PutAssessmentAnswerStatus extends ApiRequest<PutAssessmentAnswerStatusResponse> {
    constructor(public options: PutAssessmentAnswerStatusOptions) { super(); }
    getUrl() {
        const { assessmentId, index, answerId, flag } = this.options;
        return `/api/v1/assessments/${assessmentId}/questions/${index}${toQuery({ answerId, flag })}`;
    }
    getMethod() { return 'PUT'; }
}

// --- 6. Review Assessment ---
export interface ReviewAssessmentOptions {
    assessmentId: string;
    userId?: string;
}
export interface ReviewAssessmentResponse {
    score: number | null;
    time: number;
    retake: boolean;
    total_tries: number;
    review: {
        content: string;
        answers: { content: string; correct: boolean; }[];
        answer_history: number[];
        score: number | null;
        explanation: string;
    }[] | null;
}
export class ReviewAssessment extends ApiRequest<ReviewAssessmentResponse> {
    constructor(public options: ReviewAssessmentOptions) { super(); }
    getUrl() {
        const { assessmentId, userId } = this.options;
        return `/api/v1/assessments/${assessmentId}/review${toQuery({ userId })}`;
    }
    getMethod() { return 'GET'; }
}

// --- 7. Mark Lesson ---
export interface MarkLessonOptions {
    courseId: string;
    lessonId: string;
    userId: string;
    status: 'done' | 'none';
}
export interface MarkLessonResponse { message: string; }
export class MarkLesson extends ApiRequest<MarkLessonResponse> {
    constructor(public options: MarkLessonOptions) { super(); }
    getUrl() {
        const { courseId, lessonId, userId, status } = this.options;
        return `/api/v1/courses/${courseId}/lessons/${lessonId}/status${toQuery({ userId, status })}`;
    }
    getMethod() { return 'PUT'; }
}

// --- 8. Query Certificate (Public) ---
export interface QueryCertificateOptions { certificateId: string; }
export interface QueryCertificateResponse {
    name: string;
    tags: { id: string; name: string }[];
    date_issued: string;
    course: { slug: string; name: string; };
}
export class QueryCertificate extends ApiRequest<QueryCertificateResponse> {
    constructor(public options: QueryCertificateOptions) { super(); }
    getUrl() { return `/api/v1/certificates/${this.options.certificateId}`; }
    getMethod() { return 'GET'; }
}

// --- 9. Query Certificates ---
export interface QueryCertificatesOptions {
    userId: string;
    query?: string;
    after?: string;
}
export interface QueryCertificatesResponse {
    certificates: {
        title: string;
        issued_on: string;
        course: { id: string; name: string; };
        tags: { id: string; name: string }[];
    }[];
}
export class QueryCertificates extends ApiRequest<QueryCertificatesResponse> {
    constructor(public options: QueryCertificatesOptions) { super(); }
    getUrl() { return `/api/v1/certificates${toQuery(this.options)}`; }
    getMethod() { return 'GET'; }
}

// --- 10. Query Discussion ---
export interface QueryDiscussionOptions {
    courseId: string;
    lessonId: string;
    userId: string;
    after?: string;
}
export interface QueryDiscussionResponse {
    count: number;
    comments: {
        id: string;
        content: string;
        likes: number;
        dislikes: number;
        created_date: string;
        user: {
            photo_url: string | null;
            name: string | null;
            self: boolean | null;
            id: string;
        };
        pinned?: boolean | null;
        replies: number;
    }[];
}
export class QueryDiscussion extends ApiRequest<QueryDiscussionResponse> {
    constructor(public options: QueryDiscussionOptions) { super(); }
    getUrl() {
        const { courseId, lessonId, userId, after } = this.options;
        return `/api/v1/courses/${courseId}/lessons/${lessonId}/discussions${toQuery({ userId, after })}`;
    }
    getMethod() { return 'GET'; }
}

// --- 11. Query Discussion Replies ---
export interface QueryDiscussionRepliesOptions {
    discussionId: string;
    userId: string;
    after?: string;
}
export interface QueryDiscussionRepliesResponse {
    count: number;
    comments: QueryDiscussionResponse['comments'];
}
export class QueryDiscussionReplies extends ApiRequest<QueryDiscussionRepliesResponse> {
    constructor(public options: QueryDiscussionRepliesOptions) { super(); }
    getUrl() {
        const { discussionId, userId, after } = this.options;
        return `/api/v1/discussions/${discussionId}${toQuery({ userId, after })}`;
    }
    getMethod() { return 'GET'; }
}

// --- 12. Post Discussion ---
export interface PostDiscussionOptions {
    courseId: string;
    lessonId: string;
    user: string;
    content: string;
}
export interface PostDiscussionResponse { message: string; }
export class PostDiscussion extends ApiRequest<PostDiscussionResponse> {
    constructor(public options: PostDiscussionOptions) { super(); }
    getUrl() {
        const { courseId, lessonId } = this.options;
        return `/api/v1/courses/${courseId}/lessons/${lessonId}/discussions`;
    }
    getMethod() { return 'POST'; }
    getBody() {
        const { user, content } = this.options;
        return { user, content };
    }
}

// --- 13. Reply Discussion ---
export interface ReplyDiscussionOptions {
    parent: string;
    user: string;
    content: string;
}
export interface ReplyDiscussionResponse { message: string; }
export class ReplyDiscussion extends ApiRequest<ReplyDiscussionResponse> {
    constructor(public options: ReplyDiscussionOptions) { super(); }
    getUrl() { return `/api/v1/discussions`; }
    getMethod() { return 'POST'; }
    getBody() {
        const { parent, user, content } = this.options;
        return { parent, user, content };
    }
}

// --- 14. Query User Data ---
export interface QueryUserDataOptions { userId: string; }
export interface QueryUserDataResponse {
    user: string;
    occupation: string | null;
    streak: number;
    photo_url: string | null;
    last_updated_photo_url: string | null;
}
export class QueryUserData extends ApiRequest<QueryUserDataResponse> {
    constructor(public options: QueryUserDataOptions) { super(); }
    getUrl() { return `/api/v1/user/${this.options.userId}`; }
    getMethod() { return 'GET'; }
}

// --- 15. Update User Data ---
export interface UpdateUserDataOptions {
    userId: string;
    occupation: string | null;
}
export interface UpdateUserDataResponse { message: string; }
export class UpdateUserData extends ApiRequest<UpdateUserDataResponse> {
    constructor(public options: UpdateUserDataOptions) { super(); }
    getUrl() { return `/api/v1/user/${this.options.userId}`; }
    getMethod() { return 'PUT'; }
    getBody() { return { occupation: this.options.occupation }; }
}

// --- 16. Blockade Visit ---
export interface BlockadeVisitOptions { userId: string; }
export interface BlockadeVisitResponse {
    active_assessment: { assessment_id: string; question_index: number } | null;
    recent_study: { course_id: string; lesson_id: string } | null;
}
export class BlockadeVisit extends ApiRequest<BlockadeVisitResponse> {
    constructor(public options: BlockadeVisitOptions) { super(); }
    getUrl() { return `/api/v1/check${toQuery(this.options)}`; }
    getMethod() { return 'GET'; }
}

// --- 17. Query Notifications ---
export interface QueryNotificationsOptions {
    userId: string;
    after?: string;
}
export interface QueryNotificationsResponse {
    notifications: {
        type: 'certificate_achieved' | 'discussion_replied';
        data: any[];
    }[];
}
export class QueryNotifications extends ApiRequest<QueryNotificationsResponse> {
    constructor(public options: QueryNotificationsOptions) { super(); }
    getUrl() { return `/api/v1/notifications${toQuery(this.options)}`; }
    getMethod() { return 'GET'; }
}

// --- Instructor Endpoints, Certificates, Articles, Assessments, Enrollments, etc. ---
// Repeat the above pattern for all remaining endpoints in your API.md

// Example usage:
// const req = new QueryCourseList({ query: 'html', limit: 10 });
// const res = await req.fetch();
