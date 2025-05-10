import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useWaitlist, WaitlistFormData } from '@/hooks/use-waitlist';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

// Create schema for form validation
const waitlistFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

interface WaitlistFormProps {
  className?: string;
  buttonText?: string;
  showSuccess?: boolean;
  successMessage?: string;
  onSuccess?: () => void;
  variant?: 'default' | 'cta';
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({
  className = '',
  buttonText = 'Join Early Access',
  showSuccess = true,
  successMessage = "Thanks! You're on the list for early access.",
  onSuccess,
  variant = 'default',
}) => {
  const { submitWaitlistEntry, isPending, isSuccess } = useWaitlist();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: WaitlistFormData) => {
    submitWaitlistEntry(data);
    if (onSuccess) {
      onSuccess();
    }
  };

  if (isSuccess && showSuccess) {
    return (
      <Alert className="bg-emerald-50 border-emerald-200 text-emerald-700">
        <CheckCircle className="h-4 w-4 mr-2" />
        <AlertDescription>{successMessage}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <div className={`flex flex-col sm:flex-row gap-2 ${variant === 'cta' ? 'items-center justify-center' : 'items-start'}`}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </FormControl>
                <FormMessage className="text-destructive text-sm mt-1" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className={`px-6 py-3 rounded-lg whitespace-nowrap ${
              variant === 'default'
                ? 'bg-[#FF6B6B] hover:bg-opacity-90 text-white'
                : 'bg-[#FF6B6B] hover:bg-opacity-90 text-white font-medium'
            }`}
          >
            {isPending ? 'Submitting...' : buttonText}
          </Button>
        </div>
        {variant === 'default' && (
          <p className="text-sm text-gray-500 mt-2">Get notified when we launch. No spam, ever.</p>
        )}
      </form>
    </Form>
  );
};

export default WaitlistForm;
