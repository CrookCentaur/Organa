import { NextResponse } from 'next/server';
import { identifyOrganism } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Image file is required' },
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

    // Convert the raw file to base64 server-side (no client bottleneck)
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type || 'image/jpeg';

    console.log(`DEBUG: Sending image to Gemini (${mimeType}, length: ${base64Data.length})...`);
    
    const result = await identifyOrganism(base64Data, mimeType);

    console.log('DEBUG: Gemini successfully identified:', result.commonName);

    const id = `org_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Generate a small data URL thumbnail for history persistence
    const thumbDataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      ...result,
      id,
      imageData: thumbDataUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('DEBUG: FULL ERROR FROM GEMINI API:', error);
    
    // Return a generic error message to the UI
    return NextResponse.json(
      { error: "Sorry we couldn't identify this, please try again" },
      { status: 500 }
    );
  }
}
