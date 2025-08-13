import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Profile {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  status?: string | null;
}

interface ProfileHeaderProps {
  profile: Profile | null;
  userEmail?: string;
  isOwnProfile?: boolean;
}

export function ProfileHeader({ profile, userEmail, isOwnProfile = true }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 rounded-t-xl" />
      
      <Card className="relative -mt-16 mx-4">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative"
            >
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage 
                  src={profile?.avatar_url || ""} 
                  alt={`${profile?.full_name || "User"} avatar`} 
                />
                <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                  {profile?.full_name?.[0] || userEmail?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 shadow-lg"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">
                    {profile?.full_name || userEmail}
                  </h1>
                  {profile?.status && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {profile.status}
                    </Badge>
                  )}
                </div>
                
                {profile?.username && (
                  <p className="text-muted-foreground">@{profile.username}</p>
                )}
                
                {profile?.bio && (
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {profile.bio}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Privacy Settings
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}