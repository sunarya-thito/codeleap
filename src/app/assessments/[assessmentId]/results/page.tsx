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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  BarChart,
} from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";

export default function AssessmentResultsPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock results data - in a real app, this would be fetched based on the assessment ID
  const results = {
    assessmentId: params.id,
    title: "JavaScript Fundamentals",
    score: 85,
    correctAnswers: 17,
    totalQuestions: 20,
    timeSpent: "24m 15s",
    completedDate: "May 18, 2025",
    questions: [
      {
        id: 1,
        question: "Which of the following is NOT a JavaScript data type?",
        userAnswer: "Float",
        correctAnswer: "Float",
        isCorrect: true,
      },
      {
        id: 2,
        question:
          "Which of the following are valid ways to declare a variable in JavaScript?",
        userAnswer: ["var x = 5;", "let y = 10;", "const z = 15;"],
        correctAnswer: ["var x = 5;", "let y = 10;", "const z = 15;"],
        isCorrect: true,
      },
      {
        id: 3,
        question: "What will be the output of: console.log(typeof [])?",
        userAnswer: "array",
        correctAnswer: "object",
        isCorrect: false,
        explanation:
          "In JavaScript, arrays are actually objects, so typeof [] returns 'object'.",
      },
    ],
    strengths: ["Variables", "Functions", "Operators"],
    weaknesses: ["Arrays", "Objects", "DOM Manipulation"],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Link href="/assessments">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-bold text-xl">Assessment Results</h1>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">
                  {results.title} - Results
                </CardTitle>
                <CardDescription>
                  Completed on {results.completedDate}
                </CardDescription>
              </div>
              <Badge
                className="text-lg px-3 py-1"
                variant={
                  results.score >= 80
                    ? "default"
                    : results.score >= 60
                    ? "secondary"
                    : "destructive"
                }
              >
                {results.score}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Correct Answers</div>
                  <div className="text-2xl font-bold">
                    {results.correctAnswers} / {results.totalQuestions}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Time Spent</div>
                  <div className="text-2xl font-bold">{results.timeSpent}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="text-sm font-medium">Performance</div>
                  <div className="text-2xl font-bold">
                    {results.score >= 90
                      ? "Excellent"
                      : results.score >= 80
                      ? "Great"
                      : results.score >= 70
                      ? "Good"
                      : results.score >= 60
                      ? "Fair"
                      : "Needs Improvement"}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Score</span>
                <span>{results.score}%</span>
              </div>
              <Progress value={results.score} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Question Review</CardTitle>
                <CardDescription>
                  Review your answers and see the correct solutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {results.questions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-2">
                      {question.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <h3 className="font-medium">
                          Question {index + 1}: {question.question}
                        </h3>
                        <div className="mt-2 space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">Your answer: </span>
                            {Array.isArray(question.userAnswer)
                              ? question.userAnswer.join(", ")
                              : question.userAnswer}
                          </div>
                          {!question.isCorrect && (
                            <div className="text-sm">
                              <span className="font-medium">
                                Correct answer:{" "}
                              </span>
                              {Array.isArray(question.correctAnswer)
                                ? question.correctAnswer.join(", ")
                                : question.correctAnswer}
                            </div>
                          )}
                          {!question.isCorrect && question.explanation && (
                            <div className="text-sm mt-2 p-2 bg-muted rounded-md">
                              <span className="font-medium">Explanation: </span>
                              {question.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < results.questions.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/assessments/${results.assessmentId}`}>
                    Retake Assessment
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
                <CardDescription>Topics you performed well in</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Topics to focus on</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-yellow-500" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learn">View Related Lessons</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
