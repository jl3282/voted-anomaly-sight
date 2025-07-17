# Voted Anomaly Detection Dashboard

A real-time visualization dashboard demonstrating the capabilities of a multi-model voting system for anomaly detection. This dashboard provides a public interface to showcase how our ensemble-based anomaly detection system works, using simulated data that mirrors real-world patterns.

> **Note**: This repository contains only the visualization dashboard with simulated data. The actual machine learning models and analysis system are maintained in a private repository due to the confidential nature of the training data and security implications.

## 🔍 Overview

This dashboard demonstrates an anomaly detection system that combines three machine learning models:

1. **One-Class SVM** - Support Vector Machine for novelty detection
2. **Isolation Forest** - Tree-based anomaly detection using path lengths
3. **Gaussian Mixture Model (GMM)** - Statistical model for density estimation

The system uses a voting mechanism where predictions from all three models are combined to improve detection accuracy and reduce false positives.


## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **shadcn/ui** + Tailwind CSS for modern UI
- **Recharts** for interactive visualizations
- **TanStack Query** for data management

### Features
- Real-time statistics and voting results
- Interactive timeline and scatter plot visualizations
- Detailed anomaly tables with export functionality
- Model agreement analysis
- Feature importance visualization

## Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at `http://localhost:8080`

### Production Build
```bash
npm run build
npm run preview
```



