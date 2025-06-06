import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { idSchema } from "@/types/form";

// GET /api/v1/articles/[articleId]
export async function GET(
    req: NextRequest,
    { params }: { params: { articleId: string } }
) {
    const parseResult = idSchema.safeParse(params.articleId);
    if (!parseResult.success) {
        return NextResponse.json({ error: "Invalid articleId" }, { status: 400 });
    }
    const articleId = parseResult.data;
    try {
        const article = await prisma.article.findUnique({
            where: { id: articleId },
        });
        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }
        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// DELETE /api/v1/articles/[articleId]
export async function DELETE(
    req: NextRequest,
    { params }: { params: { articleId: string } }
) {
    const parseResult = idSchema.safeParse(params.articleId);
    if (!parseResult.success) {
        return NextResponse.json({ error: "Invalid articleId" }, { status: 400 });
    }
    const articleId = parseResult.data;
    try {
        await prisma.article.delete({
            where: { id: articleId },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Article not found or server error" }, { status: 404 });
    }
}