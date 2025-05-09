import { create } from "zustand";
import { BidFormData, BidDataItem } from "@/types";

interface BidStore {
  // Form State
  formData: BidFormData;
  updateFormData: (data: Partial<BidFormData>) => void;
  resetFormData: () => void;

  // UI State
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Results State
  bidData: BidDataItem[];
  setBidData: (data: BidDataItem[]) => void;
  isFormSubmitted: boolean;
  setIsFormSubmitted: (submitted: boolean) => void;
}

const initialFormData: BidFormData = {
  trades: [],
  blacklistedContractors: [],
  projectSize: "",
  propertyAddress: "",
  pastRelationships: [],
  projectBudget: "",
  typeOfJob: "",
  typeOfBuilding: "",
};

export const useBidStore = create<BidStore>((set) => ({
  // Form State
  formData: initialFormData,
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetFormData: () => set({ formData: initialFormData, currentStep: 0 }),

  // UI State
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Results State
  bidData: [],
  setBidData: (data) => set({ bidData: data }),
  isFormSubmitted: false,
  setIsFormSubmitted: (submitted) => set({ isFormSubmitted: submitted }),
}));