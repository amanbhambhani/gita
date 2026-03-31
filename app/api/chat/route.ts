import { NextRequest, NextResponse } from 'next/server';
import { getKrishnaGuidance } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const guidance = await getKrishnaGuidance(message, language);

    return NextResponse.json({ guidance });
  } catch (error) {
    console.error("API Chat Error:", error);
    return NextResponse.json({ 
      error: "The divine connection was interrupted. Please try again later.",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
