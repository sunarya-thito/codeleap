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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import {
  Users,
  BookOpen,
  BarChart,
  FileText,
  LayoutDashboard,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your platform content and users
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              icon={<Users className="h-5 w-5" />}
              title="Total Users"
              value="1,234"
              description="+12% from last month"
              href="/admin/users"
            />
            <DashboardCard
              icon={<BookOpen className="h-5 w-5" />}
              title="Learning Materials"
              value="56"
              description="8 published this month"
              href="/admin/learning-materials"
            />
            <DashboardCard
              icon={<BarChart className="h-5 w-5" />}
              title="Assessments"
              value="32"
              description="Average score: 78%"
              href="/admin/assessments"
            />
            <DashboardCard
              icon={<FileText className="h-5 w-5" />}
              title="Roadmaps"
              value="5"
              description="2 recently updated"
              href="/admin/roadmaps"
            />
          </div>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Manage your platform efficiently
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Button className="justify-start" asChild>
                      <Link href="/admin/users">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Link>
                    </Button>
                    <Button className="justify-start" asChild>
                      <Link href="/admin/learning-materials/new">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Create Learning Material
                      </Link>
                    </Button>
                    <Button className="justify-start" asChild>
                      <Link href="/admin/assessments/new">
                        <BarChart className="h-4 w-4 mr-2" />
                        Create Assessment
                      </Link>
                    </Button>
                    <Button className="justify-start" asChild>
                      <Link href="/admin/roadmaps/edit">
                        <FileText className="h-4 w-4 mr-2" />
                        Edit Roadmaps
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>
                      Platform health and metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Server Status</span>
                        <span className="text-green-500 font-medium">
                          Operational
                        </span>
                      </div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Database Status</span>
                        <span className="text-green-500 font-medium">
                          Operational
                        </span>
                      </div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Storage Usage</span>
                        <span>68%</span>
                      </div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>API Requests (24h)</span>
                        <span>12,456</span>
                      </div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Active Sessions</span>
                        <span>243</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Detailed Metrics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="recent-activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest actions and events on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ActivityItem
                      title="New User Registration"
                      description="John Doe registered a new account"
                      timestamp="10 minutes ago"
                    />
                    <ActivityItem
                      title="Learning Material Updated"
                      description="CSS Fundamentals course was updated"
                      timestamp="1 hour ago"
                    />
                    <ActivityItem
                      title="Assessment Created"
                      description="JavaScript Basics assessment was created"
                      timestamp="3 hours ago"
                    />
                    <ActivityItem
                      title="Roadmap Modified"
                      description="Frontend Development roadmap was modified"
                      timestamp="5 hours ago"
                    />
                    <ActivityItem
                      title="User Role Changed"
                      description="Jane Smith was promoted to instructor"
                      timestamp="Yesterday"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/activity">View All Activity</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>
                    User engagement and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium mb-2">User Growth</h3>
                      <div className="flex-1 bg-muted rounded-md p-4 flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                          <BarChart className="h-16 w-16 text-muted-foreground mx-auto" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium mb-2">
                        Course Completion Rate
                      </h3>
                      <div className="flex-1 bg-muted rounded-md p-4 flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                          <BarChart className="h-16 w-16 text-muted-foreground mx-auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  href: string;
}

function DashboardCard({
  icon,
  title,
  value,
  description,
  href,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link href={href}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  timestamp: string;
}

function ActivityItem({ title, description, timestamp }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted">
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
        <LayoutDashboard className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground">{timestamp}</div>
    </div>
  );
}
