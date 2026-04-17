import { NextRequest, NextResponse } from 'next/server';
import { parseNaturalLanguageQuery } from '@/lib/nlp/parser';
import { NLPParseRequest } from '@/lib/api/types';

export async function POST(request: NextRequest) {
  try {
    const body: NLPParseRequest = await request.json();
    
    if (!body.query || typeof body.query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }
    
    const result = parseNaturalLanguageQuery(body.query, body.context);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error parsing NLP query:', error);
    
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Failed to parse query', message },
      { status: 500 }
    );
  }
}
