export interface BidFormData {
  trades: string[];
  blacklistedContractors: string[];
  projectSize: string;
  propertyAddress: string;
  pastRelationships: string[];
  projectBudget: string;
  typeOfJob: string;
  typeOfBuilding: string;
}

export interface BidDataItem {
  id: string;
  companyName: string;
  bidAmount: number;
  trades: string[];
  location: string;
  projectSize: string;
  bidDueDate: string;
  qualification: number;
  status: "pending" | "qualified" | "rejected";
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  column: keyof BidDataItem | null;
  direction: SortDirection;
}

export interface FilterState {
  trades: string[] | null;
  status: string | null;
  qualification: number | null;
}

export const PROJECT_SIZE_OPTIONS = [
  { label: "Small (< 5,000 sq ft)", value: "small" },
  { label: "Medium (5,000 - 20,000 sq ft)", value: "medium" },
  { label: "Large (20,000 - 50,000 sq ft)", value: "large" },
  { label: "Extra Large (> 50,000 sq ft)", value: "extra_large" },
];

export const TRADE_OPTIONS = [
  { label: "Electrical", value: "electrical" },
  { label: "Plumbing", value: "plumbing" },
  { label: "HVAC", value: "hvac" },
  { label: "Carpentry", value: "carpentry" },
  { label: "Masonry", value: "masonry" },
  { label: "Roofing", value: "roofing" },
];

export const BUILDING_TYPE_OPTIONS = [
  { label: "Hospital", value: "hospital" },
  { label: "Government", value: "government" },
  { label: "Industrial", value: "industrial" },
  { label: "School", value: "school" },
  { label: "Fire Station", value: "fire_station" },
  { label: "Commercial", value: "commercial" },
  { label: "Residential", value: "residential" },
];

export const JOB_TYPE_OPTIONS = [
  { label: "Commercial", value: "commercial" },
  { label: "Residential", value: "residential" },
];