"use client";

import { useState, useEffect, useMemo } from "react";
import { useBidStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, FileSpreadsheet, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RankingSliders } from "@/components/ranking-sliders";
import LoadingScreenDemo from "./loading-screen";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    bidData,
    resetFormData,
    setIsFormSubmitted,
    isFormSubmitted,
    setBidData,
  } = useBidStore();
  const [searchTerm, setSearchTerm] = useState("");
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
        return [];
      }
    },
    enabled: isFormSubmitted,
    ...(enablePolling && { refetchInterval: 5000 }),
  });

  useEffect(() => {
    if (data) {
      setBidData(data);
    }
  }, [data, setBidData]);

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

  const handleWeightsChange = (data: any) => {
    if (Array.isArray(data)) {
      setBidData(data);
    }
  };

  const handleReset = () => {
    resetFormData();
    setIsFormSubmitted(false);
  };

  const filteredData = useMemo(() => {
    return Array.isArray(bidData)
      ? bidData.filter((bid) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            bid.project_name.toLowerCase().includes(searchLower) ||
            bid.project_description.toLowerCase().includes(searchLower) ||
            bid.company.toLowerCase().includes(searchLower) ||
            bid.location.toLowerCase().includes(searchLower) ||
            bid.trade.toLowerCase().includes(searchLower)
          );
        })
      : [];
  }, [bidData, searchTerm]);

  if (!bidData) return <LoadingScreenDemo />;

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
          <div className="rounded-md border">
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Trade</TableHead>
                    <TableHead>Project Size</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">
                        {bid.project_name}
                      </TableCell>
                      <TableCell>{bid.company}</TableCell>
                      <TableCell>{bid.location}</TableCell>
                      <TableCell>{bid.trade}</TableCell>
                      <TableCell>{bid.project_size}</TableCell>
                      <TableCell>{formatDate(bid.bid_due_date)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
