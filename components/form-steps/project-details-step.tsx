"use client";

import { PROJECT_SIZE_OPTIONS, SCOPE_OF_WORK_OPTIONS } from "@/types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

export function ProjectDetailsStep({ form }: { form: any }) {
  const pastRelationships = form.watch("pastRelationships") || [];

  const addPastRelationship = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const relationship = formData.get("relationship") as string;
    
    if (relationship?.trim()) {
      form.setValue("pastRelationships", [...pastRelationships, relationship.trim()]);
      (e.target as HTMLFormElement).reset();
    }
  };

  const removePastRelationship = (relationship: string) => {
    form.setValue(
      "pastRelationships",
      pastRelationships.filter((r: string) => r !== relationship)
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Address</CardTitle>
          <CardDescription>
            Enter the complete address of the property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="propertyAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Enter property address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Good Relationships</CardTitle>
          <CardDescription>
            Add names or emails of bidders you've had good experiences with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addPastRelationship} className="flex gap-2 mb-4">
            <Input
              name="relationship"
              placeholder="Enter name or email"
              className="flex-1"
            />
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </form>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {pastRelationships.length > 0 ? (
              pastRelationships.map((relationship: string) => (
                <Badge key={relationship} variant="secondary" className="px-3 py-1">
                  {relationship}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-2 p-0"
                    onClick={() => removePastRelationship(relationship)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No past relationships added</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Size</CardTitle>
          <CardDescription>
            Select the approximate size of the project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="projectSize"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {PROJECT_SIZE_OPTIONS.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex items-center space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Budget</CardTitle>
          <CardDescription>
            Enter the estimated budget for this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="projectBudget"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      $
                    </span>
                    <Input
                      placeholder="Enter budget amount"
                      {...field}
                      className="pl-7"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}