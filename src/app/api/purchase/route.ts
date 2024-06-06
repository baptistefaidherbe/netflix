import { dbConnect, dbDisconnect } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import PurchaseSchema from '@/models/purchase-schema';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  await dbConnect();

  try {
    const purchases = await PurchaseSchema.find({ userId });

    return NextResponse.json({ purchases }, { status: 200 });
  } catch (error) {
    dbDisconnect();
    return NextResponse.json(
      { error: 'Error fetching purchase' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { videoIds, userId } = body;

  if (!Array.isArray(videoIds)) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  await dbConnect();

  try {
    const purchaseTime = new Date();
    const purchasePromises = videoIds.map((videoId) => {
      const newPurchase = new PurchaseSchema({
        userId,
        videoId,
        purchaseTime,
      });
      return newPurchase.save();
    });

    await Promise.all(purchasePromises);

    return NextResponse.json({ purchaseTime });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating purchase' },
      { status: 500 }
    );
  }
}
