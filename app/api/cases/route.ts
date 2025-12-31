import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { caseSchema } from '@/lib/validations';
import { ZodError } from 'zod';

/**
 * GET /api/cases
 * Retrieve cases with optional filtering
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const physicianId = searchParams.get('physicianId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const where: any = {};
    
    if (physicianId) {
      where.physicianId = physicianId;
    }
    
    if (status) {
      where.reviewStatus = status;
    }
    
    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        include: {
          physician: {
            select: {
              id: true,
              name: true,
              specialty: true,
              npi: true,
            },
          },
          reviews: {
            select: {
              id: true,
              rating: true,
              reviewDate: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.case.count({ where }),
    ]);
    
    return NextResponse.json({
      cases,
      total,
      limit,
      offset,
    });
    
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cases
 * Create a new case
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = caseSchema.parse(body);
    
    // Verify physician exists
    const physician = await prisma.user.findUnique({
      where: { id: validatedData.physicianId },
    });
    
    if (!physician) {
      return NextResponse.json(
        { error: 'Physician not found' },
        { status: 404 }
      );
    }
    
    // Create case
    const newCase = await prisma.case.create({
      data: {
        physicianId: validatedData.physicianId,
        patientMRN: validatedData.patientMRN,
        caseType: validatedData.caseType,
        procedureCode: validatedData.procedureCode,
        diagnosis: validatedData.diagnosis,
        outcome: validatedData.outcome,
        complications: validatedData.complications,
        date: new Date(validatedData.date),
        notes: validatedData.notes,
      },
      include: {
        physician: {
          select: {
            id: true,
            name: true,
            specialty: true,
          },
        },
      },
    });
    
    return NextResponse.json(
      {
        message: 'Case created successfully',
        case: newCase,
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
    
    console.error('Error creating case:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
