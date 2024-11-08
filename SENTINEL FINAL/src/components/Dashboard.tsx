import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Activity, Lock, Users, X } from 'lucide-react';
import AITraining from './AITraining';
import ThreatDetection from './ThreatDetection';
import type { Alert } from '../types';

const threatData = [
  { name: 'Mon', threats: 4, blocked: 12 },
  { name: 'Tue', threats: 3, blocked: 8 },
  { name: 'Wed', threats: 7, blocked: 15 },
  { name: 'Thu', threats: 2, blocked: 10 },
  { name: 'Fri', threats: 5, blocked: 13 },
  { name: 'Sat', threats: 1, blocked: 7 },
  { name: 'Sun', threats: 3, blocked: 9 },
];

const securityScore = [
  { name: 'Network', value: 85 },
  { name: 'Endpoints', value: 92 },
  { name: 'Data', value: 78 },
  { name: 'Access', value: 88 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#6366f1'];

const alerts: Alert[] = [
  { id: 1, type: 'high', message: 'Suspicious login attempt detected', time: '2 minutes ago', details: 'Multiple failed login attempts detected from unauthorized IP address.' },
  { id: 2, type: 'medium', message: 'Unusual file access pattern', time: '15 minutes ago', details: 'Repeated access attempts to system log files from non-admin user.' },
  { id: 3, type: 'low', message: 'System update available', time: '1 hour ago', details: 'Security patch available for operating system components.' },
  { id: 4, type: 'high', message: 'Potential data exfiltration', time: '3 hours ago', details: 'Large amount of data transfer detected to unknown external endpoint.' },
];

export default function Dashboard() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Security Dashboard</h1>
          <div className="mt-2 flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
            <button className="text-indigo-600 hover:text-indigo-900 font-medium">
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AITraining />
          <ThreatDetection />
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <Shield className="h-10 w-10 text-indigo-500" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Protected Assets</h3>
                <p className="text-3xl font-bold text-indigo-600">127</p>
                <p className="text-sm text-gray-500">↑ 12% from last month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Detection Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={threatData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="blocked" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Security Score</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={securityScore}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {securityScore.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer ${
                    alert.type === 'high'
                      ? 'bg-red-50 border-l-4 border-red-500'
                      : alert.type === 'medium'
                      ? 'bg-yellow-50 border-l-4 border-yellow-500'
                      : 'bg-blue-50 border-l-4 border-blue-500'
                  }`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-500">{alert.time}</p>
                    </div>
                    <button className="text-sm text-indigo-600 hover:text-indigo-900">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedAlert && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">Alert Details</h3>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">{selectedAlert.details}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}