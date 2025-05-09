'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <motion.div 
      className="h-16 border-b px-4 flex items-center justify-between bg-card"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <div className="hidden md:flex items-center">
          <BarChart className="h-5 w-5 mr-2" />
          <h1 className="text-xl font-semibold">Bid Opportunity Dashboard</h1>
        </div>
        
        <div className="md:hidden">
          <h1 className="text-lg font-semibold">BidSense AI</h1>
        </div>
      </div>
      
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </motion.div>
  );
}