import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Edit3, 
  MapPin, 
  Briefcase, 
  Calendar,
  Users,
  MessageCircle,
  UserPlus,
  Settings,
  Star
} from 'lucide-react';

interface ProfileCoverProps {
  profile: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    bio?: string;
    status?: string;
    location?: string;
    company?: string;
    joined_date?: string;
    cover_image?: string;
  };
  userEmail?: string;
  isOwnProfile?: boolean;
  connectionCount?: number;
  mutualConnections?: number;
}

export function ProfileCover({ 
  profile, 
  userEmail, 
  isOwnProfile = true,
  connectionCount = 0,
  mutualConnections = 0
}: ProfileCoverProps) {
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [coverImage, setCoverImage] = useState(profile.cover_image);

  const initials = profile.full_name
    ? profile.full_name.split(' ').map(name => name[0]).join('').toUpperCase()
    : userEmail?.charAt(0).toUpperCase() || '?';

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-48 sm:h-64 lg:h-72 overflow-hidden rounded-t-xl"
      >
        {coverImage ? (
          <img 
            src={coverImage} 
            alt="Profile cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Cover Edit Button */}
        {isOwnProfile && (
          <div className="absolute top-4 right-4">
            <Button
              size="sm"
              variant="secondary"
              className="bg-black/50 text-white border-0 backdrop-blur-sm hover:bg-black/70"
              onClick={() => setIsEditingCover(true)}
            >
              <Camera className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
              id="cover-upload"
            />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* Profile Info Section */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative -mt-16 mb-4"
        >
          <div className="relative inline-block">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background shadow-xl">
              <AvatarImage 
                src={profile.avatar_url} 
                alt={profile.full_name || 'Profile picture'} 
              />
              <AvatarFallback className="text-xl sm:text-2xl font-bold bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            {isOwnProfile && (
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 shadow-lg"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Name and Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {profile.full_name || userEmail}
                </h1>
                {profile.status === 'verified' && (
                  <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Verified Alumni
                  </Badge>
                )}
              </div>
              
              {profile.username && (
                <p className="text-muted-foreground">@{profile.username}</p>
              )}

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {profile.company && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{profile.company}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.joined_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(profile.joined_date).getFullYear()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {isOwnProfile ? (
                <>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Connect
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              {profile.bio}
            </p>
          )}

          {/* Connection Stats */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{connectionCount}</span>
              <span className="text-muted-foreground">connections</span>
            </div>
            {!isOwnProfile && mutualConnections > 0 && (
              <div className="text-sm text-muted-foreground">
                {mutualConnections} mutual connections
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}