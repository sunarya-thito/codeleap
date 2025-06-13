import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  TagIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockArticles, mockTags } from "@/data/articles";

export default function ArticlesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
        <p className="text-muted-foreground">
          Explore our latest articles, tutorials, and resources to enhance your
          learning journey.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-[2fr_1fr]">
        <div>
          <Input placeholder="Search articles..." className="w-full" />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="newest">
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most viewed</SelectItem>
              <SelectItem value="liked">Most liked</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              {mockTags.map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          <TagIcon className="h-3 w-3" />
          JavaScript
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
          >
            ×
          </Button>
        </Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={
                    article.featuredImage ||
                    "/placeholder.svg?height=200&width=400"
                  }
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 p-4">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="px-2 py-0 text-xs"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <h3 className="line-clamp-2 text-xl font-semibold">
                <Link
                  href={`/articles/${article.slug}`}
                  className="hover:underline"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {new Date(article.publishedAt ?? "").toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-3 w-3" />
                  {article.readTime} min read
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <EyeIcon className="h-3 w-3" />
                  {article.viewCount || Math.floor(Math.random() * 1000)}
                </span>
                <span className="flex items-center gap-1">
                  <HeartIcon className="h-3 w-3" />
                  {article.likeCount || Math.floor(Math.random() * 100)}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
