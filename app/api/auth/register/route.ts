import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { registerSchema } from '@/lib/validations';
import { ZodError } from 'zod';

/**
 * POST /api/auth/register
 * Register a new user in the system
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Check for duplicate NPI if provided
    if (validatedData.npi) {
      const existingNPI = await prisma.user.findUnique({
        where: { npi: validatedData.npi },
      });
      
      if (existingNPI) {
        return NextResponse.json(
          { error: 'User with this NPI already exists' },
          { status: 400 }
        );
      }
    }
    
    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: validatedData.role,
        specialty: validatedData.specialty,
        npi: validatedData.npi,
        licenseNumber: validatedData.licenseNumber,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        specialty: true,
        npi: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user 
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
    
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
