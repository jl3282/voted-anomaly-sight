# Voted Anomaly Detection Dashboard

A real-time visualization dashboard for ensemble-based anomaly detection results, designed to display insights from a multi-model voting system that identifies suspicious user session patterns.

## Overview

This interactive React dashboard visualizes the output of a sophisticated anomaly detection system that combines three machine learning models:

1. **One-Class SVM** - Support Vector Machine for novelty detection
2. **Isolation Forest** - Tree-based anomaly detection using path lengths  
3. **Gaussian Mixture Model (GMM)** - Statistical model for density estimation

The dashboard displays real-time analytics and voting results from these models to help security teams identify and investigate anomalous user behavior patterns.

## Key Features

### 📊 **Real-Time Dashboard**
- Live statistics showing total sessions, flagged anomalies, and voting results
- Color-coded severity levels based on model consensus
- Real-time updates with "Last updated: Just now" indicator

### 📈 **Interactive Visualizations** 
- **Timeline Charts**: Hourly, daily, weekly, and monthly anomaly trends
- **Scatter Plot Analysis**: Multi-dimensional visualization of session patterns
- **Volume Metrics**: Track total sessions, new users, returning users, and anomalies
- **Rate Analysis**: Monitor overall rates and individual model detection rates

### 🔍 **Detailed Analytics**
- **Anomaly Table**: Comprehensive view of flagged sessions with:
  - Session IDs and timestamps
  - User information and job titles
  - Session duration and event counts
  - Individual model voting results (✓ or —)
  - Consensus voting badges (2-3 votes)
- **Export Functionality**: Download anomaly data as CSV for further analysis
- **Filtering**: Filter by job title and time periods

### 🎯 **Voting System Visualization**
- **Majority Vote Display**: Sessions flagged by ≥2 models (primary focus)
- **Individual Model Results**: SVM, Isolation Forest, and GMM detection counts
- **Critical Anomalies**: Highlighted sessions with unanimous or high-confidence votes
- **Agreement Metrics**: Visual representation of model consensus

## Dashboard Components

```
src/
├── components/
│   ├── DashboardHeader.tsx      # Main stats and voting results
│   ├── TimelineCharts.tsx       # Temporal analysis charts
│   ├── ScatterPlotChart.tsx     # Multi-dimensional plotting
│   ├── AnomalyTable.tsx         # Detailed anomaly examination
│   └── ui/                      # Reusable UI components
├── pages/
│   └── Index.tsx                # Main dashboard page
└── lib/
    └── utils.ts                 # Utility functions
```

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui components + Tailwind CSS
- **Charts**: Recharts for interactive visualizations
- **State Management**: TanStack Query for data fetching
- **Routing**: React Router for navigation
- **Styling**: Modern CSS with dark theme optimized for security operations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Or use conda environment with Node.js

### Installation

```bash
# Option 1: Using npm directly
npm install
npm run dev

# Option 2: Using conda environment (recommended)
conda activate lovable  # or your preferred environment name
npm install
npm run dev
```

The dashboard will be available at `http://localhost:8080`

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Code quality check
```

## Data Integration

> **Note**: This dashboard currently displays simulated data for demonstration purposes. In production, it would connect to your anomaly detection pipeline to display real voting results.

The dashboard is designed to integrate with the output of the [Voted Anomaly Detection](https://github.com/your-ml-repo) analysis system, which processes:

- **Session-level data** with features: event count, duration, hour of day, day of week
- **Model predictions** from SVM, Isolation Forest, and GMM
- **Voting results** using majority, unanimous, or any-vote strategies
- **User metadata** including job titles and work locations

### Expected Data Format

```javascript
// Session data with anomaly flags
{
  sessionId: "sess-123456",
  timestamp: "2025-01-30T14:22:18Z",
  user: "John Smith",
  jobTitle: "Software Engineer", 
  duration: 120,
  eventCount: 28,
  models: {
    svm: true,        // One-Class SVM detection
    isolation: true,  // Isolation Forest detection  
    gmm: false        // GMM detection
  },
  voteCount: 2,       // Number of models that flagged this session
  severity: "high"    // Based on vote count and confidence
}
```

## Model Performance Metrics

The dashboard visualizes results from an ensemble system with the following characteristics:

| Model | Typical Detection Rate | Key Strengths |
|-------|----------------------|---------------|
| One-Class SVM | ~1.34% | Novelty detection, RBF kernel |
| Isolation Forest | ~0.99% | Tree-based, feature importance |
| Gaussian Mixture Model | ~1.00% | Statistical density estimation |
| **Majority Vote (Final)** | **~0.65%** | **Reduced false positives** |

### Feature Importance (from Isolation Forest)
1. **Hour of day**: 61.5% - Peak detection during off-hours
2. **Session duration**: 24.2% - Unusually short/long sessions  
3. **Number of events**: 14.3% - Abnormal activity volume
4. **Day of week**: 0.0% - Minimal predictive value

## Visualization Features

### 🎨 **Dark Theme Security Interface**
- Optimized for 24/7 security operations centers
- High contrast for better visibility
- Color-coded severity levels:
  - 🔴 **Critical**: 3 votes (unanimous)
  - 🟠 **High**: 2 votes (majority)  
  - 🟡 **Medium**: 1 vote (individual model)

### 📱 **Responsive Design**
- Mobile-friendly grid layouts
- Collapsible components for different screen sizes
- Touch-friendly controls for tablet use

### ⚡ **Performance Optimized**
- Efficient re-rendering with React optimizations
- Lazy loading for large datasets
- Optimized chart rendering for real-time updates

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker Deployment
```bash
# Build Docker image
docker build -t anomaly-dashboard .

# Run container  
docker run -p 8080:8080 anomaly-dashboard
```

## Future Enhancements

### 🔮 **Planned Features**
- [ ] **Real-time WebSocket integration** for live anomaly streaming
- [ ] **Historical trend analysis** with time-series forecasting
- [ ] **Drill-down capabilities** for individual session investigation  
- [ ] **Alert management** with acknowledgment and assignment
- [ ] **User behavior profiles** and baseline comparisons
- [ ] **Integration APIs** for SIEM and security tools
- [ ] **Explainable AI** features showing why sessions were flagged
- [ ] **Custom dashboard configuration** and saved views

### 📊 **Enhanced Analytics**
- [ ] **Correlation analysis** between anomaly patterns and security events
- [ ] **Geographic mapping** of anomalous sessions
- [ ] **Resource access pattern** visualization
- [ ] **Temporal clustering** of related anomalies

## Contributing

This dashboard is designed to work alongside the core anomaly detection models. For improvements:

1. **Frontend enhancements**: Submit PRs for UI/UX improvements
2. **Data integration**: Help connect real-time data sources  
3. **Visualization**: Add new chart types and analysis views
4. **Performance**: Optimize for larger datasets

## License

This project contains visualization components for confidential anomaly detection analysis. Please ensure appropriate data handling procedures are followed.

---

**Related Projects**: 
- [Voted Anomaly Detection](https://github.com/your-ml-repo) - Core ML analysis system
- [Anomaly Detection API](https://github.com/your-api-repo) - Data pipeline and API (if applicable)
