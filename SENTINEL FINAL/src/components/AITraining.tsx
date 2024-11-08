import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import AIService from '../services/aiService';

export default function AITraining() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(AIService.getInstance().getModelStatus());

  useEffect(() => {
    const checkProgress = setInterval(() => {
      const currentProgress = AIService.getInstance().getTrainingProgress();
      setProgress(currentProgress);
      setStatus(AIService.getInstance().getModelStatus());

      if (currentProgress === 100) {
        clearInterval(checkProgress);
      }
    }, 500);

    return () => clearInterval(checkProgress);
  }, []);

  const startTraining = async () => {
    const mockDataset = Array(1000).fill(null).map(() => ({
      networkTraffic: Math.random(),
      systemCalls: Math.random(),
      userBehavior: Math.random(),
      isThreat: Math.random() > 0.8
    }));

    await AIService.getInstance().trainModel(mockDataset);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">AI Model Training</h3>
        {status === 'untrained' && (
          <button
            onClick={startTraining}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Start Training
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-indigo-500" />
          <span className="text-sm text-gray-700">Model Status: {status}</span>
        </div>

        {status === 'training' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Training Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {status === 'trained' && (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Model trained successfully</span>
          </div>
        )}
      </div>
    </div>
  );
}