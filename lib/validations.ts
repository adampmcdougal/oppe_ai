import { z } from 'zod';

// User authentication schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['PHYSICIAN', 'PEER_REVIEWER', 'DEPARTMENT_HEAD', 'ADMINISTRATOR']),
  specialty: z.string().optional(),
  npi: z.string().regex(/^\d{10}$/, 'NPI must be 10 digits').optional(),
  licenseNumber: z.string().optional(),
});

// Case schemas
export const caseSchema = z.object({
  physicianId: z.string(),
  patientMRN: z.string().min(1, 'Patient MRN is required'),
  caseType: z.enum(['SURGICAL', 'MEDICAL', 'PROCEDURAL', 'CONSULTATION', 'EMERGENCY']),
  procedureCode: z.string().optional(),
  diagnosis: z.string().optional(),
  outcome: z.enum(['EXCELLENT', 'GOOD', 'ACCEPTABLE', 'POOR', 'ADVERSE_EVENT']),
  complications: z.string().optional(),
  date: z.string().datetime(),
  notes: z.string().optional(),
});

// Review schemas
export const reviewSchema = z.object({
  caseId: z.string(),
  reviewerId: z.string(),
  rating: z.number().min(1).max(5),
  technicalSkill: z.number().min(1).max(5).optional(),
  judgment: z.number().min(1).max(5).optional(),
  communication: z.number().min(1).max(5).optional(),
  professionalism: z.number().min(1).max(5).optional(),
  comments: z.string().optional(),
  concerns: z.string().optional(),
});

// Competency schemas
export const competencyScoreSchema = z.object({
  physicianId: z.string(),
  competencyId: z.string(),
  score: z.number().min(0).max(100),
  assessmentDate: z.string().datetime(),
  notes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CaseInput = z.infer<typeof caseSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type CompetencyScoreInput = z.infer<typeof competencyScoreSchema>;
