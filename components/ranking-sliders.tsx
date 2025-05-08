'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    { name: 'Trade Match', key: 'trade', value: 0.5 },
    { name: 'Location', key: 'location', value: 0.5 },
    { name: 'Project Size', key: 'project_size', value: 0.5 },
    { name: 'Budget Match', key: 'project_budget', value: 0.5 },
  ]);

  const handleSliderChange = (value: number[], index: number) => {
    const updatedParameters = [...parameters];
    updatedParameters[index].value = value[0];
    setParameters(updatedParameters);

    // Convert parameters to weights object
    const weights = parameters.reduce((acc, param) => ({
      ...acc,
      [param.key]: param.value,
    }), {});

    onWeightsChange(weights);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ranking Parameters</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {parameters.map((param, index) => (
          <div key={param.key} className="space-y-2">
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
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}