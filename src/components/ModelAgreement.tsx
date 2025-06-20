import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ModelAgreement = () => {
  const agreements = [
    { models: 'SVM ↔ Isolation Forest', rate: 98.4, status: 'excellent' },
    { models: 'SVM ↔ GMM', rate: 98.6, status: 'excellent' },
    { models: 'Isolation Forest ↔ GMM', rate: 98.6, status: 'excellent' },
    { models: 'All Models Consensus', rate: 97.8, status: 'excellent' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'good': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'poor': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <Card className="bg-dashboard-card border-gray-700 p-5 mb-6">
      <h2 className="text-lg font-medium text-white mb-4">
        Model Agreement Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agreements.map((agreement, index) => (
          <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 text-sm font-medium">
                {agreement.models}
              </span>
              <Badge className={getStatusColor(agreement.status)}>
                {agreement.rate}%
              </Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${agreement.rate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-400">
        High agreement rates indicate consistent detection patterns across models
      </div>
    </Card>
  );
};

export default ModelAgreement; 