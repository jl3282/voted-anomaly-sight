import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import TimelineCharts from '@/components/TimelineCharts';
import ScatterPlotChart from '@/components/ScatterPlotChart';
import AnomalyTable from '@/components/AnomalyTable';
import FeatureImportance from '@/components/FeatureImportance';
import ModelAgreement from '@/components/ModelAgreement';

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FeatureImportance />
          <ModelAgreement />
        </div>
        <TimelineCharts />
        <ScatterPlotChart />
        <AnomalyTable />
      </div>
    </div>
  );
};

export default Index;
