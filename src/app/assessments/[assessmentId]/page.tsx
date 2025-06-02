/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AssessmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string | string[]>
  >({});
  const [timeRemaining, setTimeRemaining] = useState("28:45");
  const [activeTab, setActiveTab] = useState<string>("questions");

  // Mock assessment data - in a real app, this would be fetched based on the ID
  const assessment = {
    id: params.id,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    duration: "30 min",
    totalQuestions: 20,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Symbol"],
        correctAnswer: "Float",
      },
      {
        id: 2,
        type: "multiple-answer",
        question:
          "Which of the following are valid ways to declare a variable in JavaScript? (Select all that apply)",
        options: ["var x = 5;", "let y = 10;", "const z = 15;", "int a = 20;"],
        correctAnswers: ["var x = 5;", "let y = 10;", "const z = 15;"],
      },
      {
        id: 3,
        type: "true-false",
        question: "JavaScript is a statically typed language.",
        correctAnswer: "false",
      },
      {
        id: 4,
        type: "coding-challenge",
        question:
          "Write a function that takes an array of numbers and returns the sum of all numbers.",
        description: `
          The function should:
          - Be named sumArray
          - Take one parameter: an array of numbers
          - Return the sum of all numbers in the array
          - Example: sumArray([1, 2, 3, 4, 5]) should return 15
        `,
        initialCode: `function sumArray(numbers) {
  // Write your code here
}

// Example usage:
// sumArray([1, 2, 3, 4, 5]) should return 15`,
        testCases: [
          { input: "[1, 2, 3, 4, 5]", expectedOutput: "15" },
          { input: "[-1, -2, -3]", expectedOutput: "-6" },
        ],
      },
      {
        id: 5,
        type: "multiple-choice",
        question:
          "Which method is used to add elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()",
      },
    ],
  };

  const handleSingleAnswerChange = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: value,
    });
  };

  const handleMultipleAnswerChange = (option: string) => {
    const currentAnswers = (selectedAnswers[currentQuestion] as string[]) || [];
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((item) => item !== option)
      : [...currentAnswers, option];

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: updatedAnswers,
    });
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit the assessment and calculate the score
    router.push(`/assessments/${params.id}/results`);
  };

  const currentQuestionData = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-bold text-xl">{assessment.title}</h1>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{timeRemaining}</span>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {assessment.questions.length}
            </div>
            <div className="text-sm font-medium">
              Progress: {Math.round(progress)}%
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {currentQuestionData.type === "coding-challenge" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
                <CardDescription>
                  {currentQuestionData.question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm whitespace-pre-line">
                      {currentQuestionData.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Solution</CardTitle>
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="tests">Tests</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="p-0">
                {/* <CodeEditor
                  language="javascript"
                  value={
                    (selectedAnswers[currentQuestion] as string) ||
                    currentQuestionData.initialCode
                  }
                  onChange={handleCodeChange}
                  height="400px"
                /> */}
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" onClick={() => setActiveTab("tests")}>
                  Run Tests
                </Button>
                <Button onClick={() => setActiveTab("output")}>Run Code</Button>
              </CardFooter>
            </Card>
          </div>
        ) : currentQuestionData.type === "true-false" ? (
          <Card>
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
              <CardDescription>{currentQuestionData.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion] as string}
                onValueChange={handleSingleAnswerChange}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="true" />
                    <Label htmlFor="true">True</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="false" />
                    <Label htmlFor="false">False</Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion < assessment.questions.length - 1 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit}>Submit Assessment</Button>
              )}
            </CardFooter>
          </Card>
        ) : currentQuestionData.type === "multiple-choice" ? (
          <Card>
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
              <CardDescription>{currentQuestionData.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion] as string}
                onValueChange={handleSingleAnswerChange}
              >
                <div className="space-y-4">
                  {currentQuestionData.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion < assessment.questions.length - 1 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit}>Submit Assessment</Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
              <CardDescription>{currentQuestionData.question}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentQuestionData.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${index}`}
                      checked={(
                        (selectedAnswers[currentQuestion] as string[]) || []
                      ).includes(option)}
                      onCheckedChange={() => handleMultipleAnswerChange(option)}
                    />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion < assessment.questions.length - 1 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit}>Submit Assessment</Button>
              )}
            </CardFooter>
          </Card>
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Exit Assessment
          </Button>
          {currentQuestion === assessment.questions.length - 1 && (
            <Button onClick={handleSubmit}>Submit Assessment</Button>
          )}
        </div>
      </main>
    </div>
  );
}
