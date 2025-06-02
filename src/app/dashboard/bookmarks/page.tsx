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
import { BookOpen, BookMarked, Clock, Trash2 } from "lucide-react";
import { Layout } from "@/components/layout";

export default function BookmarksPage() {
  return (
    <Layout showBackButton>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your Bookmarks
            </h1>
            <p className="text-muted-foreground">
              Access your saved learning materials and assessments
            </p>
          </div>

          <Tabs defaultValue="courses">
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookmarkedCourses.map((course) => (
                  <BookmarkedCourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="assessments" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookmarkedAssessments.map((assessment) => (
                  <BookmarkedAssessmentCard
                    key={assessment.id}
                    assessment={assessment}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="articles" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookmarkedArticles.map((article) => (
                  <BookmarkedArticleCard key={article.id} article={article} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

interface BookmarkedCourse {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: number;
  level: string;
  timeSpent: string;
  topics: string[];
  dateBookmarked: string;
}

function BookmarkedCourseCard({ course }: { course: BookmarkedCourse }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="grid gap-1">
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.level}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {course.topics.map((topic, i) => (
            <Badge key={i} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span>{course.progress}% complete</span>
          <span>{course.lessons} lessons</span>
        </div>
        <Progress value={course.progress} className="mb-2" />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Time spent: {course.timeSpent}</span>
          </div>
          <div className="flex items-center">
            <BookMarked className="h-3 w-3 mr-1" />
            <span>Bookmarked: {course.dateBookmarked}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Remove
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/dashboard/courses/${course.id}`}>
            {course.progress > 0 ? "Continue" : "Start Learning"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface BookmarkedAssessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  difficulty: string;
  topics: string[];
  dateBookmarked: string;
}

function BookmarkedAssessmentCard({
  assessment,
}: {
  assessment: BookmarkedAssessment;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{assessment.title}</CardTitle>
          <Badge
            variant={
              assessment.difficulty === "Beginner"
                ? "secondary"
                : assessment.difficulty === "Intermediate"
                ? "default"
                : "destructive"
            }
          >
            {assessment.difficulty}
          </Badge>
        </div>
        <CardDescription>{assessment.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{assessment.duration}</span>
          </div>
          <div>{assessment.questions} questions</div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {assessment.topics.map((topic, i) => (
            <Badge key={i} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground flex items-center">
          <BookMarked className="h-3 w-3 mr-1" />
          <span>Bookmarked: {assessment.dateBookmarked}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Remove
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/dashboard/assessments/${assessment.id}`}>
            Start Assessment
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface BookmarkedArticle {
  id: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  topics: string[];
  dateBookmarked: string;
}

function BookmarkedArticleCard({ article }: { article: BookmarkedArticle }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>By {article.author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {article.topics.map((topic, i) => (
            <Badge key={i} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{article.readTime} read</span>
          </div>
          <div className="flex items-center">
            <BookMarked className="h-3 w-3 mr-1" />
            <span>Bookmarked: {article.dateBookmarked}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Remove
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/articles/${article.id}`}>Read Article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const bookmarkedCourses: BookmarkedCourse[] = [
  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    description: "Get started with JavaScript programming fundamentals.",
    progress: 15,
    lessons: 20,
    level: "Beginner",
    timeSpent: "1h 10m",
    topics: ["JavaScript", "Programming", "Web Development"],
    dateBookmarked: "May 12, 2025",
  },
  {
    id: "html-fundamentals",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of web development with HTML5.",
    progress: 65,
    lessons: 12,
    level: "Beginner",
    timeSpent: "3h 20m",
    topics: ["HTML", "Web Development", "Semantic HTML"],
    dateBookmarked: "May 5, 2025",
  },
  {
    id: "react-for-beginners",
    title: "React for Beginners",
    description: "Learn the basics of building user interfaces with React.",
    progress: 0,
    lessons: 18,
    level: "Intermediate",
    timeSpent: "0m",
    topics: ["React", "JavaScript", "UI Development"],
    dateBookmarked: "May 15, 2025",
  },
];

const bookmarkedAssessments: BookmarkedAssessment[] = [
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    duration: "30 min",
    questions: 20,
    difficulty: "Beginner",
    topics: ["JavaScript", "Variables", "Functions", "Arrays"],
    dateBookmarked: "May 14, 2025",
  },
  {
    id: "css-layout-mastery",
    title: "CSS Layout Mastery",
    description: "Test your skills with CSS layouts",
    duration: "45 min",
    questions: 25,
    difficulty: "Intermediate",
    topics: ["CSS", "Flexbox", "Grid", "Responsive"],
    dateBookmarked: "May 10, 2025",
  },
];

const bookmarkedArticles: BookmarkedArticle[] = [
  {
    id: "javascript-async-await",
    title: "Understanding Async/Await in JavaScript",
    description:
      "A comprehensive guide to working with asynchronous JavaScript using async/await syntax.",
    author: "Sarah Johnson",
    readTime: "8 min",
    topics: ["JavaScript", "Async", "ES6+"],
    dateBookmarked: "May 16, 2025",
  },
  {
    id: "css-grid-vs-flexbox",
    title: "CSS Grid vs Flexbox: When to Use Each",
    description:
      "Learn the differences between CSS Grid and Flexbox and when to use each layout system.",
    author: "Michael Chen",
    readTime: "6 min",
    topics: ["CSS", "Layout", "Design"],
    dateBookmarked: "May 13, 2025",
  },
  {
    id: "web-accessibility",
    title: "Web Accessibility Best Practices",
    description:
      "Essential guidelines for building accessible websites that work for everyone.",
    author: "Alex Rodriguez",
    readTime: "10 min",
    topics: ["Accessibility", "HTML", "ARIA"],
    dateBookmarked: "May 8, 2025",
  },
];
