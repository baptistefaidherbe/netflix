import { dbConnect, dbDisconnect } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import ShowsSchema from '@/models/shows-schema';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: number } }
) {
  const { slug } = params;
  await dbConnect();

  try {
    const result = await ShowsSchema.find({ Id: Number(slug) });
    return NextResponse.json(result);
  } catch (error) {
    dbDisconnect();
    return NextResponse.json(
      { error: 'Error fetching shows' },
      { status: 500 }
    );
  }
}
