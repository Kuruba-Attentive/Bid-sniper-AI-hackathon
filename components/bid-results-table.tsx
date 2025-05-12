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
import * as XLSX from 'xlsx';
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
          "http://34.100.131.110:5100/outputs"
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
      setBidData([...data]);
    }
  };

  const handleReset = () => {
    // resetFormData();
    setIsFormSubmitted(false);
  };

  const filteredData = useMemo(() => {
    if (!Array.isArray(bidData)) return [];

    if (searchTerm === "") return bidData;

    // Create a new array to ensure proper reactivity
    return [...bidData].filter((bid) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        bid.project_name.toLowerCase().includes(searchLower) ||
        bid.project_description.toLowerCase().includes(searchLower) ||
        bid.company.toLowerCase().includes(searchLower) ||
        bid.location.toLowerCase().includes(searchLower) ||
        bid.trades.join(", ").toLowerCase().includes(searchLower)
      );
    });
  }, [bidData, searchTerm]);

  const handleExport = () => {
    // Prepare the data for export
    const exportData = filteredData.map(bid => ({
      'Project Name': bid.project_name,
      'Company': bid.company,
      'Location': bid.location,
      'Trade': bid.trades.join(", "),
      'Project Size': bid.project_size,
      'Due Date': formatDate(bid.bid_due_date),
      'Project Description': bid.project_description,
      'Area of Expertise': bid.area_of_expertise,
      'Scope of Work': bid.scope_of_work,
      'Square Footage': bid.square_footage_of_work,
      'Project Cost': bid.project_cost,
      'Complexity': bid.complexity_of_the_project,
      'Type of Job': bid.type_of_job,
      'Type of Building': bid.type_of_building,
      'Private Work': bid.is_private_work ? 'Yes' : 'No',
      'Public Work': bid.is_public_work ? 'Yes' : 'No',
      'Project Start Date': bid.project_start_date ? formatDate(bid.project_start_date) : 'N/A'
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bid Opportunities');

    // Generate Excel file
    XLSX.writeFile(workbook, 'bid_opportunities.xlsx');
  };

  const handleProjectNameClick = (projectName: string) => {
    // Encode the project name for URL
    const encodedProjectName = encodeURIComponent(projectName);
    // Open Gmail in new tab with search query
    window.open(`https://mail.google.com/mail/u/0/#search/${encodedProjectName}`, '_blank');
  };

  if (bidData?.length === 0) return <LoadingScreenDemo />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-muted-foreground mt-2">
            {filteredData.length} opportunities found
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
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
                        <button
                          onClick={() => handleProjectNameClick(bid.project_name)}
                          className="text-primary hover:text-primary/80 hover:underline focus:outline-none"
                        >
                          {bid.project_name}
                        </button>
                      </TableCell>
                      <TableCell>{bid.company}</TableCell>
                      <TableCell>{bid.location}</TableCell>
                      <TableCell>{bid.trades.join(", ")}</TableCell>
                      <TableCell>{bid.project_size}</TableCell>
                      <TableCell>{formatDate(bid.bid_due_date)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {bid.bid_details_link && Object.entries(bid.bid_details_link)
                            .filter(([key, value]) => key && value) // Only show if both key and value exist
                            .map(([key, value]) => (
                              <Button
                                key={key}
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(value, '_blank')}
                                className="text-xs"
                              >
                                {key}
                              </Button>
                            ))}
                        </div>
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
