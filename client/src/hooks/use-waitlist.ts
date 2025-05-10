import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export interface WaitlistFormData {
  email: string;
}

export const useWaitlist = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      const response = await apiRequest('POST', '/api/waitlist', data);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/waitlist'] });
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: data.message || "You've been added to our early access waitlist.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const submitWaitlistEntry = (data: WaitlistFormData) => {
    setIsSuccess(false);
    mutate(data);
  };

  return {
    submitWaitlistEntry,
    isPending,
    isError,
    isSuccess,
    error,
  };
};
