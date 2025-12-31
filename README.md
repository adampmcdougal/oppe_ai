# OPPE AI - Ongoing Professional Practice Evaluation System

A comprehensive Next.js application for healthcare organizations to track physician performance, manage peer reviews, monitor competencies, and ensure continuous quality improvement in clinical practice.

## 🏥 Features

### Core Functionality
- **Physician Performance Tracking**: Monitor individual physician cases, outcomes, and complications
- **Peer Review Management**: Structured peer review process with standardized evaluation criteria
- **Competency Assessment**: Track ACGME six core competencies with automated scoring
- **Real-time Alerts**: Immediate notifications for performance concerns and intervention opportunities
- **Analytics Dashboard**: Comprehensive visualizations of trends, patterns, and key metrics
- **Case Logging**: Detailed case documentation with procedure codes, diagnoses, and outcomes

### Security & Compliance
- **HIPAA Compliant**: Patient data protection with secure storage and access controls
- **Role-based Access**: Physician, Peer Reviewer, Department Head, and Administrator roles
- **Audit Trails**: Complete logging of all system activities
- **Data Validation**: Input validation with Zod schemas for data integrity

## 🚀 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: bcryptjs for password hashing
- **UI Components**: React with Tailwind CSS
- **Icons**: Lucide React
- **Validation**: Zod schemas
- **Charts**: Recharts (ready to implement)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oppe_ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your database connection:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/oppe_ai?schema=public"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Key Models

#### User
- Physician and reviewer information
- Credentials (NPI, license number)
- Role-based access control

#### Case
- Patient cases (anonymized with MRN)
- Case type, procedure codes, diagnoses
- Outcomes and complications
- Review status tracking

#### Review
- Peer review data
- Rating scales (1-5) for multiple criteria
- Technical skill, judgment, communication, professionalism
- Comments and concerns

#### Competency
- ACGME six core competencies
- Minimum score thresholds
- Category-based organization

#### PhysicianCompetency
- Individual competency scores
- Assessment dates and trends
- Performance tracking over time

#### Alert
- Performance alerts and notifications
- Severity levels (INFO, WARNING, CRITICAL)
- Alert types (competency, complication rate, peer review concerns)

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Cases
- `GET /api/cases` - List cases (supports filtering)
- `POST /api/cases` - Create new case

### Reviews
- `GET /api/reviews` - List peer reviews
- `POST /api/reviews` - Submit peer review

## 🎨 UI Components

### Dashboard
- Statistics cards (physicians, cases, reviews, alerts)
- Chart visualizations (outcomes, competency trends)
- Recent activity feed
- Active alerts panel

### Navigation
- Responsive sidebar navigation
- Role-based menu items
- Mobile-friendly hamburger menu

## 📈 Future Enhancements

### Planned Features
- [ ] Advanced analytics and reporting
- [ ] Chart.js/Recharts integration for data visualization
- [ ] Email notifications for alerts
- [ ] Automated competency assessment
- [ ] Export functionality (PDF reports)
- [ ] Advanced search and filtering
- [ ] Data import/export tools
- [ ] Mobile app version
- [ ] Integration with EHR systems
- [ ] Machine learning for pattern detection

### Authentication Enhancement
- [ ] NextAuth.js integration
- [ ] SSO support
- [ ] Two-factor authentication
- [ ] Session management

## 🏗️ Project Structure

```
oppe_ai/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── cases/           # Case management
│   │   └── reviews/         # Peer reviews
│   ├── dashboard/           # Dashboard pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── lib/                     # Utility functions
│   ├── auth.ts             # Authentication helpers
│   ├── prisma.ts           # Prisma client
│   └── validations.ts      # Zod schemas
├── prisma/
│   └── schema.prisma       # Database schema
├── .env.example            # Environment template
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🧪 Development Guidelines

### Code Quality
1. **Clear & Concise Code**: Prioritize readability and self-documenting code
2. **Security by Design**: Input validation, no hardcoded credentials, least privilege
3. **Scalable & Maintainable**: Modular architecture with comprehensive error handling
4. **Performance**: Database query optimization, efficient data loading
5. **Documentation**: Comprehensive inline comments and API documentation

### Best Practices
- Use TypeScript for type safety
- Validate all user inputs with Zod
- Follow the Prisma schema for data models
- Implement proper error handling
- Write self-documenting code with clear variable names
- Use environment variables for configuration

## 🤝 Contributing

Contributions are welcome! Please follow the coding guidelines and ensure all tests pass before submitting pull requests.

## 📄 License

This project is proprietary software developed for healthcare organizations.

## 👥 Support

For support and questions, please contact the development team.

---

**Note**: This application handles sensitive healthcare data. Ensure proper security measures, HIPAA compliance, and access controls are in place before deploying to production.
