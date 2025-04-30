
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from 'recharts';

// Mock data for the scatter plot
const generateScatterData = () => {
  const data = [];
  
  // Generate normal sessions (no votes)
  for (let i = 0; i < 100; i++) {
    const duration = Math.floor(Math.random() * 200) + 10;
    const events = Math.floor(Math.random() * 40) + 5;
    data.push({
      id: `session-${i}`,
      duration,
      events,
      votes: 0,
      user: {
        name: `User ${i}`,
        jobTitle: ['Software Engineer', 'Data Analyst', 'Product Manager', 'UX Designer'][Math.floor(Math.random() * 4)],
        location: ['New York', 'San Francisco', 'London', 'Tokyo'][Math.floor(Math.random() * 4)]
      }
    });
  }
  
  // Generate single vote anomalies
  for (let i = 0; i < 15; i++) {
    const duration = Math.floor(Math.random() * 5) + 1; // Very short durations
    const events = Math.floor(Math.random() * 5) + 15;
    data.push({
      id: `anomaly1-${i}`,
      duration,
      events,
      votes: 1,
      models: ['One-Class SVM'],
      user: {
        name: `Anomalous User ${i}`,
        jobTitle: ['Software Engineer', 'Data Analyst', 'Product Manager', 'UX Designer'][Math.floor(Math.random() * 4)],
        location: ['New York', 'San Francisco', 'London', 'Tokyo'][Math.floor(Math.random() * 4)]
      }
    });
  }
  
  // Generate double vote anomalies
  for (let i = 0; i < 8; i++) {
    const duration = Math.floor(Math.random() * 3);
    const events = Math.floor(Math.random() * 10) + 25;
    data.push({
      id: `anomaly2-${i}`,
      duration,
      events,
      votes: 2,
      models: ['One-Class SVM', 'Isolation Forest'],
      user: {
        name: `Suspicious User ${i}`,
        jobTitle: ['Software Engineer', 'Data Analyst', 'Product Manager', 'UX Designer'][Math.floor(Math.random() * 4)],
        location: ['New York', 'San Francisco', 'London', 'Tokyo'][Math.floor(Math.random() * 4)]
      }
    });
  }
  
  // Generate triple vote anomalies
  for (let i = 0; i < 5; i++) {
    const duration = 0;
    const events = Math.floor(Math.random() * 15) + 30;
    data.push({
      id: `anomaly3-${i}`,
      duration,
      events,
      votes: 3,
      models: ['One-Class SVM', 'Isolation Forest', 'GMM'],
      user: {
        name: `Critical User ${i}`,
        jobTitle: ['Software Engineer', 'Data Analyst', 'Product Manager', 'UX Designer'][Math.floor(Math.random() * 4)],
        location: ['New York', 'San Francisco', 'London', 'Tokyo'][Math.floor(Math.random() * 4)]
      }
    });
  }
  
  return data;
};

const scatterData = generateScatterData();

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    let modelText = '';
    
    if (data.votes > 0 && data.models) {
      modelText = `Flagged by: ${data.models.join(' & ')}`;
    }
    
    return (
      <div className="bg-dashboard-background border border-gray-700 p-3 rounded-md shadow-lg">
        <p className="text-white font-medium">{data.user.name}</p>
        <p className="text-sm text-gray-300">{data.user.jobTitle}</p>
        <p className="text-sm text-gray-300">{data.user.location}</p>
        <div className="h-px bg-gray-700 my-2"></div>
        <p className="text-sm text-gray-300">
          <span className="font-medium">Duration:</span> {data.duration}s
        </p>
        <p className="text-sm text-gray-300">
          <span className="font-medium">Events:</span> {data.events}
        </p>
        {data.votes > 0 && (
          <>
            <div className="h-px bg-gray-700 my-2"></div>
            <p className="text-sm font-medium" style={{ 
              color: data.votes === 3 ? '#ea384c' : data.votes === 2 ? '#dc2626' : '#f59e0b' 
            }}>
              {modelText}
            </p>
          </>
        )}
      </div>
    );
  }
  
  return null;
};

const ScatterPlotChart = () => {
  return (
    <Card className="bg-dashboard-card border-gray-700 p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-medium text-white">Session Behavior Analysis</h2>
          <div className="flex gap-2">
            <Badge className="bg-anomaly-critical text-white">3 votes</Badge>
            <Badge className="bg-anomaly-high text-white">2 votes</Badge>
            <Badge className="bg-anomaly-medium text-white">1 vote</Badge>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Showing all 128 sessions
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              dataKey="duration" 
              name="Duration" 
              unit="s" 
              stroke="#4b5563"
              tick={{fill: '#9ca3af'}}
              label={{ 
                value: 'Session Duration (seconds)', 
                position: 'bottom', 
                offset: 0, 
                fill: '#9ca3af',
              }} 
            />
            <YAxis 
              type="number" 
              dataKey="events" 
              name="Events" 
              stroke="#4b5563"
              tick={{fill: '#9ca3af'}}
              label={{ 
                value: 'Event Count', 
                angle: -90, 
                position: 'left', 
                offset: 10, 
                fill: '#9ca3af',
              }} 
            />
            <ZAxis range={[60, 400]} />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Normal points */}
            <Scatter 
              name="Normal Sessions" 
              data={scatterData.filter(d => d.votes === 0)} 
              fill="#6b7280" 
              opacity={0.6}
            />
            
            {/* Single vote anomalies */}
            <Scatter 
              name="One Vote" 
              data={scatterData.filter(d => d.votes === 1)} 
              fill="#f59e0b"
            />
            
            {/* Double vote anomalies */}
            <Scatter 
              name="Two Votes" 
              data={scatterData.filter(d => d.votes === 2)} 
              fill="#dc2626"
            />
            
            {/* Triple vote anomalies - with custom shape for critical anomalies */}
            <Scatter 
              name="Three Votes" 
              data={scatterData.filter(d => d.votes === 3)} 
              fill="#ea384c"
              shape={(props) => {
                const { cx, cy, fill } = props;
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={10} fill={fill} />
                    <circle cx={cx} cy={cy} r={14} stroke={fill} strokeWidth={2} fill="transparent" className="animate-pulse-alert" />
                    <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="14" fontWeight="bold">!</text>
                    <title>Critical Anomaly - 3 Votes</title>
                  </g>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ScatterPlotChart;
