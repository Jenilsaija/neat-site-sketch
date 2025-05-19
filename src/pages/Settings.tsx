
import React, { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Shield, Globe, Moon, Sun, User, Lock, Palette, Monitor, BellRing, Volume2, Mail } from "lucide-react";
import { currentUser } from '@/data/mockData';
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskAssigned: true,
    mentions: true,
    projectUpdates: false,
  });
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleSavePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  };

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex-1 p-6">
      <Header
        title="Settings"
        user={currentUser}
        notificationCount={3}
      />

      <div className="mt-6">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-4 md:w-[600px]">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield size={16} />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell size={16} />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette size={16} />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <p className="text-sm text-gray-500">Update your personal details and profile image</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-2">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="mt-2 flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue={currentUser.name.split(" ")[0]} className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue={currentUser.name.split(" ")[1] || ""} className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="alex.johnson@example.com" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Write a short bio about yourself" className="mt-1" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="role">Job Title</Label>
                          <Input id="role" defaultValue="Senior Project Manager" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Input id="department" defaultValue="Product Development" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, Country" className="mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Preferences</h3>
                  <p className="text-sm text-gray-500">Manage your language and timezone settings</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language" className="mt-1">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone" className="mt-1">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                          <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                          <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                          <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                          <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Password</h3>
                  <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="mt-1" />
                    </div>
                    <div className="mt-2 flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleSavePassword}>Update Password</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable 2FA</h4>
                      <p className="text-sm text-gray-500">Secure your account with two-factor authentication</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Sessions</h3>
                  <p className="text-sm text-gray-500">Manage your active sessions</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-4">
                        <Monitor className="text-gray-500" />
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-gray-500">Windows 11 • Chrome • New York, USA</p>
                        </div>
                      </div>
                      <Badge>Active Now</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-4">
                        <Monitor className="text-gray-500" />
                        <div>
                          <p className="font-medium">Previous Session</p>
                          <p className="text-sm text-gray-500">MacOS • Safari • San Francisco, USA</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Sign Out</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <p className="text-sm text-gray-500">Manage how and when you receive notifications</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Mail size={16} />
                      Email Notifications
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-tasks" className="flex items-center gap-2 cursor-pointer">
                          Task Assignments
                        </Label>
                        <Switch 
                          id="email-tasks" 
                          checked={notifications.taskAssigned}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, taskAssigned: checked})
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-mentions" className="flex items-center gap-2 cursor-pointer">
                          Mentions & Comments
                        </Label>
                        <Switch 
                          id="email-mentions" 
                          checked={notifications.mentions}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, mentions: checked})
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-updates" className="flex items-center gap-2 cursor-pointer">
                          Project Updates
                        </Label>
                        <Switch 
                          id="email-updates" 
                          checked={notifications.projectUpdates}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, projectUpdates: checked})
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <BellRing size={16} />
                      Push Notifications
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-all" className="flex items-center gap-2 cursor-pointer">
                          Enable Push Notifications
                        </Label>
                        <Switch 
                          id="push-all" 
                          checked={notifications.push}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, push: checked})
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-sound" className="flex items-center gap-2 cursor-pointer">
                          <Volume2 size={16} className="text-gray-500" />
                          Notification Sounds
                        </Label>
                        <Switch id="push-sound" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Notification Schedule</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <Label>Do Not Disturb Hours</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="dnd-start" className="text-sm text-gray-500">From</Label>
                          <Select>
                            <SelectTrigger id="dnd-start">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                              <SelectItem value="19:00">7:00 PM</SelectItem>
                              <SelectItem value="20:00">8:00 PM</SelectItem>
                              <SelectItem value="21:00">9:00 PM</SelectItem>
                              <SelectItem value="22:00">10:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="dnd-end" className="text-sm text-gray-500">To</Label>
                          <Select>
                            <SelectTrigger id="dnd-end">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="06:00">6:00 AM</SelectItem>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Theme & Display</h3>
                <p className="text-sm text-gray-500">Customize the visual appearance of your workspace</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Theme</Label>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      <div 
                        className={`border rounded-md p-4 cursor-pointer flex items-center justify-center flex-col gap-2 ${!darkMode ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => setDarkMode(false)}
                      >
                        <Sun size={24} />
                        <span>Light</span>
                      </div>
                      <div 
                        className={`border rounded-md p-4 cursor-pointer flex items-center justify-center flex-col gap-2 ${darkMode ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => setDarkMode(true)}
                      >
                        <Moon size={24} />
                        <span>Dark</span>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer flex items-center justify-center flex-col gap-2">
                        <Monitor size={24} />
                        <span>System</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">Color Scheme</Label>
                    <div className="mt-3 grid grid-cols-4 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-blue-500 cursor-pointer"></div>
                        <span className="text-sm">Blue</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-purple-500 cursor-pointer"></div>
                        <span className="text-sm">Purple</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-green-500 cursor-pointer"></div>
                        <span className="text-sm">Green</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-orange-500 cursor-pointer"></div>
                        <span className="text-sm">Orange</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">Layout Density</Label>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 cursor-pointer flex items-center justify-center">
                        <span>Compact</span>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer flex items-center justify-center border-primary bg-primary/5">
                        <span>Default</span>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer flex items-center justify-center">
                        <span>Comfortable</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
