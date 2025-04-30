
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock data for the timeline
const timelineData = [
  { hour: '00:00', sessions: 30, anomalies: 2, rate: 6.7 },
  { hour: '01:00', sessions: 25, anomalies: 1, rate: 4.0 },
  { hour: '02:00', sessions: 18, anomalies: 0, rate: 0 },
  { hour: '03:00', sessions: 15, anomalies: 1, rate: 6.7 },
  { hour: '04:00', sessions: 20, anomalies: 0, rate: 0 },
  { hour: '05:00', sessions: 22, anomalies: 1, rate: 4.5 },
  { hour: '06:00', sessions: 30, anomalies: 1, rate: 3.3 },
  { hour: '07:00', sessions: 45, anomalies: 2, rate: 4.4 },
  { hour: '08:00', sessions: 78, anomalies: 3, rate: 3.8 },
  { hour: '09:00', sessions: 112, anomalies: 5, rate: 4.5 },
  { hour: '10:00', sessions: 95, anomalies: 4, rate: 4.2 },
  { hour: '11:00', sessions: 85, anomalies: 3, rate: 3.5 },
  { hour: '12:00', sessions: 90, anomalies: 4, rate: 4.4 },
  { hour: '13:00', sessions: 105, anomalies: 7, rate: 6.7 },
  { hour: '14:00', sessions: 110, anomalies: 6, rate: 5.5 },
  { hour: '15:00', sessions: 118, anomalies: 5, rate: 4.2 },
  { hour: '16:00', sessions: 108, anomalies: 8, rate: 7.4 },
  { hour: '17:00', sessions: 95, anomalies: 6, rate: 6.3 },
  { hour: '18:00', sessions: 78, anomalies: 3, rate: 3.8 },
  { hour: '19:00', sessions: 55, anomalies: 2, rate: 3.6 },
  { hour: '20:00', sessions: 48, anomalies: 1, rate: 2.1 },
  { hour: '21:00', sessions: 42, anomalies: 2, rate: 4.8 },
  { hour: '22:00', sessions: 38, anomalies: 1, rate: 2.6 },
  { hour: '23:00', sessions: 32, anomalies: 2, rate: 6.2 },
];

// Job titles for filter
const jobTitles = [
  "All Job Titles",
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "Marketing Specialist",
  "HR Manager",
];

const TimelineCharts = () => {
  const [selectedJob, setSelectedJob] = React.useState("All Job Titles");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="bg-dashboard-card border-gray-700 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-white">Session Volume</h2>
          <Select defaultValue="24h">
            <SelectTrigger className="w-[100px] bg-transparent border-gray-700 text-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-card text-white border-gray-700">
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="6h">6 Hours</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timelineData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="hour" 
                tick={{ fill: '#9ca3af' }} 
                stroke="#4b5563"
              />
              <YAxis 
                tick={{ fill: '#9ca3af' }}
                stroke="#4b5563"
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #374151', borderRadius: '0.375rem' }}
                labelStyle={{ color: '#f3f4f6' }}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Bar dataKey="sessions" name="Sessions" fill="#06b6d4" />
              <Bar dataKey="anomalies" name="Anomalies" fill="#ea384c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-dashboard-card border-gray-700 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-white">Anomaly Rate</h2>
          <Select defaultValue="all" onValueChange={setSelectedJob}>
            <SelectTrigger className="w-[180px] bg-transparent border-gray-700 text-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-card text-white border-gray-700">
              {jobTitles.map(job => (
                <SelectItem key={job} value={job}>{job}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timelineData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="hour" 
                stroke="#4b5563"
                tick={{fill: '#9ca3af'}}
              />
              <YAxis 
                stroke="#4b5563"
                tick={{fill: '#9ca3af'}}
                unit="%" 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #374151', borderRadius: '0.375rem' }}
                labelStyle={{ color: '#f3f4f6' }}
                formatter={(value: number) => [`${value}%`, 'Anomaly Rate']}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Line 
                type="monotone" 
                dataKey="rate" 
                name="Anomaly Rate" 
                stroke="#ea384c" 
                dot={{ stroke: '#ea384c', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                activeDot={{ r: 6, stroke: '#ea384c', strokeWidth: 2, fill: '#ea384c' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default TimelineCharts;
