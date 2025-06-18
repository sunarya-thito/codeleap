import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Code,
  BookOpen,
  BarChart,
  Trophy,
  Zap,
  Users,
  Star,
} from "lucide-react";

export default function LandingPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-flex mb-2">New Platform Launch</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Transform your future with{" "}
                  <span className="text-primary">code</span>
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Join thousands of learners who have launched new careers,
                  advanced in their field, and found the power to build their
                  ideas.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Start Learning Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/#">Explore Learning Paths</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Project-based learning</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Expert-crafted content</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Personalized feedback</span>
                </div>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-[100px] opacity-20 dark:opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background border rounded-xl shadow-lg p-6 w-[80%] h-[80%] flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 bg-muted rounded-md p-4 overflow-hidden">
                      <pre className="text-xs text-foreground/80 font-mono">
                        <code>
                          {`// Your journey starts here
function startCodingJourney() {
  const skills = [];
  const opportunities = [];
  const confidence = 0;
  
  // Learn step by step
  function learnNewSkill(skill) {
    skills.push(skill);
    confidence += 10;
    opportunities.push(...findOpportunities(skill));
  }
  
  // Build real projects
  function buildProject(name) {
    console.log(\`Building \${name}...\`);
    return {
      name,
      skills: skills,
      showcase: true
    };
  }
  
  // Transform your future
  return {
    skills,
    opportunities,
    confidence,
    portfolio: []
  };
}

// Start your coding journey today
const myFuture = startCodingJourney();`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-background">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Trusted by learners worldwide
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="ml-2 font-medium">4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">10,000+ active learners</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-medium">5,000+ certificates awarded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container px-4 mx-auto md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to master coding
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Our platform provides all the tools and resources to help you
              succeed
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background border-2 border-muted">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Lessons</h3>
                <p className="text-muted-foreground">
                  Learn with engaging content that combines theory with practice
                  through interactive examples and challenges.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-muted">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Coding Playground</h3>
                <p className="text-muted-foreground">
                  Practice your skills in our integrated coding environment with
                  real-time feedback and guidance.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-muted">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Comprehensive Assessments
                </h3>
                <p className="text-muted-foreground">
                  Test your knowledge with quizzes, coding challenges, and
                  practical assessments that reinforce learning.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-muted">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Recognized Certificates
                </h3>
                <p className="text-muted-foreground">
                  Earn industry-recognized certificates to showcase your skills
                  and achievements to potential employers.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-muted">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Personalized Learning
                </h3>
                <p className="text-muted-foreground">
                  Follow customized learning paths based on your goals,
                  interests, and skill level for maximum efficiency.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-muted">
              <CardContent className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with fellow learners, participate in discussions, and
                  get help when you need it from our supportive community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Success stories from our learners
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              See how CodeLeap has helped people transform their careers and
              lives
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">JD</span>
                  </div>
                  <div>
                    <h4 className="font-bold">James Davis</h4>
                    <p className="text-sm text-muted-foreground">
                      Former Teacher, Now Frontend Developer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;CodeLeap helped me transition from teaching to tech. The
                  structured learning paths and practical projects gave me the
                  skills and confidence to land my first developer job within 6
                  months.&quot;
                </p>
                <div className="mt-4 flex">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">SL</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Lee</h4>
                    <p className="text-sm text-muted-foreground">
                      Marketing Specialist to Full-Stack Developer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;I tried several platforms before finding CodeLeap. The
                  difference was night and day. The interactive lessons and
                  real-world projects helped me build a portfolio that impressed
                  employers.&quot;
                </p>
                <div className="mt-4 flex">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">MJ</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      College Student, Freelance Developer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;As a student, I needed affordable but comprehensive
                  learning resources. CodeLeap gave me exactly that, plus the
                  skills to start freelancing while still in school. I&apos;m
                  now earning while learning!&quot;
                </p>
                <div className="mt-4 flex">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to start your coding journey?
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-[800px]">
              Join thousands of learners who have successfully mastered coding
              with CodeLeap. Your future in tech starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button size="lg" asChild>
                <Link href="/you">
                  Start Learning Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/roadmap">Explore Learning Paths</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              No credit card required. Start learning for free.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
