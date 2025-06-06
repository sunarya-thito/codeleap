"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";

export default function NewLearningMaterialPage() {
  const router = useRouter();
  const [materialType, setMaterialType] = useState("course");
  const [hasAssessment, setHasAssessment] = useState(false);
  const [sections, setSections] = useState([{ title: "", description: "" }]);
  //   const [lessonContent, setLessonContent] = useState(
  //     "# New Lesson\n\nStart writing your lesson content here..."
  //   );

  const handleAddSection = () => {
    setSections([...sections, { title: "", description: "" }]);
  };

  const handleRemoveSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const handleSave = () => {
    // In a real app, this would save the material to the database
    router.push("/admin/learning-materials");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl mr-6">
            <Link href="/admin/learning-materials">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-bold text-xl">New Learning Material</h1>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/learning-materials")}
            >
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
          <Tabs value={materialType} onValueChange={setMaterialType}>
            <TabsList>
              <TabsTrigger value="course">Course</TabsTrigger>
              <TabsTrigger value="lesson">Lesson</TabsTrigger>
            </TabsList>
            <TabsContent value="course" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                    <CardDescription>
                      Enter the basic information for your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input id="title" placeholder="e.g., HTML Fundamentals" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Course Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what students will learn in this course"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="level">Difficulty Level</Label>
                        <Select defaultValue="beginner">
                          <SelectTrigger id="level">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="topics">Topics (comma separated)</Label>
                        <Input
                          id="topics"
                          placeholder="e.g., HTML, Web Development"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="hasAssessment"
                        checked={hasAssessment}
                        onCheckedChange={setHasAssessment}
                      />
                      <Label htmlFor="hasAssessment">Include assessment</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Course Structure</CardTitle>
                    <CardDescription>
                      Define the sections of your course
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {sections.map((section, index) => (
                      <div
                        key={index}
                        className="space-y-4 p-4 border rounded-md"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Section {index + 1}</h3>
                          {sections.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSection(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`section-title-${index}`}>
                            Section Title
                          </Label>
                          <Input
                            id={`section-title-${index}`}
                            value={section.title}
                            onChange={(e) =>
                              handleSectionChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Introduction to HTML"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`section-description-${index}`}>
                            Section Description
                          </Label>
                          <Textarea
                            id={`section-description-${index}`}
                            value={section.description}
                            onChange={(e) =>
                              handleSectionChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Describe what this section covers"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={handleAddSection}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      You can add lessons to each section after creating the
                      course.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="lesson" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Lesson Details</CardTitle>
                    <CardDescription>
                      Enter the basic information for your lesson
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lesson-title">Lesson Title</Label>
                      <Input
                        id="lesson-title"
                        placeholder="e.g., HTML Document Structure"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
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
                        <Label htmlFor="section">Section</Label>
                        <Select>
                          <SelectTrigger id="section">
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="section-1">
                              Introduction to HTML
                            </SelectItem>
                            <SelectItem value="section-2">
                              HTML Text Elements
                            </SelectItem>
                            <SelectItem value="section-3">
                              HTML Media Elements
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input
                          id="duration"
                          type="number"
                          placeholder="e.g., 15"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="order">Order in Section</Label>
                        <Input id="order" type="number" placeholder="e.g., 2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Lesson Content</CardTitle>
                    <CardDescription>
                      Write your lesson content using Markdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <MarkdownEditor
                      content={lessonContent}
                      onChange={setLessonContent}
                    /> */}
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Use Markdown to format your content. You can add headings,
                      lists, code blocks, and more.
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
