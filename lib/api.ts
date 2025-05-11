"use client";

import axios from "axios";
import { BidFormData } from "@/types";

/**
 * TypeScript interface for the project data structure
 */
export interface BidOutput {
  /** Unique identifier for the project */
  id: number;

  /** Name of the project */
  project_name: string;

  /** Detailed description of the project */
  project_description: string;

  /** Company associated with the project */
  company: string;

  /** Physical location of the project */
  location: string;

  /** Due date for project bids in DD-MM-YYYY format */
  bid_due_date: string;

  /** Creation timestamp in DD-MM-YYYY HH:MM:SS format */
  created_at: string;

  /** Last update timestamp in DD-MM-YYYY HH:MM:SS format */
  updated_at: string;

  /** Area of expertise required for the project */
  area_of_expertise: string;

  /** The specific work to be performed (e.g., Renovation, Construction) */
  scope_of_work: string;

  /** Size classification of the project (e.g., small, medium, large) */
  project_size: string;

  /** Square footage of the project area, often represented as a string */
  square_footage_of_work: string;

  /** Estimated cost of the project as a string */
  project_cost: string;

  /** The complexity level of the project */
  complexity_of_the_project: string;

  /** Type of job classification (e.g., Commercial) */
  type_of_job: string;

  /** Type of building for the project (e.g., Retail, Mixed-Use) */
  type_of_building: string;

  /** Industry trade classification (e.g., HVAC, Retail) */
  trades: string[];

  /** Flag indicating if the project is private work */
  is_private_work: boolean;

  /** Flag indicating if the project is public work */
  is_public_work: boolean;

  /** Array of links related to bid details */
  bid_details_link: string[];

  /** Array of email addresses related to the project */
  related_emails: string[];

  /** Start date of the project in DD-MM-YYYY format, can be null */
  project_start_date: string | null;

  /** End date of the project in DD-MM-YYYY format, can be null */
  project_end_date: string | null;
}

export type BidData = BidOutput[];
export async function processBidData(
  formData: BidFormData
): Promise<BidData[]> {
  try {
    const response = await axios.post(
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
    return response.data;
  } catch (error) {
    console.error("Error processing bid data:", error);
    throw error;
  }
}

export async function calculateBidScores(
  bids: BidData,
  weights: Record<string, number>
): Promise<BidOutput[]> {
  return bids.map((bid) => ({
    ...bid,
    score: Math.random() * 100,
  }));
}
