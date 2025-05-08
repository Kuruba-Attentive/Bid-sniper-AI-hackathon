'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, BarChart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  
  return (
    <motion.div 
      className="h-16 border-b px-4 flex items-center justify-between bg-card"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden md:flex items-center">
          <BarChart className="h-5 w-5 mr-2" />
          <h1 className="text-xl font-semibold">Bid Opportunity Dashboard</h1>
        </div>
        
        <div className="md:hidden">
          <h1 className="text-lg font-semibold">BidSense AI</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {showSearch ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="relative hidden md:block"
          >
            <Input 
              placeholder="Search..."
              className="max-w-[200px]"
              onBlur={() => setShowSearch(false)}
              autoFocus
            />
          </motion.div>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowSearch(true)}
            className="hidden md:flex"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="rounded-full font-normal"
        >
          <span className="hidden md:inline">Your Account</span>
          <span className="md:hidden">AC</span>
        </Button>
      </div>
    </motion.div>
  );
}