import { NextResponse } from 'next/server';
import { identifyOrganism } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { image, mimeType } = await request.json();

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: 'Image data and mimeType are required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here' || process.env.GEMINI_API_KEY === '') {
      console.error('DEBUG: GEMINI_API_KEY is missing in environment variables.');
      return NextResponse.json(
        { error: 'Gemini API key is missing. Please add it to your .env.local file.' },
        { status: 500 }
      );
    }

    // Clean up the base64 string
    const base64Data = image.split(',')[1] || image;

    console.log(`DEBUG: Sending image to Gemini (${mimeType}, length: ${base64Data.length})...`);
    
    const result = await identifyOrganism(base64Data, mimeType);

    console.log('DEBUG: Gemini successfully identified:', result.commonName);

    const id = `org_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return NextResponse.json({
      ...result,
      id,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('DEBUG: FULL ERROR FROM GEMINI API:', error);
    
    // Return the actual error message to the UI so we can see it
    return NextResponse.json(
      { error: error.message || 'Failed to identify organism.' },
      { status: 500 }
    );
  }
}
