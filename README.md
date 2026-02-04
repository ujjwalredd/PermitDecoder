# PermitDecoder

PermitDecoder is an AI-powered web application that provides comprehensive building permit requirement analysis for US jurisdictions. The application leverages Google's Gemini AI with real-time search grounding to synthesize complex municipal codes, zoning ordinances, and permit regulations into actionable project reports.

## Overview

PermitDecoder transforms complex government permit requirements into structured, professional reports. Users can query specific permit scenarios by location and project type, receiving detailed analyses that include required permits, compliance procedures, inspection schedules, cost estimates, and official jurisdictional resources.

## Features

- **AI-Powered Analysis**: Generates comprehensive permit requirement reports using Google Gemini AI with real-time search grounding
- **Streaming Responses**: Real-time streaming of report generation for immediate feedback
- **Report History**: Maintains a local history of up to 15 previous analyses stored in browser localStorage
- **Source Citations**: Includes verified source links from official municipal portals and documentation
- **Markdown Rendering**: Professional markdown-formatted reports with tables, structured data, and formatted content
- **Export Functionality**: Print and export reports as PDF-ready documents
- **Multi-language Support**: Integrated Google Translate for international accessibility
- **Responsive Design**: Modern, professional UI optimized for desktop and mobile devices

## Technology Stack

- **Frontend Framework**: React 18.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Service**: Google Gemini API (gemini-3-pro-preview)
- **Styling**: Tailwind CSS with custom design system
- **Markdown Rendering**: React Markdown with GitHub Flavored Markdown support
- **State Management**: React Hooks with localStorage persistence

## Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager
- Google Gemini API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ujjwalredd/PermitDecoder.git
cd permitdecoder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
permitdecoder/
├── components/
│   ├── AuthModal.tsx          # Authentication modal component
│   ├── Header.tsx             # Application header with navigation
│   ├── HistoryList.tsx        # Report history display component
│   ├── InputSection.tsx       # Main search input interface
│   └── ReportViewer.tsx       # Report display and rendering component
├── services/
│   └── geminiService.ts       # Google Gemini API integration service
├── App.tsx                    # Main application component
├── index.tsx                  # Application entry point
├── types.ts                   # TypeScript type definitions
├── vite.config.ts             # Vite configuration
└── package.json               # Project dependencies and scripts
```

## Usage

1. Enter a permit query in the search interface, specifying:
   - Project type (e.g., residential deck, commercial food truck)
   - Location (city and state)
   - Specific requirements or questions

2. Click "Analyze" to generate a comprehensive permit report.

3. View the streaming report in the Protocol Workspace, which includes:
   - Project overview and responsible agency
   - Required permits with fee estimates
   - Compliance and application process
   - Inspection schedule
   - Cost summary
   - Official jurisdictional resources
   - Project timeline estimate

4. Access previous reports from the Analysis Vault history section.

5. Export reports using the print functionality for PDF generation.

## API Configuration

The application requires a Google Gemini API key configured in the environment variables. The API key is used to:
- Generate permit requirement analyses
- Access real-time Google Search grounding for current municipal data
- Stream response content to the user interface

Ensure your API key has access to:
- Gemini 3 Pro Preview model
- Google Search grounding capabilities

## Development

### Available Scripts

- `npm run dev`: Start development server with hot module replacement
- `npm run build`: Build production-ready application
- `npm run preview`: Preview production build locally

### Environment Variables

- `GEMINI_API_KEY`: Required. Your Google Gemini API key for AI service access.

## Build and Deployment

1. Build for production:
```bash
npm run build
```

2. The production build will be generated in the `dist/` directory.

3. Deploy the `dist/` directory to your hosting provider of choice.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Limitations and Disclaimers

- Reports are generated based on available public data and may not reflect all local variations or recent regulatory changes.
- Verification with the local Authority Having Jurisdiction (AHJ) is mandatory before proceeding with any project.
- The application provides analysis and guidance but does not constitute legal or professional advice.
- Historical reports are stored locally in browser localStorage and may be cleared by browser settings.

## License

This project is private and proprietary.

## Version

Current version: 7.4.2
