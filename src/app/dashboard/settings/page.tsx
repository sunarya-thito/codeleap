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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/layout";
import { Moon, Globe, Laptop } from "lucide-react";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="container py-6 mx-auto">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="johndoe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible account actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive">Delete Account</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>
                    Customize the appearance of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5" />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <Switch id="theme-light" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Moon className="h-5 w-5" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                    <Switch id="theme-dark" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-5 w-5" />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                    <Switch id="theme-system" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>
                    Choose your preferred language
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      <Label htmlFor="language">Language</Label>
                    </div>
                    <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose what notifications you receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="email-notifications"
                        className="font-medium"
                      >
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="course-updates" className="font-medium">
                        Course Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about course updates
                      </p>
                    </div>
                    <Switch id="course-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="assessment-reminders"
                        className="font-medium"
                      >
                        Assessment Reminders
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive reminders about upcoming assessments
                      </p>
                    </div>
                    <Switch id="assessment-reminders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails" className="font-medium">
                        Marketing Emails
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive marketing and promotional emails
                      </p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Manage your privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="profile-visibility"
                        className="font-medium"
                      >
                        Profile Visibility
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch id="profile-visibility" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="learning-progress"
                        className="font-medium"
                      >
                        Learning Progress
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Share your learning progress with others
                      </p>
                    </div>
                    <Switch id="learning-progress" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-collection" className="font-medium">
                        Data Collection
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect usage data to improve the platform
                      </p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Privacy Settings</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                  <CardDescription>Export your personal data</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You can request a copy of your personal data, including your
                    profile information, learning progress, and assessment
                    results.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Request Data Export</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
