'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Settings, 
  BarChart3, 
  Users, 
  ChevronLeft,
  Menu
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const sidebarVariants = {
    open: { x: 0, width: 240 },
    closed: { x: -240, width: 0 },
  };
  
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, active: true },
    { name: 'Bids', icon: <FileSpreadsheet className="h-5 w-5" /> },
    { name: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Contractors', icon: <Users className="h-5 w-5" /> },
    { name: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 z-30 h-full bg-card border-r shadow-lg lg:relative",
          isOpen ? "block" : "hidden lg:block"
        )}
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="font-semibold text-lg">BidSense AI</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-2 py-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    item.active ? "bg-secondary" : ""
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Button>
              ))}
            </nav>
          </div>
          
          <div className="px-3 py-2 mt-auto border-t">
            <div className="flex items-center justify-between p-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </ScrollArea>
      </motion.div>
      
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}