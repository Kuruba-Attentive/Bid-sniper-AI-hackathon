'use client';

import { useState } from 'react';
import { useBidStore } from '@/lib/store';
import { BidParameterForm } from '@/components/bid-parameter-form';
import { BidResultsTable } from '@/components/bid-results-table';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import { processBidData } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export function BidWorkflow() {
  const {
    formData,
    isFormSubmitted,
    setIsFormSubmitted,
    isLoading,
    setIsLoading,
    setBidData,
  } = useBidStore();

  const { mutate: processBids, isPending } = useMutation({
    mutationFn: processBidData,
    onSuccess: () => {
      setIsLoading(false);
      setIsFormSubmitted(true);
    },
    onError: (error) => {
      console.error('Error processing bids:', error);
      setIsLoading(false);
    },
  });

  const { data: bidResults, isLoading: isLoadingResults } = useQuery({
    queryKey: ['bidResults'],
    queryFn: async () => {
      const response = await fetch('https://75b3-180-151-22-206.ngrok-free.app/outputs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: isFormSubmitted,
    refetchInterval: isFormSubmitted ? 5000 : false,
    onSuccess: (data) => {
      setBidData(data);
    },
  });

  const handleFormSubmit = (data: any) => {
    setIsLoading(true);
    processBids(data);
  };

  return (
    <div className="container mx-auto">
      <AnimatePresence mode="wait">
        {!isFormSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 shadow-md">
              <BidParameterForm onSubmit={handleFormSubmit} />
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BidResultsTable />
          </motion.div>
        )}
      </AnimatePresence>

      {(isLoading || isPending || isLoadingResults) && (
        <motion.div
          className="fixed inset-0 bg-background/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card className="p-6 flex flex-col items-center justify-center max-w-md">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">
              Processing your bid data
            </h3>
            <p className="text-muted-foreground text-center">
              Our AI is analyzing your parameters to find the best bid
              opportunities. This may take a moment...
            </p>
          </Card>
        </motion.div>
      )}
    </div>
  );
}