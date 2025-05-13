import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  Briefcase,
  CircleDollarSign,
  CheckCircle,
  Clock,
  FileCheck,
} from "lucide-react";

// Custom component for percent circle since it might not be available
interface PercentCircleProps {
  className?: string;
}

function PercentCircle(props: PercentCircleProps) {
  return (
    <div className={props.className}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14l2.5 2.5 5-5" />
        <path d="M8.5 8.5l7 7" />
      </svg>
    </div>
  );
}

export default function LoadingScreenDemo() {
  const [activeIcon, setActiveIcon] = useState(0);

  // Icons that will animate in sequence
  const icons = [
    { icon: <Building2 className="h-8 w-8" />, label: "Finding Projects" },
    { icon: <Briefcase className="h-8 w-8" />, label: "Matching Trades" },
    {
      icon: <CircleDollarSign className="h-8 w-8" />,
      label: "Analyzing Budgets",
    },
    { icon: <Clock className="h-8 w-8" />, label: "Calculating Timelines" },
    {
      icon: <PercentCircle className="h-8 w-8" />,
      label: "Scoring Opportunities",
    },
    { icon: <FileCheck className="h-8 w-8" />, label: "Preparing Results" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    // < className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col items-center justify-center">
    <>
      {/* Main content */}
      <div className="w-full px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">
            Analyzing Your Bid Parameters
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We're finding the best opportunities based on your criteria
          </p>
        </motion.div>

        {/* Animated processing visualization */}
        <div className="relative mb-16 h-64">
          {/* Background grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-4">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Centered animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative flex flex-col items-center"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-6 bg-gray-100 dark:bg-gray-800 rounded-full opacity-20"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <div className="relative bg-white dark:bg-gray-900 rounded-full p-6 shadow-lg">
                  {icons.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: activeIcon === index ? 1 : 0,
                        scale: activeIcon === index ? 1 : 0.8,
                        y: activeIcon === index ? 0 : 10,
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {item.icon}
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <div className="h-6 relative">
                  {icons.map((item, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: activeIcon === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 right-0 font-medium"
                    >
                      {item.label}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats preview */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Opportunities",
              value: "Searching...",
              icon: <CheckCircle className="h-5 w-5" />,
            },
            {
              label: "Trades",
              value: "Matching...",
              icon: <Briefcase className="h-5 w-5" />,
            },
            {
              label: "Locations",
              value: "Analyzing...",
              icon: <Building2 className="h-5 w-5" />,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div className="flex items-center mb-2">
                <div className="mr-2 text-gray-600 dark:text-gray-400">
                  {stat.icon}
                </div>
                <h3 className="text-sm font-medium">{stat.label}</h3>
              </div>
              <p className="text-lg font-semibold">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer with loading status */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading your personalized results...
          </p>
          <div className="flex gap-1">
            <motion.span
              className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            />
            <motion.span
              className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
            />
            <motion.span
              className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
