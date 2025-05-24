
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Camera } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfilePageProps {
  user: {
    name: string;
    avatar: string;
    email?: string;
    role?: string;
    phone?: string;
    location?: string;
  };
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const isMobile = useIsMobile();
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="container max-w-4xl mx-auto p-4 md:py-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Profile Settings</h1>
      </div>
      
      <div className="grid gap-6 md:gap-8">
        <Card>
          <CardHeader className={`${isMobile ? 'text-center' : 'flex-row items-center gap-4'} space-y-0`}>
            <div className={`relative ${isMobile ? 'mx-auto mb-4' : 'mb-0'}`}>
              <Avatar className="h-20 w-20 md:h-24 md:w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline" 
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 md:w-10 md:h-10"
              >
                <Camera className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
            <div className={`${isMobile ? 'text-center' : ''}`}>
              <h2 className="text-xl md:text-2xl font-semibold">{user.name}</h2>
              {user.role && <p className="text-muted-foreground text-sm md:text-base mt-1">{user.role}</p>}
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue={user.email || "user@example.com"} className="pl-10" />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" defaultValue={user.phone || "+1 (555) 123-4567"} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="location" defaultValue={user.location || "San Francisco, CA"} className="pl-10" />
                </div>
              </div>
            </div>
            
            <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'justify-end'} pt-4`}>
              <Button variant="outline" className={`${isMobile ? 'w-full' : ''}`}>
                Cancel
              </Button>
              <Button className={`${isMobile ? 'w-full' : ''}`}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
