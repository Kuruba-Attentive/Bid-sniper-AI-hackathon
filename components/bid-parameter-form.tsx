"use client";

import { useBidStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  ChevronRight,
  ChevronLeft,
  ListFilter,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TradeSelectionStep } from "@/components/form-steps/trade-selection-step";
import { ProjectDetailsStep } from "@/components/form-steps/project-details-step";
import { AdditionalParametersStep } from "@/components/form-steps/additional-parameters-step";
import { ReviewSubmitStep } from "@/components/form-steps/review-submit-step";

const formSchema = z.object({
  trades: z.array(z.string()).min(1, "Select at least one trade"),
  blacklistedContractors: z.array(z.string()).optional(),
  projectSize: z.string().min(1, "Project size is required"),
  propertyAddress: z.string().min(1, "Property address is required"),
  projectBudget: z.string().min(1, "Project budget is required"),
  typeOfJob: z.string().min(1, "Type of job is required"),
  typeOfBuilding: z.string().min(1, "Type of building is required"),
  pastRelationships: z.array(z.string()).optional(),
});

interface BidParameterFormProps {
  onSubmit: (data: any) => void;
}

export function BidParameterForm({ onSubmit }: BidParameterFormProps) {
  const { formData, updateFormData, currentStep, setCurrentStep } =
    useBidStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trades: formData.trades,
      blacklistedContractors: formData.blacklistedContractors,
      projectSize: formData.projectSize,
      propertyAddress: formData.propertyAddress,
      projectBudget: formData.projectBudget,
      typeOfJob: formData.typeOfJob,
      typeOfBuilding: formData.typeOfBuilding,
      pastRelationships: formData.pastRelationships,
    },
  });

  const steps = [
    {
      id: "form",
      label: "Bid Parameters",
      icon: <ListFilter className="h-4 w-4" />,
    },
    {
      id: "review",
      label: "Review & Submit",
      icon: <Briefcase className="h-4 w-4" />,
    },
  ];

  const nextStep = (e: React.MouseEvent) => {
    // Prevent any form submission
    e.preventDefault();

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    updateFormData(data);
    onSubmit(data);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            AI Bid Optimization
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter your bid parameters to find the best opportunities for your
            business.
          </p>
        </div>
        <div className="flex items-center justify-between mb-8">
          <div className="hidden md:flex gap-1 items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <Button
                  variant={currentStep >= index ? "default" : "outline"}
                  size="sm"
                  className="rounded-full h-8 px-3"
                  onClick={() => setCurrentStep(index)}
                  disabled={index > 0 && !form.formState.isValid}
                >
                  {step.icon}
                  <span className="ml-2">{step.label}</span>
                </Button>
                {index < steps.length - 1 && (
                  <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              {steps[currentStep].label}
            </Badge>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <TradeSelectionStep form={form} />
                    <ProjectDetailsStep form={form} />
                    <AdditionalParametersStep form={form} />
                  </div>
                )}
                {currentStep === 1 && <ReviewSubmitStep form={form} />}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep} variant="secondary">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
