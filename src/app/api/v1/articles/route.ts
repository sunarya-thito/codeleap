import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { articleCreateSchema, idSchema } from "@/types/form";

// GET /api/v1/articles
export async function GET() {
    try {
        const articles = await prisma.article.findMany();
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// POST /api/v1/articles
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Expecting: { name, content_time_length, content_url, sectionId }
        const extendedSchema = articleCreateSchema.extend({
            sectionId: idSchema,
        });
        const parseResult = extendedSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json(
                { error: "Invalid data", details: parseResult.error.errors },
                { status: 400 }
            );
        }
        const { name, content_url, sectionId } = parseResult.data;
        const article = await prisma.article.create({
            data: {
                title: name,
                s3Url: content_url,
                sectionId,
            },
        });
        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}