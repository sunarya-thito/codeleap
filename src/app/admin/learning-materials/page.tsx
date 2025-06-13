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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import {
  Code,
  Search,
  Plus,
  FileText,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  CheckCircle,
} from "lucide-react";

export default function LearningMaterialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Code className="h-6 w-6 text-green-600" />
            <span>CodeLeaf Admin</span>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6 mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Learning Materials
              </h1>
              <p className="text-muted-foreground">
                Manage courses, lessons, and content
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search materials..."
                  className="w-full pl-8"
                />
              </div>
              <Button asChild>
                <Link href="/admin/learning-materials/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Material
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="courses">
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Courses</CardTitle>
                  <CardDescription>
                    Manage your published courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{course.level}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {course.lessons} lessons
                              </span>
                              {course.hasAssessment && (
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  <span>Has assessment</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/courses/${course.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              href={`/admin/learning-materials/edit/${course.id}`}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    Showing {courses.length} of {courses.length} courses
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="lessons" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Lessons</CardTitle>
                  <CardDescription>Manage individual lessons</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{lesson.course}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              href={`/learn/${lesson.courseId}/lessons/${lesson.id}`}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              href={`/admin/learning-materials/edit-lesson/${lesson.id}`}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    Showing {lessons.length} of {lessons.length} lessons
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="drafts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Draft Materials</CardTitle>
                  <CardDescription>
                    Continue working on unpublished content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {drafts.map((draft) => (
                      <div
                        key={draft.id}
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            {draft.type === "course" ? (
                              <BookOpen className="h-5 w-5 text-primary" />
                            ) : (
                              <FileText className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{draft.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">
                                {draft.type === "course" ? "Course" : "Lesson"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Last edited: {draft.lastEdited}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              href={`/admin/learning-materials/edit-${draft.type}/${draft.id}`}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    Showing {drafts.length} of {drafts.length} drafts
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

const courses = [
  {
    id: "html-fundamentals",
    title: "HTML Fundamentals",
    level: "Beginner",
    lessons: 12,
    hasAssessment: true,
  },
  {
    id: "css-styling",
    title: "CSS Styling & Layout",
    level: "Intermediate",
    lessons: 15,
    hasAssessment: true,
  },
  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    level: "Beginner",
    lessons: 20,
    hasAssessment: true,
  },
  {
    id: "css-animations",
    title: "CSS Animations",
    level: "Intermediate",
    lessons: 8,
    hasAssessment: false,
  },
];

const lessons = [
  {
    id: "lesson-1",
    title: "What is HTML?",
    course: "HTML Fundamentals",
    courseId: "html-fundamentals",
    duration: "10 min",
  },
  {
    id: "lesson-2",
    title: "HTML Document Structure",
    course: "HTML Fundamentals",
    courseId: "html-fundamentals",
    duration: "15 min",
  },
  {
    id: "lesson-3",
    title: "Basic HTML Tags",
    course: "HTML Fundamentals",
    courseId: "html-fundamentals",
    duration: "20 min",
  },
  {
    id: "lesson-4",
    title: "Introduction to CSS",
    course: "CSS Styling & Layout",
    courseId: "css-styling",
    duration: "15 min",
  },
  {
    id: "lesson-5",
    title: "CSS Selectors",
    course: "CSS Styling & Layout",
    courseId: "css-styling",
    duration: "20 min",
  },
];

const drafts = [
  {
    id: "draft-1",
    title: "Advanced JavaScript Concepts",
    type: "course",
    lastEdited: "2 days ago",
  },
  {
    id: "draft-2",
    title: "CSS Grid Layout",
    type: "lesson",
    lastEdited: "Yesterday",
  },
  {
    id: "draft-3",
    title: "JavaScript Promises",
    type: "lesson",
    lastEdited: "3 hours ago",
  },
];
