"use client";

import { useState, useEffect } from "react";
import { useBidStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ExternalLink,
  FileSpreadsheet,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { RankingSliders } from "@/components/ranking-sliders";
import { calculateBidScores, BidData } from "@/lib/api";
import LoadingScreenDemo from "./loading-screen";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ScoredBidData extends BidData {
  score?: number;
}

// Helper function to format dates in MM/DD/YYYY format
const formatDate = (dateString: string): string => {
  try {
    // Handle DD-MM-YYYY format (from our API)
    if (dateString.includes("-")) {
      const [day, month, year] = dateString.split("-");
      if (day && month && year) {
        return `${month}/${day}/${year}`;
      }
    }

    // Fallback to default date parsing
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Return original string if parsing fails
  }
};

export function BidResultsTable() {
  const {
    bidData: initialBidData,
    resetFormData,
    setIsFormSubmitted,
    isFormSubmitted,
    setBidData,
  } = useBidStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [scoredBidData, setScoredBidData] = useState<ScoredBidData[]>([]);
  const [enablePolling, setEnablePolling] = useState(true);

  const {
    data,
    isLoading: isLoadingResults,
    isFetching,
  } = useQuery({
    queryKey: ["bidResults"],
    queryFn: async () => {
      try {
        const response = await axios.post(
          "https://75b3-180-151-22-206.ngrok-free.app/outputs"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching bid results:", error);
        // Return empty array if API fails
        return [];
      }
    },
    enabled: isFormSubmitted,
    ...(enablePolling && { refetchInterval: 5000 }),
  });

  useEffect(() => {
    setBidData(data);
  }, [data]);

  useEffect(() => {
    if (isFormSubmitted) {
      const id = setTimeout(() => {
        setEnablePolling(false);
      }, 1000 * 60);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isFormSubmitted]);

  useEffect(() => {
    if (
      initialBidData &&
      Array.isArray(initialBidData) &&
      initialBidData.length > 0
    ) {
      // Initialize with scores based on a combination of factors
      const initialScores = initialBidData.map((bid) => {
        // Calculate a more meaningful initial score based on bid properties
        let baseScore = Math.random() * 60 + 20; // Base score between 20-80

        // Boost public work projects slightly
        if (bid.is_public_work) baseScore += 5;

        // Adjust score based on project complexity
        if (bid.complexity_of_the_project === "Standard") baseScore += 3;

        // Cap score at 100
        const finalScore = Math.min(baseScore, 100);

        return {
          ...bid,
          score: finalScore,
        };
      });
      setScoredBidData(initialScores);
    } else {
      setScoredBidData([]);
    }
  }, [initialBidData]);

  const handleWeightsChange = async (weights: Record<string, number>) => {
    try {
      const updatedData = await calculateBidScores(initialBidData, weights);
      setScoredBidData(updatedData);
    } catch (error) {
      console.error("Error updating bid scores:", error);
    }
  };

  const handleReset = () => {
    resetFormData();
    setIsFormSubmitted(false);
  };

  const getFilteredData = () => {
    return scoredBidData
      .filter((item) => {
        if (!item) return false;

        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            item.project_name?.toLowerCase().includes(searchLower) ||
            false ||
            item.company?.toLowerCase().includes(searchLower) ||
            false ||
            item.location?.toLowerCase().includes(searchLower) ||
            false ||
            item.trade?.toLowerCase().includes(searchLower) ||
            false ||
            item.scope_of_work?.toLowerCase().includes(searchLower) ||
            false
          );
        }
        return true;
      })
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  };

  const filteredData = getFilteredData();

  if (isLoadingResults || !data.length) return <LoadingScreenDemo />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Bid Opportunities
          </h2>
          <p className="text-muted-foreground mt-2">
            {filteredData.length} opportunities found
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </Button>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <RankingSliders onWeightsChange={handleWeightsChange} />

      <Card>
        <CardHeader className="pt-6 pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border relative">
            {/* Sticky Header with solid background to prevent content showing through */}
            <div className="grid grid-cols-12 border-b bg-background p-2 sticky top-0 z-10 shadow-sm">
              <div className="col-span-4 font-medium">Project Details</div>
              <div className="col-span-2 font-medium">Company</div>
              <div className="col-span-2 font-medium">Trade & Scope</div>
              <div className="col-span-2 font-medium">Timeline</div>
              <div className="col-span-2 font-medium">Score</div>
            </div>

            <ScrollArea className="h-[calc(100vh-28rem)] w-full">
              {filteredData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-12 border-b p-4 hover:bg-muted/50"
                >
                  <div className="col-span-4">
                    <div className="font-medium">{item.project_name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.location}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.project_description}
                    </div>
                    {item.bid_details_link?.[0] && (
                      <a
                        href={item.bid_details_link[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary flex items-center mt-2"
                      >
                        View Details
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </div>

                  <div className="col-span-2">
                    <div className="font-medium">{item.company}</div>
                    <Badge
                      variant={item.is_public_work ? "secondary" : "outline"}
                      className="mt-1"
                    >
                      {item.is_public_work ? "Public" : "Private"}
                    </Badge>
                  </div>

                  <div className="col-span-2">
                    <Badge variant="outline" className="mb-1">
                      {item.trade}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {item.scope_of_work}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.area_of_expertise}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-sm">
                      <span className="font-medium">Due:</span>{" "}
                      {item.bid_due_date
                        ? formatDate(item.bid_due_date)
                        : "N/A"}
                    </div>
                    {item.project_start_date && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Start:</span>{" "}
                        {formatDate(item.project_start_date)}
                      </div>
                    )}
                    {item.project_end_date && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">End:</span>{" "}
                        {formatDate(item.project_end_date)}
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <Progress value={item.score} className="bg-muted" />
                      <span className="text-sm font-medium">
                        {Math.round(item.score || 0)}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.complexity_of_the_project || "Standard"}
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredData.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No opportunities found matching your criteria.
                </div>
              )}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
