/**
 * Database Seed Script
 * Populates the database with sample data for testing and demonstration
 * 
 * Run with: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - comment out in production)
  await prisma.review.deleteMany();
  await prisma.physicianCompetency.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.case.deleteMany();
  await prisma.competency.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create competencies
  const competencies = await Promise.all([
    prisma.competency.create({
      data: {
        name: 'Patient Care',
        description: 'Provide compassionate, appropriate, and effective care',
        category: 'PATIENT_CARE',
        minimumScore: 75.0,
      },
    }),
    prisma.competency.create({
      data: {
        name: 'Medical Knowledge',
        description: 'Demonstrate knowledge of biomedical sciences',
        category: 'MEDICAL_KNOWLEDGE',
        minimumScore: 75.0,
      },
    }),
    prisma.competency.create({
      data: {
        name: 'Practice-Based Learning',
        description: 'Investigate and evaluate patient care practices',
        category: 'PRACTICE_BASED_LEARNING',
        minimumScore: 70.0,
      },
    }),
    prisma.competency.create({
      data: {
        name: 'Interpersonal Skills',
        description: 'Effective communication with patients and healthcare teams',
        category: 'INTERPERSONAL_SKILLS',
        minimumScore: 75.0,
      },
    }),
    prisma.competency.create({
      data: {
        name: 'Professionalism',
        description: 'Demonstrate ethical principles and accountability',
        category: 'PROFESSIONALISM',
        minimumScore: 80.0,
      },
    }),
    prisma.competency.create({
      data: {
        name: 'Systems-Based Practice',
        description: 'Understand healthcare system and optimize care delivery',
        category: 'SYSTEMS_BASED_PRACTICE',
        minimumScore: 70.0,
      },
    }),
  ]);

  console.log('✅ Created 6 competencies');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@oppeai.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMINISTRATOR',
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah.johnson@hospital.com',
        password: hashedPassword,
        name: 'Dr. Sarah Johnson',
        role: 'PHYSICIAN',
        specialty: 'Cardiology',
        npi: '1234567890',
        licenseNumber: 'CA-MD-12345',
      },
    }),
    prisma.user.create({
      data: {
        email: 'michael.chen@hospital.com',
        password: hashedPassword,
        name: 'Dr. Michael Chen',
        role: 'PHYSICIAN',
        specialty: 'Orthopedic Surgery',
        npi: '2345678901',
        licenseNumber: 'CA-MD-23456',
      },
    }),
    prisma.user.create({
      data: {
        email: 'emily.martinez@hospital.com',
        password: hashedPassword,
        name: 'Dr. Emily Martinez',
        role: 'PHYSICIAN',
        specialty: 'Emergency Medicine',
        npi: '3456789012',
        licenseNumber: 'CA-MD-34567',
      },
    }),
    prisma.user.create({
      data: {
        email: 'james.wilson@hospital.com',
        password: hashedPassword,
        name: 'Dr. James Wilson',
        role: 'PEER_REVIEWER',
        specialty: 'Internal Medicine',
        npi: '4567890123',
        licenseNumber: 'CA-MD-45678',
      },
    }),
  ]);

  console.log('✅ Created 5 users');

  // Create cases for physicians
  const cases = [];
  const physicians = users.filter(u => u.role === 'PHYSICIAN');

  for (const physician of physicians) {
    // Create 10-15 cases per physician
    const numCases = Math.floor(Math.random() * 6) + 10;
    
    for (let i = 0; i < numCases; i++) {
      const caseDate = new Date();
      caseDate.setDate(caseDate.getDate() - Math.floor(Math.random() * 90)); // Last 90 days

      const outcomes = ['EXCELLENT', 'GOOD', 'ACCEPTABLE', 'POOR', 'ADVERSE_EVENT'];
      const caseTypes = ['SURGICAL', 'MEDICAL', 'PROCEDURAL', 'CONSULTATION', 'EMERGENCY'];
      
      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      const caseType = caseTypes[Math.floor(Math.random() * caseTypes.length)];

      const newCase = await prisma.case.create({
        data: {
          physicianId: physician.id,
          patientMRN: `MRN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          caseType,
          procedureCode: caseType === 'SURGICAL' ? `CPT-${Math.floor(Math.random() * 90000) + 10000}` : undefined,
          diagnosis: `ICD10-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 90) + 10}`,
          outcome,
          complications: outcome === 'POOR' || outcome === 'ADVERSE_EVENT' ? 'Post-operative complications noted' : undefined,
          date: caseDate,
          reviewStatus: Math.random() > 0.3 ? 'COMPLETED' : 'PENDING',
          notes: 'Case documentation complete',
        },
      });
      
      cases.push(newCase);
    }
  }

  console.log(`✅ Created ${cases.length} cases`);

  // Create peer reviews for completed cases
  const reviewer = users.find(u => u.role === 'PEER_REVIEWER');
  const completedCases = cases.filter(c => c.reviewStatus === 'COMPLETED');
  
  for (const caseRecord of completedCases.slice(0, 30)) { // Review first 30 completed cases
    await prisma.review.create({
      data: {
        caseId: caseRecord.id,
        reviewerId: reviewer!.id,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 rating
        technicalSkill: Math.floor(Math.random() * 2) + 4,
        judgment: Math.floor(Math.random() * 2) + 4,
        communication: Math.floor(Math.random() * 2) + 4,
        professionalism: 5,
        comments: 'Excellent patient care and documentation',
        reviewDate: new Date(),
      },
    });
  }

  console.log('✅ Created 30 peer reviews');

  // Create competency scores for physicians
  for (const physician of physicians) {
    for (const competency of competencies) {
      // Create 3 assessment entries over time
      for (let i = 0; i < 3; i++) {
        const assessmentDate = new Date();
        assessmentDate.setMonth(assessmentDate.getMonth() - i);

        const baseScore = 75 + Math.random() * 20; // 75-95 range

        await prisma.physicianCompetency.create({
          data: {
            physicianId: physician.id,
            competencyId: competency.id,
            score: Math.round(baseScore * 10) / 10,
            assessmentDate,
            notes: i === 0 ? 'Most recent assessment' : `Assessment from ${i} month(s) ago`,
          },
        });
      }
    }
  }

  console.log('✅ Created competency scores');

  // Create some alerts
  const lowPerformingPhysician = physicians[2]; // Using index for example
  
  await Promise.all([
    prisma.alert.create({
      data: {
        physicianId: lowPerformingPhysician.id,
        severity: 'WARNING',
        type: 'HIGH_COMPLICATION_RATE',
        message: 'Elevated complication rate detected',
        details: 'Complication rate is 15% above department average',
        acknowledged: false,
      },
    }),
    prisma.alert.create({
      data: {
        physicianId: physicians[0].id,
        severity: 'INFO',
        type: 'MISSING_DATA',
        message: 'Incomplete case documentation',
        details: '3 cases missing procedure codes',
        acknowledged: true,
        acknowledgedAt: new Date(),
      },
    }),
  ]);

  console.log('✅ Created alerts');

  console.log('\n🎉 Database seeded successfully!\n');
  console.log('Sample login credentials:');
  console.log('Email: admin@oppeai.com');
  console.log('Email: sarah.johnson@hospital.com');
  console.log('Email: michael.chen@hospital.com');
  console.log('Password (all users): Password123!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
