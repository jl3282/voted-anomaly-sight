import React, { useState } from 'react';
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
  AreaChart,
  Area,
} from 'recharts';

// Mock data for the timeline (daily)
const timelineDataDaily = [
  { hour: '00:00', sessions: 30, anomalies: 2, rate: 6.7, newUsers: 12, returningUsers: 18 },
  { hour: '01:00', sessions: 25, anomalies: 1, rate: 4.0, newUsers: 8, returningUsers: 17 },
  { hour: '02:00', sessions: 18, anomalies: 0, rate: 0, newUsers: 5, returningUsers: 13 },
  { hour: '03:00', sessions: 15, anomalies: 1, rate: 6.7, newUsers: 4, returningUsers: 11 },
  { hour: '04:00', sessions: 20, anomalies: 0, rate: 0, newUsers: 7, returningUsers: 13 },
  { hour: '05:00', sessions: 22, anomalies: 1, rate: 4.5, newUsers: 8, returningUsers: 14 },
  { hour: '06:00', sessions: 30, anomalies: 1, rate: 3.3, newUsers: 10, returningUsers: 20 },
  { hour: '07:00', sessions: 45, anomalies: 2, rate: 4.4, newUsers: 18, returningUsers: 27 },
  { hour: '08:00', sessions: 78, anomalies: 3, rate: 3.8, newUsers: 25, returningUsers: 53 },
  { hour: '09:00', sessions: 112, anomalies: 5, rate: 4.5, newUsers: 42, returningUsers: 70 },
  { hour: '10:00', sessions: 95, anomalies: 4, rate: 4.2, newUsers: 35, returningUsers: 60 },
  { hour: '11:00', sessions: 85, anomalies: 3, rate: 3.5, newUsers: 30, returningUsers: 55 },
  { hour: '12:00', sessions: 90, anomalies: 4, rate: 4.4, newUsers: 32, returningUsers: 58 },
  { hour: '13:00', sessions: 105, anomalies: 7, rate: 6.7, newUsers: 38, returningUsers: 67 },
  { hour: '14:00', sessions: 110, anomalies: 6, rate: 5.5, newUsers: 40, returningUsers: 70 },
  { hour: '15:00', sessions: 118, anomalies: 5, rate: 4.2, newUsers: 45, returningUsers: 73 },
  { hour: '16:00', sessions: 108, anomalies: 8, rate: 7.4, newUsers: 42, returningUsers: 66 },
  { hour: '17:00', sessions: 95, anomalies: 6, rate: 6.3, newUsers: 35, returningUsers: 60 },
  { hour: '18:00', sessions: 78, anomalies: 3, rate: 3.8, newUsers: 28, returningUsers: 50 },
  { hour: '19:00', sessions: 55, anomalies: 2, rate: 3.6, newUsers: 20, returningUsers: 35 },
  { hour: '20:00', sessions: 48, anomalies: 1, rate: 2.1, newUsers: 18, returningUsers: 30 },
  { hour: '21:00', sessions: 42, anomalies: 2, rate: 4.8, newUsers: 15, returningUsers: 27 },
  { hour: '22:00', sessions: 38, anomalies: 1, rate: 2.6, newUsers: 14, returningUsers: 24 },
  { hour: '23:00', sessions: 32, anomalies: 2, rate: 6.2, newUsers: 10, returningUsers: 22 },
];

// Mock data for weekly view
const timelineDataWeekly = [
  { day: 'Mon', sessions: 620, anomalies: 22, rate: 3.5, newUsers: 215, returningUsers: 405 },
  { day: 'Tue', sessions: 680, anomalies: 25, rate: 3.7, newUsers: 230, returningUsers: 450 },
  { day: 'Wed', sessions: 710, anomalies: 30, rate: 4.2, newUsers: 245, returningUsers: 465 },
  { day: 'Thu', sessions: 740, anomalies: 28, rate: 3.8, newUsers: 260, returningUsers: 480 },
  { day: 'Fri', sessions: 780, anomalies: 35, rate: 4.5, newUsers: 270, returningUsers: 510 },
  { day: 'Sat', sessions: 520, anomalies: 18, rate: 3.5, newUsers: 180, returningUsers: 340 },
  { day: 'Sun', sessions: 480, anomalies: 15, rate: 3.1, newUsers: 160, returningUsers: 320 },
];

// Mock data for monthly view
const timelineDataMonthly = [
  { month: 'Jan', sessions: 18500, anomalies: 720, rate: 3.9, newUsers: 6200, returningUsers: 12300 },
  { month: 'Feb', sessions: 17200, anomalies: 680, rate: 4.0, newUsers: 5800, returningUsers: 11400 },
  { month: 'Mar', sessions: 19800, anomalies: 810, rate: 4.1, newUsers: 6700, returningUsers: 13100 },
  { month: 'Apr', sessions: 20500, anomalies: 850, rate: 4.1, newUsers: 7100, returningUsers: 13400 },
  { month: 'May', sessions: 22000, anomalies: 920, rate: 4.2, newUsers: 7600, returningUsers: 14400 },
  { month: 'Jun', sessions: 24500, anomalies: 1050, rate: 4.3, newUsers: 8400, returningUsers: 16100 },
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

// Volume metrics options
const volumeMetrics = [
  { value: "sessions", label: "Total Sessions" },
  { value: "newUsers", label: "New Users" },
  { value: "returningUsers", label: "Returning Users" },
  { value: "anomalies", label: "Anomalies" },
];

// Anomaly rate metrics options
const rateMetrics = [
  { value: "rate", label: "Overall Rate" },
  { value: "svmRate", label: "SVM Detection Rate" },
  { value: "isoRate", label: "Isolation Forest Rate" },
  { value: "gmmRate", label: "GMM Rate" },
];

// Generate mock data for different model rates
const addModelRates = (data) => {
  return data.map(item => ({
    ...item,
    svmRate: parseFloat((item.rate * (0.8 + Math.random() * 0.4)).toFixed(1)),
    isoRate: parseFloat((item.rate * (0.7 + Math.random() * 0.6)).toFixed(1)),
    gmmRate: parseFloat((item.rate * (0.9 + Math.random() * 0.3)).toFixed(1)),
  }));
};

// Add model rates to all timeline datasets
const timelineDataDailyWithRates = addModelRates(timelineDataDaily);
const timelineDataWeeklyWithRates = addModelRates(timelineDataWeekly);
const timelineDataMonthlyWithRates = addModelRates(timelineDataMonthly);

// Filter data by job title (mock implementation)
const filterDataByJob = (data, jobTitle) => {
  if (jobTitle === "All Job Titles") return data;
  
  // For demonstration, we'll just adjust the rates by a factor based on job title
  const jobFactors = {
    "Software Engineer": 1.2,
    "Data Analyst": 0.8,
    "Product Manager": 1.1,
    "UX Designer": 0.9,
    "DevOps Engineer": 1.3,
    "Marketing Specialist": 0.7,
    "HR Manager": 0.6
  };
  
  const factor = jobFactors[jobTitle] || 1;
  
  return data.map(item => ({
    ...item,
    rate: parseFloat((item.rate * factor).toFixed(1)),
    svmRate: parseFloat((item.svmRate * factor).toFixed(1)),
    isoRate: parseFloat((item.isoRate * factor).toFixed(1)),
    gmmRate: parseFloat((item.gmmRate * factor).toFixed(1)),
  }));
};

const TimelineCharts = () => {
  // State for selections
  const [selectedJob, setSelectedJob] = useState("All Job Titles");
  const [timePeriod, setTimePeriod] = useState("24h");
  const [volumeMetric, setVolumeMetric] = useState("sessions");
  const [rateMetric, setRateMetric] = useState("rate");

  // Get the appropriate data based on time period
  const getTimelineData = () => {
    let baseData;
    switch (timePeriod) {
      case "7d":
        baseData = timelineDataWeeklyWithRates;
        break;
      case "30d":
        baseData = timelineDataMonthlyWithRates;
        break;
      default:
        baseData = timelineDataDailyWithRates;
    }
    
    return filterDataByJob(baseData, selectedJob);
  };

  // Get the appropriate key for x-axis based on time period
  const getXAxisKey = () => {
    switch (timePeriod) {
      case "7d":
        return "day";
      case "30d":
        return "month";
      default:
        return "hour";
    }
  };

  // Determine chart type for volume data
  const renderVolumeChart = () => {
    const data = getTimelineData();
    const xKey = getXAxisKey();

    return (
      <ResponsiveContainer width="100%" height="100%">
        {volumeMetric === "anomalies" ? (
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: '#9ca3af' }} 
              stroke="#4b5563"
              height={30}
              angle={0}
              textAnchor="middle"
              interval={0}
              // Adjust the tick size if needed for small screens
              tickSize={4}
              tickFormatter={(value) => {
                // Keep time format shorter if needed
                if (timePeriod === "24h" && value.length > 3) {
                  return value;
                }
                return value;
              }}
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
            <Line dataKey="anomalies" name="Anomalies" stroke="#ea384c" strokeWidth={2} dot={{ fill: '#1e293b' }} />
          </LineChart>
        ) : (
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: '#9ca3af' }} 
              stroke="#4b5563"
              height={30}
              angle={0}
              textAnchor="middle"
              interval={0}
              // Adjust the tick size if needed for small screens
              tickSize={4}
              tickFormatter={(value) => {
                // Keep time format shorter if needed
                if (timePeriod === "24h" && value.length > 3) {
                  return value;
                }
                return value;
              }}
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
            {volumeMetric === "sessions" && (
              <>
                <Bar dataKey="sessions" name="Sessions" fill="#06b6d4" />
                <Bar dataKey="anomalies" name="Anomalies" fill="#ea384c" />
              </>
            )}
            {volumeMetric === "newUsers" && (
              <Bar dataKey="newUsers" name="New Users" fill="#10b981" />
            )}
            {volumeMetric === "returningUsers" && (
              <Bar dataKey="returningUsers" name="Returning Users" fill="#8b5cf6" />
            )}
          </BarChart>
        )}
      </ResponsiveContainer>
    );
  };

  // Determine chart type for rate data
  const renderRateChart = () => {
    const data = getTimelineData();
    const xKey = getXAxisKey();
    
    // Get color based on rate metric
    const getColor = () => {
      switch (rateMetric) {
        case "svmRate": return "#3b82f6"; // blue
        case "isoRate": return "#8b5cf6"; // purple
        case "gmmRate": return "#f59e0b"; // amber
        default: return "#ea384c"; // red
      }
    };
    
    // Get fill color based on rate metric (with opacity)
    const getFillColor = () => {
      switch (rateMetric) {
        case "svmRate": return "rgba(59, 130, 246, 0.2)"; // blue with opacity
        case "isoRate": return "rgba(139, 92, 246, 0.2)"; // purple with opacity
        case "gmmRate": return "rgba(245, 158, 11, 0.2)"; // amber with opacity
        default: return "rgba(234, 56, 76, 0.2)"; // red with opacity
      }
    };
    
    // Get metric name for display
    const getMetricName = () => {
      switch (rateMetric) {
        case "svmRate": return "SVM Rate";
        case "isoRate": return "Isolation Forest Rate";
        case "gmmRate": return "GMM Rate";
        default: return "Anomaly Rate";
      }
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey={xKey}
            stroke="#4b5563"
            tick={{ fill: '#9ca3af' }}
            height={30}
            angle={0}
            textAnchor="middle"
            interval={0}
            // Adjust the tick size if needed for small screens
            tickSize={4}
            tickFormatter={(value) => {
              // Keep time format shorter if needed
              if (timePeriod === "24h" && value.length > 3) {
                return value;
              }
              return value;
            }}
          />
          <YAxis 
            stroke="#4b5563"
            tick={{ fill: '#9ca3af' }}
            unit="%" 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #374151', borderRadius: '0.375rem' }}
            labelStyle={{ color: '#f3f4f6' }}
            formatter={(value: number) => [`${value}%`, getMetricName()]}
          />
          <Legend wrapperStyle={{ color: '#9ca3af' }} />
          <Area 
            type="monotone" 
            dataKey={rateMetric} 
            name={getMetricName()} 
            stroke={getColor()} 
            fill={getFillColor()}
            activeDot={{ r: 6, stroke: getColor(), strokeWidth: 2, fill: getColor() }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="bg-dashboard-card border-gray-700 p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium text-white">Session Volume</h2>
            <Select value={volumeMetric} onValueChange={setVolumeMetric}>
              <SelectTrigger className="w-[160px] bg-transparent border-gray-700 text-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-card text-white border-gray-700">
                {volumeMetrics.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value}>{metric.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[100px] bg-transparent border-gray-700 text-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dashboard-card text-white border-gray-700">
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-64">
          {renderVolumeChart()}
        </div>
      </Card>

      <Card className="bg-dashboard-card border-gray-700 p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-medium text-white">Anomaly Rate</h2>
            <Select value={rateMetric} onValueChange={setRateMetric}>
              <SelectTrigger className="w-[180px] bg-transparent border-gray-700 text-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-card text-white border-gray-700">
                {rateMetrics.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value}>{metric.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={selectedJob} onValueChange={setSelectedJob}>
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
          {renderRateChart()}
        </div>
      </Card>
    </div>
  );
};

export default TimelineCharts;
