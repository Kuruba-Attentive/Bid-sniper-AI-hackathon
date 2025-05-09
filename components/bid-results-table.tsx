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

interface ScoredBidData extends BidData {
  score?: number;
}

export function BidResultsTable() {
  const {
    bidData: initialBidData,
    resetFormData,
    setIsFormSubmitted,
  } = useBidStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [scoredBidData, setScoredBidData] = useState<ScoredBidData[]>([]);

  useEffect(() => {
    // Initialize with random scores
    const initialScores = initialBidData.map((bid) => ({
      ...bid,
      score: Math.random() * 100,
    }));
    setScoredBidData(initialScores);
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
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            item.output.project_name.toLowerCase().includes(searchLower) ||
            item.output.company.toLowerCase().includes(searchLower) ||
            item.output.location.toLowerCase().includes(searchLower)
          );
        }
        return true;
      })
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  };

  const filteredData = getFilteredData();

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
          <ScrollArea className="h-[calc(100vh-24rem)] w-full">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b bg-muted/50 p-2">
                <div className="col-span-4 font-medium">Project Details</div>
                <div className="col-span-2 font-medium">Company</div>
                <div className="col-span-2 font-medium">Trade & Scope</div>
                <div className="col-span-2 font-medium">Timeline</div>
                <div className="col-span-2 font-medium">Score</div>
              </div>

              {filteredData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-12 border-b p-4 hover:bg-muted/50"
                >
                  <div className="col-span-4">
                    <div className="font-medium">
                      {item.output.project_name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.output.location}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.output.project_description}
                    </div>
                    {item.output.bid_details_link?.[0] && (
                      <a
                        href={item.output.bid_details_link[0]}
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
                    <div className="font-medium">{item.output.company}</div>
                    <Badge
                      variant={
                        item.output.is_public_work ? "secondary" : "outline"
                      }
                      className="mt-1"
                    >
                      {item.output.is_public_work ? "Public" : "Private"}
                    </Badge>
                  </div>

                  <div className="col-span-2">
                    <Badge variant="outline" className="mb-1">
                      {item.output.trade}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {item.output.scope_of_work}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.output.area_of_expertise}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-sm">
                      <span className="font-medium">Due:</span>{" "}
                      {new Date(item.output.bid_due_date).toLocaleDateString()}
                    </div>
                    {item.output.project_start_date && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Start:</span>{" "}
                        {new Date(
                          item.output.project_start_date
                        ).toLocaleDateString()}
                      </div>
                    )}
                    {item.output.project_end_date && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">End:</span>{" "}
                        {new Date(
                          item.output.project_end_date
                        ).toLocaleDateString()}
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
                      {item.output.complexity_of_the_project}
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredData.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No opportunities found matching your criteria.
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
