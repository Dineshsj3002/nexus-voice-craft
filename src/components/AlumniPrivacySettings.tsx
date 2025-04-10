
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Lock, Eye, Bell, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrivacySettings {
  mentorshipVisibility: 'all' | 'request' | 'unavailable';
  profileDetailLevel: 'full' | 'current' | 'industry';
  contactMethods: ('platform' | 'email' | 'video')[];
  allowSpotlight: boolean;
}

const AlumniPrivacySettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<PrivacySettings>({
    mentorshipVisibility: 'request',
    profileDetailLevel: 'full',
    contactMethods: ['platform'],
    allowSpotlight: false,
  });
  
  const handleVisibilityChange = (value: 'all' | 'request' | 'unavailable') => {
    setSettings(prev => ({ ...prev, mentorshipVisibility: value }));
  };
  
  const handleDetailLevelChange = (value: 'full' | 'current' | 'industry') => {
    setSettings(prev => ({ ...prev, profileDetailLevel: value }));
  };
  
  const handleContactMethodChange = (method: 'platform' | 'email' | 'video') => {
    setSettings(prev => {
      const newMethods = prev.contactMethods.includes(method)
        ? prev.contactMethods.filter(m => m !== method)
        : [...prev.contactMethods, method];
        
      return { ...prev, contactMethods: newMethods };
    });
  };
  
  const handleSpotlightChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, allowSpotlight: checked }));
  };
  
  const saveSettings = () => {
    // Here you would save the settings to the backend
    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved successfully.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Privacy Settings
        </CardTitle>
        <CardDescription>
          Control how your profile appears to students and how they can contact you
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Mentorship Visibility */}
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Mentorship Availability
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Control how you appear in student searches and recommendations
            </p>
            
            <RadioGroup 
              value={settings.mentorshipVisibility}
              onValueChange={value => handleVisibilityChange(value as any)}
              className="space-y-3"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="all" id="all" />
                <div className="grid gap-1.5">
                  <Label htmlFor="all" className="font-medium">Available to all students</Label>
                  <p className="text-sm text-gray-500">
                    Your profile appears in all searches and recommendations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="request" id="request" />
                <div className="grid gap-1.5">
                  <Label htmlFor="request" className="font-medium">Available by request only</Label>
                  <p className="text-sm text-gray-500">
                    Students can find your profile but must request to connect
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="unavailable" id="unavailable" />
                <div className="grid gap-1.5">
                  <Label htmlFor="unavailable" className="font-medium">Currently unavailable</Label>
                  <p className="text-sm text-gray-500">
                    Your profile won't appear in searches or recommendations
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {/* Profile Detail Level */}
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Profile Information Sharing
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose what career details students can see
            </p>
            
            <RadioGroup 
              value={settings.profileDetailLevel}
              onValueChange={value => handleDetailLevelChange(value as any)}
              className="space-y-3"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="full" id="full" />
                <div className="grid gap-1.5">
                  <Label htmlFor="full" className="font-medium">Show full details</Label>
                  <p className="text-sm text-gray-500">
                    Your complete work history and achievements are visible
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="current" id="current" />
                <div className="grid gap-1.5">
                  <Label htmlFor="current" className="font-medium">Show current role only</Label>
                  <p className="text-sm text-gray-500">
                    Only your current company and role will be visible
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="industry" id="industry" />
                <div className="grid gap-1.5">
                  <Label htmlFor="industry" className="font-medium">Show industry only</Label>
                  <p className="text-sm text-gray-500">
                    Only your industry and graduation year will be visible
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {/* Contact Methods */}
          <div>
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Student Contact Methods
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select how students can reach out to you
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="platform" 
                  checked={settings.contactMethods.includes('platform')}
                  onCheckedChange={() => handleContactMethodChange('platform')}
                />
                <Label htmlFor="platform">Platform messaging</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email" 
                  checked={settings.contactMethods.includes('email')}
                  onCheckedChange={() => handleContactMethodChange('email')}
                />
                <Label htmlFor="email">Email</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="video" 
                  checked={settings.contactMethods.includes('video')}
                  onCheckedChange={() => handleContactMethodChange('video')}
                />
                <Label htmlFor="video">Video call booking</Label>
              </div>
            </div>
          </div>
          
          {/* Featured Spotlight */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium mb-2">Featured Alumni Spotlight</h3>
                <p className="text-sm text-gray-600">
                  Allow us to highlight your profile to students in your field
                </p>
              </div>
              <Switch 
                checked={settings.allowSpotlight}
                onCheckedChange={handleSpotlightChange}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              onClick={saveSettings} 
              className="bg-nexus-primary hover:bg-nexus-primary/90"
            >
              Save Privacy Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlumniPrivacySettings;
