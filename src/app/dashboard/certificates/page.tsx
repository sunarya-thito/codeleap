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
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import { Trophy, Download, Share2, Calendar, BookOpen } from "lucide-react";

export default function CertificatesPage() {
  return (
    <Layout showBackButton backButtonFallback="/dashboard">
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your Certificates
            </h1>
            <p className="text-muted-foreground">
              Showcase your achievements and skills
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Upcoming Certificates</CardTitle>
              <CardDescription>
                Complete these courses to earn more certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingCertificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-primary/10 p-2 text-primary">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">{certificate.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {certificate.progress}% completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/learn/${certificate.courseId}`}>
                        Continue Course
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

interface Certificate {
  id: string;
  title: string;
  description: string;
  date: string;
  skills: string[];
  imageUrl: string;
  courseId: string;
  courseName: string;
}

interface UpcomingCertificate {
  id: string;
  title: string;
  courseId: string;
  progress: number;
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <CardTitle>{certificate.title}</CardTitle>
        </div>
        <CardDescription>{certificate.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/9] bg-muted rounded-md flex items-center justify-center mb-4 overflow-hidden">
          <img
            src="/placeholder.svg?height=200&width=350"
            alt={certificate.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span>Issued on {certificate.date}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <BookOpen className="h-4 w-4" />
          <span>Course: {certificate.courseName}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {certificate.skills.map((skill, i) => (
            <Badge key={i} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/dashboard/certificates/${certificate.id}`}>
            <Share2 className="h-4 w-4 mr-2" />
            View & Share
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

const certificates: Certificate[] = [
  {
    id: "html-cert",
    title: "HTML Fundamentals Certificate",
    description: "Mastery of HTML structure and semantic elements",
    date: "April 15, 2025",
    skills: ["HTML5", "Semantic HTML", "Accessibility", "Forms"],
    imageUrl: "/placeholder.svg?height=200&width=350",
    courseId: "html-fundamentals",
    courseName: "HTML Fundamentals",
  },
  {
    id: "css-cert",
    title: "CSS Basics Certificate",
    description: "Proficiency in CSS styling and layout techniques",
    date: "March 20, 2025",
    skills: ["CSS3", "Selectors", "Box Model", "Typography"],
    imageUrl: "/placeholder.svg?height=200&width=350",
    courseId: "css-basics",
    courseName: "CSS Basics",
  },
  {
    id: "responsive-cert",
    title: "Responsive Web Design Certificate",
    description: "Creating websites that work on any device",
    date: "February 10, 2025",
    skills: ["Media Queries", "Flexbox", "Grid", "Mobile-First"],
    imageUrl: "/placeholder.svg?height=200&width=350",
    courseId: "responsive-web-design",
    courseName: "Responsive Web Design",
  },
];

const upcomingCertificates: UpcomingCertificate[] = [
  {
    id: "js-cert",
    title: "JavaScript Fundamentals Certificate",
    courseId: "javascript-basics",
    progress: 15,
  },
  {
    id: "css-advanced-cert",
    title: "Advanced CSS Certificate",
    courseId: "css-styling",
    progress: 30,
  },
];
