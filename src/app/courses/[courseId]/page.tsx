import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle,
  BookMarked,
  BarChart,
} from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  // Mock course data - in a real app, this would be fetched based on the course ID
  const course = {
    id: params.courseId,
    title: "HTML Fundamentals",
    description:
      "Learn the building blocks of web development with HTML5. This comprehensive course covers everything from basic HTML tags to semantic HTML and accessibility best practices.",
    icon: <BookOpen className="h-4 w-4" />,
    progress: 65,
    lessons: 12,
    level: "Beginner",
    timeSpent: "3h 20m",
    topics: ["HTML", "Web Development", "Semantic HTML"],
    bookmarked: true,
    hasAssessment: true,
    instructor: "Jane Smith",
    lastUpdated: "April 15, 2025",
    sections: [
      {
        id: "section-1",
        title: "Introduction to HTML",
        description: "Learn the basics of HTML and its role in web development",
        lessons: [
          {
            id: "lesson-1",
            title: "What is HTML?",
            duration: "10 min",
            completed: true,
          },
          {
            id: "lesson-2",
            title: "HTML Document Structure",
            duration: "15 min",
            completed: true,
          },
          {
            id: "lesson-3",
            title: "Basic HTML Tags",
            duration: "20 min",
            completed: true,
          },
        ],
      },
      {
        id: "section-2",
        title: "HTML Text Elements",
        description: "Explore elements for formatting and structuring text",
        lessons: [
          {
            id: "lesson-4",
            title: "Headings and Paragraphs",
            duration: "15 min",
            completed: true,
          },
          {
            id: "lesson-5",
            title: "Text Formatting",
            duration: "20 min",
            completed: true,
          },
          {
            id: "lesson-6",
            title: "Lists",
            duration: "15 min",
            completed: true,
          },
          {
            id: "lesson-7",
            title: "Links and Anchors",
            duration: "20 min",
            completed: false,
          },
        ],
      },
      {
        id: "section-3",
        title: "HTML Media Elements",
        description: "Learn how to embed images, audio, and video",
        lessons: [
          {
            id: "lesson-8",
            title: "Images",
            duration: "20 min",
            completed: false,
          },
          {
            id: "lesson-9",
            title: "Audio",
            duration: "15 min",
            completed: false,
          },
          {
            id: "lesson-10",
            title: "Video",
            duration: "20 min",
            completed: false,
          },
        ],
      },
      {
        id: "section-4",
        title: "Semantic HTML",
        description: "Use semantic elements to improve accessibility and SEO",
        lessons: [
          {
            id: "lesson-11",
            title: "Semantic Elements",
            duration: "25 min",
            completed: false,
          },
          {
            id: "lesson-12",
            title: "Accessibility Best Practices",
            duration: "30 min",
            completed: false,
          },
        ],
      },
    ],
    assessments: [
      {
        id: "html-basics-quiz",
        title: "HTML Basics Quiz",
        description: "Test your knowledge of basic HTML concepts",
        questions: 10,
        duration: "15 min",
        completed: true,
        score: 90,
      },
      {
        id: "html-semantics-assessment",
        title: "Semantic HTML Assessment",
        description: "Demonstrate your understanding of semantic HTML",
        questions: 15,
        duration: "25 min",
        completed: false,
        score: null,
      },
    ],
  };

  // Find the next uncompleted lesson
  const nextLesson = course.sections
    .flatMap((section) => section.lessons)
    .find((lesson) => !lesson.completed);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Link href="/courses">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-bold text-xl">{course.title}</h1>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {course.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.topics.map((topic, i) => (
                    <Badge key={i} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Lessons</div>
                      <div className="text-lg font-bold">{course.lessons}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Time Spent</div>
                      <div className="text-lg font-bold">
                        {course.timeSpent}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Progress</div>
                      <div className="text-lg font-bold">
                        {course.progress}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <BookMarked className="h-4 w-4 mr-2" />
                  {course.bookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button className="flex-1" asChild>
                  <Link
                    href={`/courses/${course.id}/lessons/${
                      nextLesson?.id || "lesson-1"
                    }`}
                  >
                    {course.progress > 0
                      ? "Continue Learning"
                      : "Start Learning"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Tabs defaultValue="curriculum">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="assessments">Assessments</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum" className="mt-6">
                <div className="space-y-6">
                  {course.sections.map((section, index) => (
                    <Card key={section.id}>
                      <CardHeader>
                        <CardTitle>
                          Section {index + 1}: {section.title}
                        </CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-md hover:bg-muted"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                                )}
                                <span
                                  className={
                                    lesson.completed
                                      ? "text-muted-foreground"
                                      : ""
                                  }
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </span>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link
                                    href={`/courses/${course.id}/lessons/${lesson.id}`}
                                  >
                                    {lesson.completed ? "Review" : "Start"}
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="assessments" className="mt-6">
                <div className="space-y-6">
                  {course.assessments.map((assessment) => (
                    <Card key={assessment.id}>
                      <CardHeader>
                        <CardTitle>{assessment.title}</CardTitle>
                        <CardDescription>
                          {assessment.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {assessment.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {assessment.questions} questions
                            </span>
                          </div>
                        </div>
                        {assessment.completed && (
                          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                            <BarChart className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">
                              Your score: {assessment.score}%
                            </span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href={`/assessments/${assessment.id}`}>
                            {assessment.completed
                              ? "Review Assessment"
                              : "Take Assessment"}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Instructor</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Last Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.lastUpdated}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Level</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.level}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Lessons Completed</span>
                      <span>
                        {
                          course.sections
                            .flatMap((s) => s.lessons)
                            .filter((l) => l.completed).length
                        }{" "}
                        / {course.lessons}
                      </span>
                    </div>
                    <Progress
                      value={
                        (course.sections
                          .flatMap((s) => s.lessons)
                          .filter((l) => l.completed).length /
                          course.lessons) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Assessments Completed</span>
                      <span>
                        {course.assessments.filter((a) => a.completed).length} /{" "}
                        {course.assessments.length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (course.assessments.filter((a) => a.completed).length /
                          course.assessments.length) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">Next Lesson</h3>
                    {nextLesson ? (
                      <div className="p-3 border rounded-md">
                        <p className="font-medium">{nextLesson.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {nextLesson.duration}
                          </span>
                          <Button size="sm" asChild>
                            <Link
                              href={`/courses/${course.id}/lessons/${nextLesson.id}`}
                            >
                              Start
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        You&apos;ve completed all lessons!
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
