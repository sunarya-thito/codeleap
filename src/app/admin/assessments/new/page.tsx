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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";

export default function NewAssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([
    {
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddTestCase = (questionIndex: number) => {
    const newQuestions = [...questions];
    if (!newQuestions[questionIndex].testCases) {
      newQuestions[questionIndex].testCases = [];
    }
    newQuestions[questionIndex].testCases.push({
      input: "",
      expectedOutput: "",
    });
    setQuestions(newQuestions);
  };

  const handleRemoveTestCase = (
    questionIndex: number,
    testCaseIndex: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases.splice(testCaseIndex, 1);
    setQuestions(newQuestions);
  };

  const handleTestCaseChange = (
    questionIndex: number,
    testCaseIndex: number,
    field: string,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases[testCaseIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    // In a real app, this would save the assessment to the database
    router.push("/admin/assessments");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-bold text-xl">New Assessment</h1>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6 mx-auto">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
              <CardDescription>
                Enter the basic information for your assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assessment Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., JavaScript Fundamentals Assessment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Assessment Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this assessment will evaluate"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Associated Course</Label>
                  <Select>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="html-fundamentals">
                        HTML Fundamentals
                      </SelectItem>
                      <SelectItem value="css-styling">
                        CSS Styling & Layout
                      </SelectItem>
                      <SelectItem value="javascript-basics">
                        JavaScript Basics
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select defaultValue="beginner">
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" placeholder="e.g., 30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passing-score">Passing Score (%)</Label>
                  <Input
                    id="passing-score"
                    type="number"
                    placeholder="e.g., 70"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>
                Create questions for your assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Question {index + 1}</h3>
                    {questions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveQuestion(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`question-type-${index}`}>
                      Question Type
                    </Label>
                    <Select
                      value={question.type}
                      onValueChange={(value) =>
                        handleQuestionChange(index, "type", value)
                      }
                    >
                      <SelectTrigger id={`question-type-${index}`}>
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="multiple-answer">
                          Multiple Answer
                        </SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="coding-challenge">
                          Coding Challenge
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`question-text-${index}`}>Question</Label>
                    <Textarea
                      id={`question-text-${index}`}
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(index, "question", e.target.value)
                      }
                      placeholder="Enter your question"
                      rows={2}
                    />
                  </div>

                  {question.type === "true-false" ? (
                    <div className="space-y-2">
                      <Label>Correct Answer</Label>
                      <RadioGroup
                        value={question.correctAnswer}
                        onValueChange={(value) =>
                          handleQuestionChange(index, "correctAnswer", value)
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id={`true-${index}`} />
                          <Label htmlFor={`true-${index}`}>True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id={`false-${index}`} />
                          <Label htmlFor={`false-${index}`}>False</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  ) : question.type === "coding-challenge" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`challenge-description-${index}`}>
                          Challenge Description
                        </Label>
                        <Textarea
                          id={`challenge-description-${index}`}
                          value={question.description || ""}
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Provide detailed instructions, constraints, and examples."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`initial-code-${index}`}>
                          Initial Code
                        </Label>
                        <Textarea
                          id={`initial-code-${index}`}
                          value={question.initialCode || ""}
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              "initialCode",
                              e.target.value
                            )
                          }
                          placeholder="Provide starter code for the challenge."
                          rows={6}
                          className="font-mono text-sm"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label>Test Cases</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddTestCase(index)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Test Case
                          </Button>
                        </div>
                        {question.testCases?.map((testCase, testCaseIndex) => (
                          <div
                            key={testCaseIndex}
                            className="space-y-4 p-4 border rounded-md"
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">
                                Test Case {testCaseIndex + 1}
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRemoveTestCase(index, testCaseIndex)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`test-input-${index}-${testCaseIndex}`}
                              >
                                Input
                              </Label>
                              <Textarea
                                id={`test-input-${index}-${testCaseIndex}`}
                                value={testCase.input}
                                onChange={(e) =>
                                  handleTestCaseChange(
                                    index,
                                    testCaseIndex,
                                    "input",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., [1, 2, 3, 4, 5]"
                                rows={2}
                                className="font-mono text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`test-output-${index}-${testCaseIndex}`}
                              >
                                Expected Output
                              </Label>
                              <Textarea
                                id={`test-output-${index}-${testCaseIndex}`}
                                value={testCase.expectedOutput}
                                onChange={(e) =>
                                  handleTestCaseChange(
                                    index,
                                    testCaseIndex,
                                    "expectedOutput",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., 15"
                                rows={2}
                                className="font-mono text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Label>Options</Label>
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center gap-2"
                        >
                          {question.type === "multiple-choice" ? (
                            <RadioGroup
                              value={question.correctAnswer}
                              onValueChange={(value) =>
                                handleQuestionChange(
                                  index,
                                  "correctAnswer",
                                  value
                                )
                              }
                              className="flex items-center gap-2 w-full"
                            >
                              <RadioGroupItem
                                value={optionIndex.toString()}
                                id={`option-${index}-${optionIndex}`}
                              />
                              <Input
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    index,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                                className="flex-1"
                              />
                            </RadioGroup>
                          ) : (
                            <div className="flex items-center gap-2 w-full">
                              <Checkbox
                                id={`option-${index}-${optionIndex}`}
                                checked={(
                                  question.correctAnswer || ""
                                ).includes(optionIndex.toString())}
                                onCheckedChange={(checked) => {
                                  const currentAnswers = question.correctAnswer
                                    ? question.correctAnswer.split(",")
                                    : [];
                                  const newAnswers = checked
                                    ? [
                                        ...currentAnswers,
                                        optionIndex.toString(),
                                      ]
                                    : currentAnswers.filter(
                                        (a) => a !== optionIndex.toString()
                                      );
                                  handleQuestionChange(
                                    index,
                                    "correctAnswer",
                                    newAnswers.join(",")
                                  );
                                }}
                              />
                              <Input
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    index,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                                className="flex-1"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={handleAddQuestion}>
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                You can add as many questions as needed for your assessment,
                including a mix of question types.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
