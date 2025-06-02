import type React from "react";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Code,
  Search,
  Clock,
  CheckCircle,
  BookMarked,
} from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";

export default function LearnPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Code className="h-6 w-6 text-green-600" />
            <span>CodeLeaf</span>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Learning Materials
              </h1>
              <p className="text-muted-foreground">
                Browse and continue your learning journey
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="w-full pl-8"
                />
              </div>
              <Button variant="outline">Filters</Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="in-progress" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses
                  .filter(
                    (course) => course.progress > 0 && course.progress < 100
                  )
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses
                  .filter((course) => course.progress === 100)
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="bookmarked" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses
                  .filter((course) => course.bookmarked)
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  lessons: number;
  level: string;
  timeSpent: string;
  topics: string[];
  bookmarked: boolean;
  hasAssessment: boolean;
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            {course.icon}
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
          {course.hasAssessment && (
            <div className="flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span>Has assessment</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/courses/${course.id}`}>
            <BookMarked className="h-4 w-4 mr-2" />
            View Course
          </Link>
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/courses/${course.id}/lessons/1`}>
            {course.progress > 0 ? "Continue" : "Start Learning"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const courses: Course[] = [
  {
    id: "html-fundamentals",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of web development with HTML5.",
    icon: <BookOpen className="h-4 w-4" />,
    progress: 65,
    lessons: 12,
    level: "Beginner",
    timeSpent: "3h 20m",
    topics: ["HTML", "Web Development", "Semantic HTML"],
    bookmarked: true,
    hasAssessment: true,
  },
  {
    id: "css-styling",
    title: "CSS Styling & Layout",
    description: "Master CSS styling techniques and responsive layouts.",
    icon: <BookOpen className="h-4 w-4" />,
    progress: 30,
    lessons: 15,
    level: "Intermediate",
    timeSpent: "2h 45m",
    topics: ["CSS", "Flexbox", "Grid", "Responsive Design"],
    bookmarked: false,
    hasAssessment: true,
  },
  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    description: "Get started with JavaScript programming fundamentals.",
    icon: <BookOpen className="h-4 w-4" />,
    progress: 15,
    lessons: 20,
    level: "Beginner",
    timeSpent: "1h 10m",
    topics: ["JavaScript", "Programming", "Web Development"],
    bookmarked: true,
    hasAssessment: true,
  },
  {
    id: "css-animations",
    title: "CSS Animations",
    description: "Create engaging user experiences with CSS animations.",
    icon: <BookOpen className="h-4 w-4" />,
    progress: 0,
    lessons: 8,
    level: "Intermediate",
    timeSpent: "0m",
    topics: ["CSS", "Animations", "Transitions", "Keyframes"],
    bookmarked: false,
    hasAssessment: false,
  },
  {
    id: "javascript-dom",
    title: "JavaScript DOM Manipulation",
    description:
      "Learn to interact with the Document Object Model using JavaScript.",
    icon: <BookOpen className="h-4 w-4" />,
    progress: 0,
    lessons: 14,
    level: "Intermediate",
    timeSpent: "0m",
    topics: ["JavaScript", "DOM", "Web Development"],
    bookmarked: false,
    hasAssessment: true,
  },
  {
    id: "html-basics",
    title: "HTML Basics",
    description: "Introduction to HTML tags and document structure.",
    icon: <BookOpen className="h-4 w-4" />,
    progress: 100,
    lessons: 10,
    level: "Beginner",
    timeSpent: "5h 15m",
    topics: ["HTML", "Web Development"],
    bookmarked: false,
    hasAssessment: true,
  },
];
