'use client';

import { TRADE_OPTIONS } from '@/types';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';

export function TradeSelectionStep({ form }: { form: any }) {
  const [newContractor, setNewContractor] = useState('');
  const blacklistedContractors = form.watch('blacklistedContractors') || [];
  
  const addBlacklistedContractor = () => {
    if (newContractor.trim() && !blacklistedContractors.includes(newContractor.trim())) {
      form.setValue('blacklistedContractors', [...blacklistedContractors, newContractor.trim()]);
      setNewContractor('');
    }
  };
  
  const removeBlacklistedContractor = (contractor: string) => {
    form.setValue(
      'blacklistedContractors',
      blacklistedContractors.filter((c: string) => c !== contractor)
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trade Selection</CardTitle>
          <CardDescription>
            Select the trades that you want to consider for bidding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="trades"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {TRADE_OPTIONS.map((option) => (
                    <motion.div 
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
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
                    </motion.div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Blacklisted Contractors</CardTitle>
          <CardDescription>
            Add contractors you don't want to work with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter contractor name"
              value={newContractor}
              onChange={(e) => setNewContractor(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={addBlacklistedContractor}
              disabled={!newContractor.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {blacklistedContractors.length > 0 ? (
              blacklistedContractors.map((contractor: string) => (
                <Badge key={contractor} variant="secondary" className="px-3 py-1">
                  {contractor}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-2 p-0"
                    onClick={() => removeBlacklistedContractor(contractor)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No blacklisted contractors added</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}