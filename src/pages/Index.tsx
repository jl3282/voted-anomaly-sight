
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import TimelineCharts from '@/components/TimelineCharts';
import ScatterPlotChart from '@/components/ScatterPlotChart';
import AnomalyTable from '@/components/AnomalyTable';

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <TimelineCharts />
        <ScatterPlotChart />
        <AnomalyTable />
      </div>
    </div>
  );
};

export default Index;
