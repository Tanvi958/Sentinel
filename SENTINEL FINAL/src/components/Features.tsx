import React from 'react';
import { Shield, Lock, Bell, Eye, Zap, Database } from 'lucide-react';

const features = [
  {
    name: 'Real-time Monitoring',
    description: 'Continuous surveillance of your systems with instant threat detection.',
    icon: Eye
  },
  {
    name: 'AI-Powered Security',
    description: 'Advanced machine learning algorithms to identify and prevent threats.',
    icon: Shield
  },
  {
    name: 'Instant Alerts',
    description: 'Get notified immediately when suspicious activity is detected.',
    icon: Bell
  },
  {
    name: 'Data Protection',
    description: 'Enterprise-grade encryption and security protocols.',
    icon: Lock
  },
  {
    name: 'Quick Response',
    description: 'Automated threat response and mitigation strategies.',
    icon: Zap
  },
  {
    name: 'Secure Storage',
    description: 'Protected data storage with redundant backups.',
    icon: Database
  }
];

export default function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Advanced Security Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Protect your digital assets with our comprehensive suite of security features.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute h-12 w-12 text-indigo-500">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}