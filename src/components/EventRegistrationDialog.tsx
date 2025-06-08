
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  spotsLeft?: number;
};

interface EventRegistrationDialogProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventRegistrationDialog = ({ event, isOpen, onClose }: EventRegistrationDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dietaryRequirements: '',
    additionalInfo: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration
    toast({
      title: "Registration Successful!",
      description: `You've been registered for ${event?.title}. Check your email for confirmation.`,
    });

    // Reset form and close dialog
    setFormData({
      name: '',
      email: '',
      phone: '',
      dietaryRequirements: '',
      additionalInfo: ''
    });
    onClose();
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Register for Event</DialogTitle>
        </DialogHeader>
        
        {/* Event Details */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-3">{event.title}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="h-4 w-4 mr-2 text-nexus-primary" />
              {event.date}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="h-4 w-4 mr-2 text-nexus-primary" />
              {event.time}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-2 text-nexus-primary" />
              {event.location}
            </div>
            {event.spotsLeft && (
              <div className="flex items-center text-gray-600 text-sm">
                <Users className="h-4 w-4 mr-2 text-nexus-primary" />
                {event.spotsLeft} spots remaining
              </div>
            )}
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
            <Input
              id="dietaryRequirements"
              name="dietaryRequirements"
              value={formData.dietaryRequirements}
              onChange={handleInputChange}
              placeholder="Any dietary restrictions or allergies"
            />
          </div>
          
          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Any questions or special requirements"
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-nexus-primary hover:bg-nexus-primary/90">
              Complete Registration
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationDialog;
