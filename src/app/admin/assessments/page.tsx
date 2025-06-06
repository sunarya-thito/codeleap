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
  Edit,
  Trash2,
  Eye,
  BarChart,
  Clock,
} from "lucide-react";

export default function AssessmentsPage() {
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
              <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
              <p className="text-muted-foreground">
                Manage quizzes, tests, and coding challenges
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assessments..."
                  className="w-full pl-8"
                />
              </div>
              <Button asChild>
                <Link href="/admin/assessments/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Assessment
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Assessments</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="coding">Coding Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Assessments</CardTitle>
                  <CardDescription>
                    Manage your assessments and challenges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessments.map((assessment) => (
                      <div
                        key={assessment.id}
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                            <BarChart className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{assessment.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{assessment.type}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {assessment.questions} questions
                              </span>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{assessment.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/assessments/${assessment.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              href={`/admin/assessments/edit/${assessment.id}`}
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
                    Showing {assessments.length} of {assessments.length}{" "}
                    assessments
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="quizzes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quizzes</CardTitle>
                  <CardDescription>
                    Multiple choice and multiple answer assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessments
                      .filter((a) => a.type === "Quiz")
                      .map((assessment) => (
                        <div
                          key={assessment.id}
                          className="flex items-center justify-between p-4 border rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                              <BarChart className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {assessment.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">
                                  {assessment.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {assessment.questions} questions
                                </span>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{assessment.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/assessments/${assessment.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link
                                href={`/admin/assessments/edit/${assessment.id}`}
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
              </Card>
            </TabsContent>
            <TabsContent value="coding" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Coding Challenges</CardTitle>
                  <CardDescription>
                    Live coding assessments with automated tests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assessments
                      .filter((a) => a.type === "Coding Challenge")
                      .map((assessment) => (
                        <div
                          key={assessment.id}
                          className="flex items-center justify-between p-4 border rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                              <BarChart className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {assessment.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">
                                  {assessment.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {assessment.questions} questions
                                </span>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{assessment.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/assessments/${assessment.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link
                                href={`/admin/assessments/edit/${assessment.id}`}
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
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

const assessments = [
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    type: "Quiz",
    questions: 20,
    duration: "30 min",
    course: "JavaScript Basics",
  },
  {
    id: "css-layout-mastery",
    title: "CSS Layout Mastery",
    type: "Quiz",
    questions: 25,
    duration: "45 min",
    course: "CSS Styling & Layout",
  },
  {
    id: "html5-advanced-features",
    title: "HTML5 Advanced Features",
    type: "Quiz",
    questions: 15,
    duration: "25 min",
    course: "HTML Fundamentals",
  },
  {
    id: "javascript-array-functions",
    title: "JavaScript Array Functions",
    type: "Coding Challenge",
    questions: 5,
    duration: "40 min",
    course: "JavaScript Basics",
  },
  {
    id: "css-flexbox-challenge",
    title: "CSS Flexbox Challenge",
    type: "Coding Challenge",
    questions: 3,
    duration: "30 min",
    course: "CSS Styling & Layout",
  },
];
