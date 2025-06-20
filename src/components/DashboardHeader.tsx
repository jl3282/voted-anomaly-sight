import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  isAnomaly?: boolean;
  variation?: 'neutral' | 'critical' | 'high' | 'medium';
}

const StatsCard = ({ title, value, subtitle, isAnomaly, variation = 'neutral' }: StatsCardProps) => {
  const getBgColor = () => {
    if (isAnomaly) {
      switch (variation) {
        case 'critical':
          return 'bg-anomaly-critical/20 border-anomaly-critical';
        case 'high':
          return 'bg-anomaly-high/20 border-anomaly-high';
        case 'medium':
          return 'bg-anomaly-medium/20 border-anomaly-medium';
        default:
          return 'bg-dashboard-card border-border';
      }
    }
    return 'bg-dashboard-card border-border';
  };

  const getTextColor = () => {
    if (isAnomaly) {
      switch (variation) {
        case 'critical':
          return 'text-anomaly-critical';
        case 'high':
          return 'text-anomaly-high';
        case 'medium':
          return 'text-anomaly-medium';
        default:
          return 'text-white';
      }
    }
    return 'text-white';
  };

  return (
    <Card className={`${getBgColor()} border rounded-lg p-4 flex flex-col h-full`}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm text-gray-400 font-medium">{title}</h3>
        {isAnomaly && (
          <Badge variant="outline" className={`${getTextColor()} border-0`}>
            Anomaly
          </Badge>
        )}
      </div>
      <p className={`text-3xl font-bold mt-2 ${getTextColor()}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </Card>
  );
};

const DashboardHeader = () => {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Anomaly Detection Dashboard</h1>
        <div className="flex gap-2">
          <Badge className="bg-dashboard-accent text-white">Real-time</Badge>
          <Badge variant="outline" className="text-white border-gray-600">Last updated: Just now</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard 
          title="Total Sessions" 
          value={29359} 
          subtitle="Last 24 hours"
        />
        <StatsCard 
          title="One-Class SVM" 
          value={394} 
          subtitle="1.34% detection rate"
          isAnomaly
          variation="medium"
        />
        <StatsCard 
          title="Isolation Forest" 
          value={292} 
          subtitle="0.99% detection rate"
          isAnomaly
          variation="medium"
        />
        <StatsCard 
          title="GMM" 
          value={294} 
          subtitle="1.00% detection rate"
          isAnomaly
          variation="medium"
        />
        <StatsCard 
          title="Voted Anomalies" 
          value={192} 
          subtitle="0.65% final rate (≥2 votes)"
          isAnomaly
          variation="critical"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
