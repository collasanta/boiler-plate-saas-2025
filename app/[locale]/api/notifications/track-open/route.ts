import { trackNotificationOpen } from '@/lib/pwa';
import { NextResponse} from 'next/server'

export async function POST(request: Request) {
  try {
    const req = await request.json()

    const { subscriptionId } = req; 

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is missing' },
        { status: 400 } 
      );
    }

    const saveDB = await trackNotificationOpen(subscriptionId);

    if (saveDB.openedNotifications) {
      return NextResponse.json(
        { message: `Opened notification tracked for subscription ID: ${subscriptionId}` },
        { status: 200 } 
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to track notification open' },
        { status: 500 } 
      );
    }
  } catch (error) {
    console.error('Error tracking notification open:', error);
    return NextResponse.json(
      { error: 'Failed to track notification open' },
      { status: 500 } 
    );
  }
}