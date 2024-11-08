import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import AIService from '../services/aiService';
import type { ThreatData } from '../types';

export default function ThreatDetection() {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const interval = setInterval(analyzeThreat, 5000);
    return () => clearInterval(interval);
  }, []);

  const analyzeThreat = async () => {
    setIsAnalyzing(true);
    const mockData = {
      networkTraffic: Math.random(),
      systemCalls: Math.random(),
      userBehavior: Math.random()
    };

    try {
      const result = await AIService.getInstance().analyzeThreat(mockData);
      setThreats(prev => [result, ...prev].slice(0, 5));
    } catch (error) {
      console.error('Error analyzing threat:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Real-time Threat Detection</h3>
        <div className={`flex items-center space-x-2 ${isAnalyzing ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Shield className="h-5 w-5 animate-pulse" />
          <span className="text-sm">Analyzing</span>
        </div>
      </div>

      <div className="space-y-4">
        {threats.map((threat, index) => (
          <div
            key={threat.timestamp}
            className={`p-4 rounded-lg ${
              threat.severity === 'high'
                ? 'bg-red-50'
                : threat.severity === 'medium'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className={`h-5 w-5 ${
                threat.severity === 'high'
                  ? 'text-red-500'
                  : threat.severity === 'medium'
                  ? 'text-yellow-500'
                  : 'text-blue-500'
              }`} />
              <div>
                <p className="text-sm font-medium text-gray-900">{threat.details}</p>
                <p className="text-sm text-gray-500">
                  Threat Score: {(threat.score * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(threat.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}