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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  Trophy,
  Clock,
  User,
  Settings,
  BookMarked,
  CheckCircle,
} from "lucide-react";
import { Layout } from "@/components/layout";

export default function YouPage() {
  return (
    <Layout>
      <div className="container py-10 mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 space-y-4">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-sm text-muted-foreground">
                Frontend Developer
              </p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4 mr-1" />
                <span>7 day streak</span>
              </div>
            </div>

            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/bookmarks">
                  <BookMarked className="h-4 w-4 mr-2" />
                  Bookmarks
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/certificates">
                  <Trophy className="h-4 w-4 mr-2" />
                  Certificates
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </nav>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="dashboard">
              <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="learning">Learning</TabsTrigger>
                <TabsTrigger value="assessments">Assessments</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Overall Progress
                      </CardTitle>
                      <Code className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42%</div>
                      <Progress value={42} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        You&apos;re making great progress!
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Current Streak
                      </CardTitle>
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">7 days</div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Keep going to maintain your streak!
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Time Spent Today
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1h 45m</div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Learning time today
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Time
                      </CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24h 35m</div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Total learning time
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>In Progress Courses</CardTitle>
                      <CardDescription>
                        Continue where you left off
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {inProgressCourses.map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between p-4 border rounded-md"
                          >
                            <div className="flex items-center gap-4">
                              <div className="rounded-md bg-primary/10 p-2 text-primary">
                                <BookOpen className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="font-medium">{course.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {course.progress}% complete
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    •
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {course.timeSpent}
                                  </span>
                                </div>
                                <Progress
                                  value={course.progress}
                                  className="h-1 mt-2 w-40"
                                />
                              </div>
                            </div>
                            <Button size="sm" asChild>
                              <Link href={`/dashboard/courses/${course.id}`}>
                                Continue
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/courses">View All Courses</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Assessments</CardTitle>
                      <CardDescription>
                        Your recent assessment results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentAssessments.map((assessment) => (
                          <div
                            key={assessment.id}
                            className="flex items-center justify-between p-4 border rounded-md"
                          >
                            <div className="flex items-center gap-4">
                              <div className="rounded-md bg-primary/10 p-2 text-primary">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  {assessment.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    Score: {assessment.score}%
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    •
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {assessment.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <Link
                                href={`/dashboard/assessments/${assessment.id}/results`}
                              >
                                Review
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/assessments">
                          View All Assessments
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="learning" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Learning Materials</CardTitle>
                        <CardDescription>
                          Browse and continue your learning journey
                        </CardDescription>
                      </div>
                      <Button asChild>
                        <Link href="/dashboard/courses">View All</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {courses.slice(0, 3).map((course) => (
                        <Card key={course.id}>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <div className="rounded-md bg-primary/10 p-2 text-primary">
                                <BookOpen className="h-4 w-4" />
                              </div>
                              <div>
                                <CardTitle className="text-base">
                                  {course.title}
                                </CardTitle>
                                <CardDescription>
                                  {course.level}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>{course.progress}% complete</span>
                              <span>{course.lessons} lessons</span>
                            </div>
                            <Progress
                              value={course.progress}
                              className="mb-2"
                            />
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" asChild>
                              <Link href={`/dashboard/courses/${course.id}`}>
                                {course.progress > 0
                                  ? "Continue"
                                  : "Start Learning"}
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Assessments</CardTitle>
                        <CardDescription>
                          Test your knowledge and skills
                        </CardDescription>
                      </div>
                      <Button asChild>
                        <Link href="/dashboard/assessments">View All</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {availableAssessments.slice(0, 3).map((assessment) => (
                        <Card key={assessment.id}>
                          <CardHeader>
                            <CardTitle className="text-base">
                              {assessment.title}
                            </CardTitle>
                            <CardDescription>
                              {assessment.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm mb-4">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                <span>{assessment.duration}</span>
                              </div>
                              <div>{assessment.questions} questions</div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" asChild>
                              <Link href={`/you/assessments/${assessment.id}`}>
                                Start Assessment
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const inProgressCourses = [
  {
    id: "html-fundamentals",
    title: "HTML Fundamentals",
    progress: 65,
    timeSpent: "3h 20m",
  },
  {
    id: "css-styling",
    title: "CSS Styling & Layout",
    progress: 30,
    timeSpent: "2h 45m",
  },
  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    progress: 15,
    timeSpent: "1h 10m",
  },
];

const recentAssessments = [
  {
    id: "html-basics",
    title: "HTML Basics Assessment",
    score: 92,
    date: "May 10, 2025",
  },
  {
    id: "css-fundamentals",
    title: "CSS Fundamentals Quiz",
    score: 85,
    date: "May 8, 2025",
  },
  {
    id: "javascript-variables",
    title: "JavaScript Variables & Data Types",
    score: 73,
    date: "May 5, 2025",
  },
];

const courses = [
  {
    id: "html-fundamentals",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of web development with HTML5.",
    icon: "BookOpen",
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
    icon: "BookOpen",
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
    icon: "BookOpen",
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
    icon: "BookOpen",
    progress: 0,
    lessons: 8,
    level: "Intermediate",
    timeSpent: "0m",
    topics: ["CSS", "Animations", "Transitions", "Keyframes"],
    bookmarked: false,
    hasAssessment: false,
  },
];

const availableAssessments = [
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    duration: "30 min",
    questions: 20,
    difficulty: "Beginner",
    topics: ["JavaScript", "Variables", "Functions", "Arrays"],
    type: "mixed",
  },
  {
    id: "css-layout-mastery",
    title: "CSS Layout Mastery",
    description: "Test your skills with CSS layouts",
    duration: "45 min",
    questions: 25,
    difficulty: "Intermediate",
    topics: ["CSS", "Flexbox", "Grid", "Responsive"],
    type: "mixed",
  },
  {
    id: "html5-advanced-features",
    title: "HTML5 Advanced Features",
    description: "Test your knowledge of advanced HTML5 features",
    duration: "25 min",
    questions: 15,
    difficulty: "Intermediate",
    topics: ["HTML5", "Semantic Elements", "Forms", "Accessibility"],
    type: "mixed",
  },
];
