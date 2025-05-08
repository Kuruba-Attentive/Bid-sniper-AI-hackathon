'use client';

import { BUILDING_TYPE_OPTIONS, JOB_TYPE_OPTIONS } from '@/types';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AdditionalParametersStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Type of Building</CardTitle>
          <CardDescription>
            Select the type of building for this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="typeOfBuilding"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select building type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUILDING_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Type of Job</CardTitle>
          <CardDescription>
            Select whether this is a commercial or residential project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="typeOfJob"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {JOB_TYPE_OPTIONS.map((option) => (
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
    </div>
  );
}