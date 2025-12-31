import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { reviewSchema } from '@/lib/validations';
import { ZodError } from 'zod';

/**
 * GET /api/reviews
 * Retrieve reviews with optional filtering
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const caseId = searchParams.get('caseId');
    const reviewerId = searchParams.get('reviewerId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const where: any = {};
    
    if (caseId) {
      where.caseId = caseId;
    }
    
    if (reviewerId) {
      where.reviewerId = reviewerId;
    }
    
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          case: {
            select: {
              id: true,
              caseType: true,
              outcome: true,
              date: true,
              physician: {
                select: {
                  name: true,
                  specialty: true,
                },
              },
            },
          },
          reviewer: {
            select: {
              id: true,
              name: true,
              specialty: true,
            },
          },
        },
        orderBy: {
          reviewDate: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.review.count({ where }),
    ]);
    
    return NextResponse.json({
      reviews,
      total,
      limit,
      offset,
    });
    
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reviews
 * Create a new peer review
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = reviewSchema.parse(body);
    
    // Verify case exists
    const caseRecord = await prisma.case.findUnique({
      where: { id: validatedData.caseId },
    });
    
    if (!caseRecord) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }
    
    // Verify reviewer exists
    const reviewer = await prisma.user.findUnique({
      where: { id: validatedData.reviewerId },
    });
    
    if (!reviewer) {
      return NextResponse.json(
        { error: 'Reviewer not found' },
        { status: 404 }
      );
    }
    
    // Create review
    const review = await prisma.review.create({
      data: validatedData,
      include: {
        case: {
          select: {
            id: true,
            caseType: true,
            physician: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    
    // Update case review status
    await prisma.case.update({
      where: { id: validatedData.caseId },
      data: { reviewStatus: 'COMPLETED' },
    });
    
    return NextResponse.json(
      {
        message: 'Review created successfully',
        review,
      },
      { status: 201 }
    );
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
