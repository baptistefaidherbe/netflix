import movies from '@/data/db.json';
import { dbConnect, dbDisconnect } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import ShowsSchema from '@/models/shows-schema';

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const result = await ShowsSchema.find().sort({ Id: 1 });
    return NextResponse.json(result);
  } catch (error) {
    dbDisconnect();
    return NextResponse.json(
      { error: 'Error fetching shows' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();

    if (!body.ids || !body.updateData) {
      return NextResponse.json({ error: 'Request body must contain "ids" and "updateData"' }, { status: 400 });
    }

    const { ids, updateData } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: '"ids" must be a non-empty array' }, { status: 400 });
    }


    const result = await ShowsSchema.updateMany(
      { Id: { $in: ids } },
      { $set: updateData }
    );


    return NextResponse.json(result);
  } catch (error) {
    dbDisconnect();
    return NextResponse.json({ error: 'Error updating show' }, { status: 500 });
  }
}
