'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  BarChart3, 
  Users, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  PieChart,
  Menu,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">OPPE AI</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <NavLink href="/dashboard" icon={<BarChart3 />} active>
            Dashboard
          </NavLink>
          <NavLink href="/dashboard/physicians" icon={<Users />}>
            Physicians
          </NavLink>
          <NavLink href="/dashboard/cases" icon={<FileText />}>
            Cases
          </NavLink>
          <NavLink href="/dashboard/reviews" icon={<PieChart />}>
            Peer Reviews
          </NavLink>
          <NavLink href="/dashboard/competencies" icon={<TrendingUp />}>
            Competencies
          </NavLink>
          <NavLink href="/dashboard/alerts" icon={<AlertTriangle />}>
            Alerts
          </NavLink>
          <NavLink href="/dashboard/reports" icon={<Calendar />}>
            Reports
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Dr. John Smith</span>
              <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                JS
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Total Physicians"
              value="156"
              change="+12%"
              trend="up"
              icon={<Users className="h-6 w-6" />}
            />
            <StatsCard 
              title="Cases This Month"
              value="2,847"
              change="+8%"
              trend="up"
              icon={<FileText className="h-6 w-6" />}
            />
            <StatsCard 
              title="Pending Reviews"
              value="42"
              change="-15%"
              trend="down"
              icon={<PieChart className="h-6 w-6" />}
            />
            <StatsCard 
              title="Active Alerts"
              value="7"
              change="+3"
              trend="up"
              icon={<AlertTriangle className="h-6 w-6" />}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Case Outcomes - Last 30 Days">
              <div className="h-64 flex items-center justify-center text-gray-400">
                <BarChart3 className="h-16 w-16" />
                <span className="ml-4">Chart visualization will render here</span>
              </div>
            </ChartCard>
            
            <ChartCard title="Competency Trends">
              <div className="h-64 flex items-center justify-center text-gray-400">
                <TrendingUp className="h-16 w-16" />
                <span className="ml-4">Chart visualization will render here</span>
              </div>
            </ChartCard>
          </div>

          {/* Recent Activity & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityCard />
            <AlertsCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, icon, children, active = false }: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  active?: boolean;
}) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-primary-50 text-primary-600' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );
}

function StatsCard({ title, value, change, trend, icon }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="text-primary-600">{icon}</div>
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function ActivityCard() {
  const activities = [
    { text: 'New case logged by Dr. Smith', time: '5 minutes ago' },
    { text: 'Peer review completed for Case #12847', time: '1 hour ago' },
    { text: 'Alert resolved: Dr. Johnson competency score', time: '2 hours ago' },
    { text: 'Monthly report generated', time: '5 hours ago' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-primary-600 mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">{activity.text}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsCard() {
  const alerts = [
    { severity: 'high', message: 'Dr. Martinez: Low competency score in Patient Care', urgent: true },
    { severity: 'medium', message: 'Dr. Chen: High complication rate trend detected', urgent: false },
    { severity: 'low', message: 'Dr. Patel: Peer review data incomplete', urgent: false },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              alert.severity === 'high' 
                ? 'bg-red-50 border-red-500' 
                : alert.severity === 'medium'
                ? 'bg-yellow-50 border-yellow-500'
                : 'bg-blue-50 border-blue-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-900">{alert.message}</p>
              {alert.urgent && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  Urgent
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link 
        href="/dashboard/alerts"
        className="mt-4 block text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        View All Alerts →
      </Link>
    </div>
  );
}
