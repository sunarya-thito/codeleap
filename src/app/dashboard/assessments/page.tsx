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
import { Clock, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout";

export default function AssessmentsPage() {
  return (
    <Layout showBackButton backButtonFallback="/dashboard">
      <div className="container py-6 mx-auto">
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Assessments & Analytics
            </h1>
            <p className="text-muted-foreground">
              Test your knowledge and track your progress
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Score
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <Progress value={78} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Based on all completed assessments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Assessments Completed
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 / 25</div>
                <Progress value={48} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  48% of all available assessments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Time per Assessment
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18m 45s</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Total time: 3h 45m
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="available">
            <TabsList>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedAssessments.map((assessment) => (
                  <CompletedAssessmentCard
                    key={assessment.id}
                    assessment={assessment}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  difficulty: string;
  topics: string[];
  type: string;
}

interface CompletedAssessment extends Assessment {
  score: number;
  completedDate: string;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: string;
}

function AssessmentCard({ assessment }: { assessment: Assessment }) {
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
        <Badge variant="secondary">Mixed Question Types</Badge>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/dashboard/assessments/${assessment.id}`}>
            Start Assessment
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function CompletedAssessmentCard({
  assessment,
}: {
  assessment: CompletedAssessment;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{assessment.title}</CardTitle>
          <Badge
            variant={
              assessment.score >= 80
                ? "default"
                : assessment.score >= 60
                ? "secondary"
                : "destructive"
            }
          >
            {assessment.score}%
          </Badge>
        </div>
        <CardDescription>{assessment.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>Completed {assessment.completedDate}</span>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1 text-sm">
            <span>
              {assessment.correctAnswers} of {assessment.totalQuestions} correct
            </span>
            <span>{assessment.score}%</span>
          </div>
          <Progress value={assessment.score} />
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {assessment.topics.map((topic, i) => (
            <Badge key={i} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          <Clock className="inline h-3 w-3 mr-1" />
          <span>Time spent: {assessment.timeSpent}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/dashboard/assessments/${assessment.id}/review`}>
            Review
          </Link>
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/dashboard/assessments/${assessment.id}`}>Retake</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const availableAssessments: Assessment[] = [
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
  {
    id: "javascript-dom-manipulation",
    title: "JavaScript DOM Manipulation",
    description: "Test your ability to manipulate the DOM with JavaScript",
    duration: "40 min",
    questions: 20,
    difficulty: "Intermediate",
    topics: ["JavaScript", "DOM", "Events", "Selectors"],
    type: "mixed",
  },
];

const completedAssessments: CompletedAssessment[] = [
  {
    id: "html-basics",
    title: "HTML Basics",
    description: "Fundamentals of HTML structure and elements",
    duration: "20 min",
    questions: 15,
    difficulty: "Beginner",
    topics: ["HTML", "Elements", "Attributes"],
    type: "mixed",
    score: 92,
    completedDate: "May 10, 2025",
    correctAnswers: 14,
    totalQuestions: 15,
    timeSpent: "18m 45s",
  },
  {
    id: "css-fundamentals",
    title: "CSS Fundamentals",
    description: "Basic CSS styling and selectors",
    duration: "25 min",
    questions: 20,
    difficulty: "Beginner",
    topics: ["CSS", "Selectors", "Properties", "Box Model"],
    type: "mixed",
    score: 85,
    completedDate: "May 8, 2025",
    correctAnswers: 17,
    totalQuestions: 20,
    timeSpent: "22m 10s",
  },
  {
    id: "javascript-variables",
    title: "JavaScript Variables & Data Types",
    description: "Understanding JavaScript variables and data types",
    duration: "20 min",
    questions: 15,
    difficulty: "Beginner",
    topics: ["JavaScript", "Variables", "Data Types"],
    type: "mixed",
    score: 73,
    completedDate: "May 5, 2025",
    correctAnswers: 11,
    totalQuestions: 15,
    timeSpent: "15m 30s",
  },
];
