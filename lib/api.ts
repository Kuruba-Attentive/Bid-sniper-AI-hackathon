"use client";

import axios from "axios";
import { BidFormData } from "@/types";

export interface BidOutput {
  location: string;
  project_name: string;
  project_description: string;
  company: string;
  bid_due_date: string;
  project_start_date: string;
  project_end_date: string;
  project_cost: string;
  trade: string;
  scope_of_work: string;
  complexity_of_the_project: string;
  area_of_expertise: string;
  square_footage_of_work: string;
  type_of_building: string;
  type_of_job: string;
  is_public_work: boolean;
  is_private_work: boolean;
  bid_details_link: string[];
  related_emails: string[];
}

export interface BidData {
  output: BidOutput;
}

export async function processBidData(formData: BidFormData): Promise<void> {
  try {
    await axios.post(
      "https://75b3-180-151-22-206.ngrok-free.app/start_workflow",
      {
        trades: formData.trades,
        blacklisted_companies: formData.blacklistedContractors,
        project_size: formData.projectSize,
        property_address: formData.propertyAddress,
        past_relationships: formData.pastRelationships,
        project_budget: parseFloat(formData.projectBudget),
        job_type: formData.typeOfJob.toLowerCase(),
        building_type: formData.typeOfBuilding.toLowerCase(),
      }
    );
  } catch (error) {
    console.error("Error processing bid data:", error);
    throw error;
  }
}

export async function calculateBidScores(
  bids: BidData[],
  weights: Record<string, number>
): Promise<(BidData & { score: number })[]> {
  return bids.map((bid) => ({
    ...bid,
    score: Math.random() * 100,
  }));
}