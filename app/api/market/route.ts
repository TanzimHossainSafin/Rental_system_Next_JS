import prisma from '@/lib/prisma';
export async function GET() {
    const market = await prisma.rent.findMany();
    return new Response(JSON.stringify(market));
}