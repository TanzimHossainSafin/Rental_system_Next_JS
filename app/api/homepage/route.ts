import prisma from '@/lib/prisma';
export async function GET() {
    const blogs = await prisma.review.findMany();
    return new Response(JSON.stringify(blogs));
}