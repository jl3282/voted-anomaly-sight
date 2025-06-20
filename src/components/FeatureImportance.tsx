import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const FeatureImportance = () => {
  const features = [
    { name: 'Hour of Day', importance: 61.5, color: 'bg-anomaly-critical' },
    { name: 'Session Duration', importance: 24.2, color: 'bg-anomaly-high' },
    { name: 'Number of Events', importance: 14.3, color: 'bg-anomaly-medium' },
    { name: 'Day of Week', importance: 0.0, color: 'bg-gray-600' },
  ];

  return (
    <Card className="bg-dashboard-card border-gray-700 p-5 mb-6">
      <h2 className="text-lg font-medium text-white mb-4">
        Feature Importance (Isolation Forest)
      </h2>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm font-medium">
                {feature.name}
              </span>
              <span className="text-white text-sm">
                {feature.importance}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`${feature.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${feature.importance}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-400">
        Based on average path length analysis in Isolation Forest model
      </div>
    </Card>
  );
};

export default FeatureImportance; 