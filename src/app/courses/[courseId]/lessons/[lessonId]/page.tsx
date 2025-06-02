"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { CommentSection } from "@/components/comment-section";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const router = useRouter();
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { courseId, lessonId } = React.use(params);

  // Mock lesson data - in a real app, this would be fetched based on the course ID and lesson ID
  const lesson = {
    id: lessonId,
    courseId: courseId,
    title: "HTML Document Structure",
    content: `
# HTML Document Structure

HTML (HyperText Markup Language) is the standard markup language for creating web pages. An HTML document has a specific structure that browsers use to render the content correctly.

## Basic Structure

Every HTML document should start with a document type declaration, followed by the HTML element, which contains the head and body elements:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
\`\`\`

## Document Type Declaration

The \`<!DOCTYPE html>\` declaration helps browsers understand what version of HTML the page is using. For HTML5, the declaration is simple:

\`\`\`html
<!DOCTYPE html>
\`\`\`

## The HTML Element

The \`<html>\` element is the root element of an HTML page. All other elements must be descendants of this element. It's a good practice to add the \`lang\` attribute to specify the language of the document:

\`\`\`html
<html lang="en">
  <!-- Content goes here -->
</html>
\`\`\`

## The Head Element

The \`<head>\` element contains meta-information about the document, such as its title, character encoding, styles, scripts, and other metadata:

\`\`\`html
<head>
  <title>Page Title</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A description of the page">
  <link rel="stylesheet" href="styles.css">
  <script src="script.js"></script>
</head>
\`\`\`

## The Body Element

The \`<body>\` element contains the content of the document that is visible to users:

\`\`\`html
<body>
  <header>
    <h1>Website Title</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <p>Article content goes here.</p>
    </article>
  </main>
  
  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>
</body>
\`\`\`

## Practice Exercise

Try creating a basic HTML document structure with the following elements:

1. A proper document type declaration
2. An HTML element with the language set to English
3. A head section with a title, character encoding, and viewport meta tag
4. A body section with a heading and a paragraph

This will help you understand the fundamental structure of HTML documents.
    `,
    duration: "15 min",
    completed: false,
    courseProgress: 25,
    nextLesson: {
      id: "lesson-3",
      title: "Basic HTML Tags",
    },
    prevLesson: {
      id: "lesson-1",
      title: "What is HTML?",
    },
  };

  const handleComplete = () => {
    // In a real app, this would update the lesson status in the database
    router.push(`/courses/${courseId}/lessons/${lesson.nextLesson.id}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFeedback = (positive: boolean) => {
    // In a real app, this would send feedback to the server
    setFeedbackSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Link href={`/courses/${courseId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-bold text-xl truncate max-w-[200px] md:max-w-md">
              {lesson.title}
            </h1>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{lesson.duration}</span>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Course Progress: {lesson.courseProgress}%
          </div>
          <div className="flex items-center gap-4">
            {lesson.prevLesson && (
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={`/courses/${courseId}/lessons/${lesson.prevLesson.id}`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Link>
              </Button>
            )}
            {lesson.nextLesson && (
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={`/courses/${courseId}/lessons/${lesson.nextLesson.id}`}
                >
                  Next Lesson
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        <Progress value={lesson.courseProgress} className="h-2 mt-2" />
      </div>

      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardContent className="p-6">
                {/* <MarkdownRenderer content={lesson.content} /> */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lesson Feedback</CardTitle>
                <CardDescription>
                  Was this lesson helpful? Let us know!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {feedbackSubmitted ? (
                  <div className="text-center py-4">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="font-medium">Thank you for your feedback!</p>
                  </div>
                ) : (
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleFeedback(true)}
                    >
                      <ThumbsUp className="h-5 w-5 mr-2" />
                      Helpful
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleFeedback(false)}
                    >
                      <ThumbsDown className="h-5 w-5 mr-2" />
                      Not Helpful
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            <CommentSection lessonId={lessonId} courseId={courseId} />
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Lesson Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lesson.prevLesson && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Previous Lesson
                    </h3>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href={`/courses/${courseId}/lessons/${lesson.prevLesson.id}`}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {lesson.prevLesson.title}
                      </Link>
                    </Button>
                  </div>
                )}

                {lesson.nextLesson && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Next Lesson</h3>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href={`/courses/${courseId}/lessons/${lesson.nextLesson.id}`}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        {lesson.nextLesson.title}
                      </Link>
                    </Button>
                  </div>
                )}

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Lesson Status</h3>
                  {lesson.completed ? (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Completed</span>
                    </div>
                  ) : (
                    <Button className="w-full" onClick={handleComplete}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Completed
                    </Button>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Course Navigation
                  </h3>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/courses/${courseId}`}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Back to Course
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
