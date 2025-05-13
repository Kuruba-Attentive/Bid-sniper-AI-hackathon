# Bid Sniper AI - Construction Bid Management Platform

A modern web application that helps construction companies and contractors find and manage bid opportunities using AI-powered matching and ranking.

## Features

### 1. Smart Bid Matching
- AI-powered matching of bid opportunities based on:
  - Trade expertise
  - Project size
  - Location
  - Past relationships
  - Budget considerations
  - Building type
  - Job type

### 2. Interactive Ranking System
- Customizable ranking parameters:
  - Past Relationship weight
  - Trade Match weight
  - Location weight
  - Project Size weight
  - Budget Match weight
- Real-time updates as weights are adjusted

### 3. Comprehensive Bid Management
- Detailed bid information display:
  - Project details
  - Company information
  - Location data
  - Trade requirements
  - Project size
  - Due dates
  - Related emails
  - Bid detail links

### 4. User-Friendly Interface
- Modern, responsive design
- Interactive data tables
- Search functionality
- Export capabilities
- Email integration

## Technical Stack

- **Frontend Framework**: Next.js with TypeScript
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **API Integration**: Axios
- **Form Handling**: React Hook Form with Zod validation
- **Data Export**: XLSX library

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd bid-sniper-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add necessary environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Submitting Bid Parameters
1. Fill out the bid parameter form with:
   - Required trades
   - Project size
   - Property address
   - Project budget
   - Type of job
   - Type of building
   - Past relationships (optional)
   - Blacklisted contractors (optional)

2. Review and submit the form

### Managing Bid Opportunities
1. View matched bid opportunities in the results table
2. Use the ranking sliders to adjust match priorities
3. Search through opportunities using the search bar
4. Export data to Excel using the export button
5. Click on project names to search related emails in Gmail
6. Access bid details through the action buttons

## Project Structure

```
bid-sniper-ai/
├── app/
│   └── page.tsx
├── components/
│   ├── bid-parameter-form.tsx
│   ├── bid-results-table.tsx
│   ├── ranking-sliders.tsx
│   └── ui/
├── lib/
│   ├── api.ts
│   └── store.ts
├── types/
│   └── index.ts
└── public/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [support@bidsniper.ai](mailto:support@bidsniper.ai) or open an issue in the repository. 