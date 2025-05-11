"use client";

import {
  TRADE_OPTIONS,
  PROJECT_SIZE_OPTIONS,
  BUILDING_TYPE_OPTIONS,
  JOB_TYPE_OPTIONS,
} from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ReviewSubmitStep({ form }: { form: any }) {
  const formValues = form.getValues();
  const getOptionLabel = (options: any[], value: string) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Parameters</CardTitle>
          <CardDescription>
            Please review all the information before submitting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Selected Trades</h3>
            <div className="flex flex-wrap gap-2">
              {formValues.trades.length > 0 ? (
                formValues.trades.map((trade: string) => (
                  <Badge key={trade} variant="secondary">
                    {getOptionLabel(TRADE_OPTIONS, trade)}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No trades selected
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-1">
            <h3 className="text-sm font-medium">Blacklisted Contractors</h3>
            <div className="flex flex-wrap gap-2">
              {formValues.blacklistedContractors &&
              formValues.blacklistedContractors.length > 0 ? (
                formValues.blacklistedContractors.map((contractor: string) => (
                  <Badge key={contractor} variant="outline">
                    {contractor}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No contractors blacklisted
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Project Size</h3>
              <p className="text-sm">
                {formValues.projectSize
                  ? getOptionLabel(PROJECT_SIZE_OPTIONS, formValues.projectSize)
                  : "Not specified"}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Project Budget</h3>
              <p className="text-sm">
                {formValues.projectBudget
                  ? `$${formValues.projectBudget}`
                  : "Not specified"}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Type of Building</h3>
              <p className="text-sm">
                {formValues.typeOfBuilding
                  ? getOptionLabel(
                      BUILDING_TYPE_OPTIONS,
                      formValues.typeOfBuilding
                    )
                  : "Not specified"}
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium">Type of Job</h3>
              <p className="text-sm">
                {formValues.typeOfJob
                  ? getOptionLabel(JOB_TYPE_OPTIONS, formValues.typeOfJob)
                  : "Not specified"}
              </p>
            </div>
          </div>

          {/* <Separator />

          <div className="space-y-1">
            <h3 className="text-sm font-medium">Scope of Work</h3>
            <div className="flex flex-wrap gap-2">
              {formValues.scopeOfWork && formValues.scopeOfWork.length > 0 ? (
                formValues.scopeOfWork.map((scope: string) => (
                  <Badge key={scope} variant="secondary">
                    {getOptionLabel(SCOPE_OF_WORK_OPTIONS, scope)}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No scope of work selected
                </p>
              )}
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
