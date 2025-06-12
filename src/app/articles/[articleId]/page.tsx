"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowLeft,
} from "lucide-react";

import { mockArticles, mockTags } from "@/data/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// import { MarkdownRenderer } from "@/components/markdown-renderer";

export default function ArticlePage() {
  const { articleId } = useParams();
  const article = mockArticles.find((a) => a.slug === articleId);

  if (!article) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <p className="text-muted-foreground mb-8">
          The article you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </div>
    );
  }

  // Find related articles based on shared tags
  const relatedArticles = mockArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        a.tags.some((tag) =>
          article.tags.some((articleTag) => articleTag.id === tag.id)
        )
    )
    .slice(0, 3);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          asChild
          className="mb-4 pl-0 hover:bg-transparent"
        >
          <Link href="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {new Date(article.publishedAt ?? "").toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {article.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <EyeIcon className="h-4 w-4" />
                {article.viewCount || Math.floor(Math.random() * 1000)} views
              </span>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
              <img
                src={
                  article.featuredImage ||
                  "/placeholder.svg?height=400&width=800"
                }
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            {/* <MarkdownRenderer content={article.content} /> */}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <HeartIcon className="h-4 w-4" />
                Like ({article.likeCount || Math.floor(Math.random() * 100)})
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <BookmarkIcon className="h-4 w-4" />
                Bookmark
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <ShareIcon className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Author"
              />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Author Name</p>
              <p className="text-sm text-muted-foreground">
                Content creator and educator with expertise in web development.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((relatedArticle) => (
                    <div key={relatedArticle.id} className="grid gap-2">
                      <Link
                        href={`/articles/${relatedArticle.slug}`}
                        className="font-medium hover:underline"
                      >
                        {relatedArticle.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {new Date(
                            relatedArticle.publishedAt ?? ""
                          ).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {relatedArticle.readTime} min
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No related articles found.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {mockTags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
