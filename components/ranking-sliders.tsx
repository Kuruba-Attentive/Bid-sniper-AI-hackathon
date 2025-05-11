'use client';

import { useState, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import debounce from 'lodash/debounce';

interface RankingParameter {
  name: string;
  key: string;
  value: number;
}

interface RankingSlidersProps {
  onWeightsChange: (weights: Record<string, number>) => void;
}

export function RankingSliders({ onWeightsChange }: RankingSlidersProps) {
  const [parameters, setParameters] = useState<RankingParameter[]>([
    { name: 'Past Relationship', key: 'past_relationship', value: 0.5 },
    { name: 'Trade Match', key: 'trades', value: 0.5 },
    { name: 'Location', key: 'location', value: 0.5 },
    { name: 'Project Size', key: 'project_size', value: 0.5 },
    { name: 'Budget Match', key: 'project_budget', value: 0.5 },
  ]);

  const { mutate: updateWeights } = useMutation({
    mutationFn: async (weights: Record<string, number>) => {
      const response = await axios.post(
        'http://34.100.131.110/get_weighted_outputs',
        {
          pastRelationship: weights.past_relationship,
          trades: weights.trades,
          location: weights.location,
          project_size: weights.project_size,
          budget: weights.project_budget
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Update the table with the new data
      onWeightsChange(data);
    },
    onError: (error) => {
      console.error('Error updating weights:', error);
    },
  });

  // Create a debounced version of the updateWeights function
  const debouncedUpdateWeights = useCallback(
    debounce((weights: Record<string, number>) => {
      updateWeights(weights);
    }, 500),
    []
  );

  const handleSliderChange = (value: number[], index: number) => {
    const updatedParameters = [...parameters];
    updatedParameters[index].value = value[0];
    setParameters(updatedParameters);

    // Convert parameters to weights object
    const weights = updatedParameters.reduce((acc, param) => ({
      ...acc,
      [param.key]: param.value,
    }), {});

    // Call the debounced function
    debouncedUpdateWeights(weights);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Ranking Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {parameters.map((param, index) => (
            <div key={param.key} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{param.name}</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(param.value * 100)}%
                </span>
              </div>
              <Slider
                value={[param.value]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(value) => handleSliderChange(value, index)}
                className="h-4"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}