import Link from 'next/link';
import { Activity, BarChart3, Users, FileText, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">OPPE AI</span>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Log In
              </Link>
              <Link 
                href="/dashboard" 
                className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Ongoing Professional Practice Evaluation
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline physician performance monitoring, competency tracking, and peer reviews 
            with our comprehensive OPPE management system.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              href="#features" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 shadow-lg border border-primary-600"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Users className="h-8 w-8" />}
            title="Physician Tracking"
            description="Monitor individual physician performance with comprehensive case logging and outcome tracking."
          />
          <FeatureCard 
            icon={<BarChart3 className="h-8 w-8" />}
            title="Performance Analytics"
            description="Visualize trends and patterns with advanced analytics and customizable dashboards."
          />
          <FeatureCard 
            icon={<FileText className="h-8 w-8" />}
            title="Peer Reviews"
            description="Facilitate structured peer review processes with standardized evaluation criteria."
          />
          <FeatureCard 
            icon={<TrendingUp className="h-8 w-8" />}
            title="Competency Tracking"
            description="Track core competencies across six ACGME domains with automated scoring."
          />
          <FeatureCard 
            icon={<Shield className="h-8 w-8" />}
            title="Compliance Ready"
            description="Meet regulatory requirements with comprehensive audit trails and reporting."
          />
          <FeatureCard 
            icon={<Activity className="h-8 w-8" />}
            title="Real-time Alerts"
            description="Receive immediate notifications for performance concerns and intervention opportunities."
          />
        </div>

        {/* Stats Section */}
        <div className="mt-32 bg-white rounded-2xl shadow-xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">100%</div>
              <div className="mt-2 text-gray-600">ACGME Compliant</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">24/7</div>
              <div className="mt-2 text-gray-600">Monitoring & Alerts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">Secure</div>
              <div className="mt-2 text-gray-600">HIPAA Compliant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 OPPE AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
