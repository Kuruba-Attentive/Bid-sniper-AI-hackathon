'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <motion.div 
        className="flex-1 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 pt-6">
          {children}
        </main>
      </motion.div>
    </div>
  );
}