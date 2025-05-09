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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function ProjectDetailsStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
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
      {/*       
      <Card>
        <CardHeader>
          <CardTitle>Scope of Work</CardTitle>
          <CardDescription>
            Select all applicable work scopes for this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="scopeOfWork"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-2 gap-4">
                  {SCOPE_OF_WORK_OPTIONS.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, option.value])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== option.value
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card> */}

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
