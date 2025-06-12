import type { Course, CourseSection, Article, Assessment, UserProgress, User } from '@prisma/client';
import type { CourseContent, UserData, UserEnrollmentData, ContentType, AdjacentLessonInfo, InstructorSummary, CourseLevel } from '../api_types_ts'; // Assuming types are in a relative path
import prisma from '@/utils/prismaClient';

/**
 * Calculates user progress for a course.
 * This is a simplified version. A real version would need to consider the weight/order of lessons.
 */
export async function calculateCourseProgress(
    userId: string,
    courseId: string,
    sections: (CourseSection & { articles: Article[], assessments: Assessment[] })[]
): Promise<UserEnrollmentData | null> {
    const totalContents = sections.reduce((acc, section) => {
        return acc + section.articles.length + section.assessments.length;
    }, 0);

    if (totalContents === 0) {
        return {
            progress: 0,
            lessons_completed: 0,
            assessments_completed: 0,
        };
    }

    const completedArticles = await prisma.userProgress.count({
        where: {
            userId,
            article: {
                section: { courseId }
            },
            completedAt: { not: null },
        },
    });

    const completedAssessments = await prisma.userProgress.count({
        where: {
            userId,
            assessment: {
                section: { courseId }
            },
            completedAt: { not: null }, // Assuming assessments are marked completed in UserProgress
        },
    });

    const totalCompleted = completedArticles + completedAssessments;
    const progressPercentage = totalCompleted > 0 ? Math.round((totalCompleted / totalContents) * 100) : 0;

    // Simplified next_lesson logic: find the first content item in order that isn't completed.
    // A more robust solution would need explicit ordering of content within sections and sections within the course.
    let nextLesson: AdjacentLessonInfo | undefined = undefined;

    for (const section of sections) {
        for (const article of section.articles) {
            const progress = await prisma.userProgress.findFirst({
                where: { userId, articleId: article.id }
            });
            if (!progress || !progress.completedAt) {
                nextLesson = { slug: article.id, name: article.title, type: 'article' };
                break;
            }
        }
        if (nextLesson) break;
        for (const assessment of section.assessments) {
            const progress = await prisma.userProgress.findFirst({
                where: { userId, assessmentId: assessment.id }
            });
            if (!progress || !progress.completedAt) {
                nextLesson = { slug: assessment.id, name: assessment.title, type: 'assessment' };
                break;
            }
        }
        if (nextLesson) break;
    }


    return {
        progress: progressPercentage,
        lessons_completed: completedArticles,
        assessments_completed: completedAssessments,
        // time_spent and start_date would need to be tracked, e.g., in a separate UserCourseEnrollment table or UserProgress
        // For now, returning undefined for them.
        time_spent: undefined, // Placeholder
        start_date: undefined, // Placeholder
        next_lesson: nextLesson,
    };
}
