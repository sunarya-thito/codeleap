import { z } from "zod";

// ---------- Common ----------
export const idSchema = z.string().min(1);
export const slugSchema = z.string().min(1);
export const urlSchema = z.string().url();
export const dateStringSchema = z.string().min(1);

// ---------- Course ----------
export const courseLevelSchema = z.enum(["beginner", "intermediate", "expert"]);
export const tagSchema = z.object({
    id: idSchema,
    name: z.string(),
});
export const courseCreateSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    tags: z.array(idSchema),
    level: courseLevelSchema,
    instructor_id: idSchema,
});
export const courseUpdateSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    tags: z.array(idSchema),
    level: courseLevelSchema,
});
export const courseSectionContentSchema = z.object({
    type: z.enum(["article", "assessment"]),
    ref_id: idSchema,
});
export const courseSectionCreateSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    contents: z.array(courseSectionContentSchema),
});
export const courseSectionUpdateSchema = courseSectionCreateSchema;

// ---------- Article ----------
export const articleCreateSchema = z.object({
    name: z.string().min(1),
    content_time_length: z.number().int().min(1),
    content_url: urlSchema,
});
export const articleUpdateSchema = articleCreateSchema;

// ---------- Assessment ----------
export const answerSchema = z.object({
    content: z.string().min(1),
    correct: z.boolean().optional(),
});
export const questionSchema = z.object({
    content: z.string().min(1),
    answer_type: z.enum(["multiple_choice", "multiple_answer"]),
    answers: z.array(answerSchema),
    explanation: z.string().min(1),
});
export const assessmentCreateSchema = z.object({
    name: z.string().min(1),
    content_time_length: z.number().int().min(1),
    questions: z.array(questionSchema),
});
export const assessmentUpdateSchema = assessmentCreateSchema;

// ---------- Enrollment ----------
export const enrollmentUpdateSchema = z.object({
    progress: z.number().int().min(0).max(100),
});

// ---------- Certificate ----------
export const certificateCreateSchema = z.object({
    userId: idSchema,
    courseId: idSchema,
    date_issued: dateStringSchema.optional(),
});

// ---------- User ----------
export const userUpdateSchema = z.object({
    occupation: z.string().nullable(),
});

// ---------- Discussion ----------
export const postDiscussionSchema = z.object({
    user: idSchema,
    content: z.string().min(1),
});
export const replyDiscussionSchema = z.object({
    parent: idSchema,
    user: idSchema,
    content: z.string().min(1),
});

// ---------- Mark Lesson ----------
export const markLessonSchema = z.object({
    userId: idSchema,
    status: z.enum(["done", "none"]),
});

// ---------- Assessment Answer Status ----------
export const assessmentAnswerStatusSchema = z.object({
    answerId: idSchema.optional(),
    flag: z.boolean().optional(),
});