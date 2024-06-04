import movies from '@/data/db.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: number } }
) {
  const { slug } = params;

  const data = {
    movie: movies.find((el) => el.Id === Number(slug)),
  };

  return NextResponse.json(data);
}
