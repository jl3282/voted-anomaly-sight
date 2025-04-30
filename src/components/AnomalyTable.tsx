import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CircleCheck, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for the table
const recentAnomalies = [{
  id: 'sess-123456',
  timestamp: '2025-04-30T14:22:18',
  user: 'John Smith',
  jobTitle: 'Software Engineer',
  duration: 0,
  events: 28,
  models: {
    svm: true,
    isolation: true,
    gmm: true
  }
}, {
  id: 'sess-123457',
  timestamp: '2025-04-30T14:15:35',
  user: 'Jane Doe',
  jobTitle: 'Product Manager',
  duration: 1,
  events: 32,
  models: {
    svm: true,
    isolation: true,
    gmm: false
  }
}, {
  id: 'sess-123458',
  timestamp: '2025-04-30T14:09:12',
  user: 'Mark Johnson',
  jobTitle: 'UX Designer',
  duration: 0,
  events: 26,
  models: {
    svm: true,
    isolation: true,
    gmm: true
  }
}, {
  id: 'sess-123459',
  timestamp: '2025-04-30T13:58:47',
  user: 'Lisa Chen',
  jobTitle: 'Data Analyst',
  duration: 2,
  events: 15,
  models: {
    svm: true,
    isolation: false,
    gmm: true
  }
}, {
  id: 'sess-123460',
  timestamp: '2025-04-30T13:45:29',
  user: 'Robert Garcia',
  jobTitle: 'DevOps Engineer',
  duration: 1,
  events: 30,
  models: {
    svm: true,
    isolation: true,
    gmm: false
  }
}];
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
const ModelCheck = ({
  checked
}: {
  checked: boolean;
}) => {
  if (checked) {
    return <CircleCheck size={16} className="text-green-500" />;
  }
  return <span className="text-gray-400">—</span>;
};
const VoteBadge = ({
  votes
}: {
  votes: number;
}) => {
  let bgColor = '';
  let textColor = 'text-white';
  switch (votes) {
    case 3:
      bgColor = 'bg-anomaly-critical';
      break;
    case 2:
      bgColor = 'bg-anomaly-high';
      break;
    default:
      bgColor = 'bg-anomaly-medium';
  }
  return <Badge className={`${bgColor} ${textColor}`}>
      {votes === 3 && <AlertTriangle size={12} className="mr-1" />}
      {votes} votes
    </Badge>;
};
const AnomalyTable = () => {
  const exportCSV = (sessionId: string = 'all') => {
    console.log(`Exporting all model data for session ${sessionId}`);
    // In a real app, this would trigger an API call to download the CSV
  };
  return <Card className="bg-dashboard-card border-gray-700 p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-white">Recent Anomalous Sessions</h2>
        <Button variant="outline" onClick={() => exportCSV()} className="border-gray-700 font-medium text-gray-50 text-base bg-gray-600 hover:bg-gray-500">
          <Download size={16} className="mr-2" />
          Export All (CSV)
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="text-gray-400 font-medium">Session ID</TableHead>
              <TableHead className="text-gray-400 font-medium">Time</TableHead>
              <TableHead className="text-gray-400 font-medium">User</TableHead>
              <TableHead className="text-gray-400 font-medium">Job Title</TableHead>
              <TableHead className="text-gray-400 font-medium">Duration</TableHead>
              <TableHead className="text-gray-400 font-medium">Events</TableHead>
              <TableHead className="text-gray-400 font-medium">SVM</TableHead>
              <TableHead className="text-gray-400 font-medium">Isolation</TableHead>
              <TableHead className="text-gray-400 font-medium">GMM</TableHead>
              <TableHead className="text-gray-400 font-medium">Votes</TableHead>
              <TableHead className="text-gray-400 font-medium text-right">Export</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAnomalies.map(anomaly => {
            const voteCount = Object.values(anomaly.models).filter(Boolean).length;
            return <TableRow key={anomaly.id} className="border-b border-gray-700">
                  <TableCell className="font-mono text-sm text-gray-300">{anomaly.id}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(anomaly.timestamp)}</TableCell>
                  <TableCell className="text-white">{anomaly.user}</TableCell>
                  <TableCell className="text-gray-300">{anomaly.jobTitle}</TableCell>
                  <TableCell className="text-gray-300">{anomaly.duration}s</TableCell>
                  <TableCell className="text-gray-300">{anomaly.events}</TableCell>
                  <TableCell><ModelCheck checked={anomaly.models.svm} /></TableCell>
                  <TableCell><ModelCheck checked={anomaly.models.isolation} /></TableCell>
                  <TableCell><ModelCheck checked={anomaly.models.gmm} /></TableCell>
                  <TableCell>
                    <VoteBadge votes={voteCount} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-white font-medium hover:text-dashboard-accent hover:bg-gray-800" onClick={() => exportCSV(anomaly.id)}>
                      <Download size={14} className="mr-1" />
                      CSV
                    </Button>
                  </TableCell>
                </TableRow>;
          })}
          </TableBody>
        </Table>
      </div>
    </Card>;
};
export default AnomalyTable;