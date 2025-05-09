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

// Mock data from the API
export const mockBidData: BidData[] = [
  {
    output: {
      location:
        "600 Robert Street North, Saint Paul, MN 55101, United States of America",
      project_name:
        "State of Minnesota Department of Revenue 4th Floor Renovation",
      project_description:
        "Renovation of the existing 4th floor tenant space of the Department of Revenue in the Stassen building on the Capitol Complex.",
      company: "Jorgenson Construction Inc.",
      bid_due_date: "2025-03-31",
      project_start_date: "2025-04-01",
      project_end_date: "2025-07-01",
      project_cost: "TBD",
      trade: "HVAC",
      scope_of_work: "Renovation",
      complexity_of_the_project:
        "Standard renovation, no special complex plans indicated.",
      area_of_expertise: "HVAC systems",
      square_footage_of_work: "TBD",
      type_of_building: "government",
      type_of_job: "Commercial",
      is_public_work: true,
      is_private_work: false,
      bid_details_link: [
        "https://app.buildingconnected.com/goto/67e174feb1f5f1003542c187195c8b101f0istb",
      ],
      related_emails: [
        "rohitsaha@attentive.ai",
        "karan@attentive.ai",
        "kevin@truemechmn.com",
        "jacob@jorgensonconstruction.com",
      ],
    },
  },
  {
    output: {
      location: "Foley, Minnesota",
      project_name: "Benton County Government Center",
      project_description:
        "This project calls for the Improvements of an existing Government Center.",
      company: "Benton County",
      bid_due_date: "2025-05-28",
      project_start_date: "",
      project_end_date: "",
      project_cost: "",
      trade: "Government / Public",
      scope_of_work: "Improvements",
      complexity_of_the_project: "Standard complexity for government projects",
      area_of_expertise: "Municipal buildings",
      square_footage_of_work: "",
      type_of_building: "Government",
      type_of_job: "Public",
      is_public_work: true,
      is_private_work: false,
      bid_details_link: [
        "https://itb.planhub.com/project/details/benton-county-government-center-improvements-foley-minnesota-4521614",
      ],
      related_emails: ["info@ironpeakmech.com"],
    },
  },
  {
    output: {
      location:
        "600 Robert Street North, Saint Paul, MN 55101, United States of America",
      project_name: "State of Minnesota Department of Revenue 4th Floor HVAC",
      project_description:
        "The total project includes the renovation of the existing 4th floor tenant space of the Department of Revenue in the Stassen building on the Capitol Complex.",
      company: "Jorgenson Construction Inc.",
      bid_due_date: "2025-03-31",
      project_start_date: "2025-03-25",
      project_end_date: "",
      project_cost: "",
      trade: "HVAC",
      scope_of_work: "Renovation",
      complexity_of_the_project:
        "Moderate complexity due to renovation of an existing space",
      area_of_expertise: "HVAC",
      square_footage_of_work: "",
      type_of_building: "Government",
      type_of_job: "Commercial",
      is_public_work: true,
      is_private_work: false,
      bid_details_link: [
        "https://app.buildingconnected.com/goto/67e174feb1f5f1003542c187195c8b101f0istb",
      ],
      related_emails: [
        "karan@attentive.ai",
        "rohitsaha@attentive.ai",
        "kevin@truemechmn.com",
        "jacob@jorgensonconstruction.com",
      ],
    },
  },
];
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
        // scope_of_work: formData.scopeOfWork,
        project_budget: parseFloat(formData.projectBudget),
        job_type: formData.typeOfJob.toLowerCase(),
        building_type: formData.typeOfBuilding.toLowerCase(),
      }
    );
    return response;
  } catch (error) {
    console.error("Error processing bid data:", error);
    throw error;
  }
}

export async function calculateBidScores(
  bids: BidData[],
  weights: Record<string, number>
): Promise<(BidData & { score: number })[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return bids.map((bid) => ({
    ...bid,
    score: Math.random() * 100, // In a real app, this would be calculated based on weights
  }));
}
