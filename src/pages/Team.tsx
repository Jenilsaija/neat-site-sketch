
import React from 'react';
import Header from '@/components/Header';
import TeamMember from '@/components/TeamMember';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamMember as TeamMemberType } from '@/data/mockData';

interface TeamProps {
  user: {
    name: string;
    avatar: string;
  };
  members: TeamMemberType[];
}

const Team = ({ user, members }: TeamProps) => {
  return (
    <div className="flex-1 p-6">
      <Header 
        title="Team" 
        user={user} 
        notificationCount={3} 
      />
      
      <div className="mt-6">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">ALL ({members.length})</TabsTrigger>
              <TabsTrigger value="in-house">IN-HOUSE ({members.filter(m => m.type === 'in-house').length})</TabsTrigger>
              <TabsTrigger value="remote">REMOTE ({members.filter(m => m.type === 'remote').length})</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Search a member" 
                className="px-4 py-2 border border-border rounded-lg text-sm"
              />
            </div>
          </div>
          
          <TabsContent value="all">
            <div className="grid grid-cols-4 gap-6">
              {members.map((member) => (
                <TeamMember key={member.id} {...member} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-house">
            <div className="grid grid-cols-4 gap-6">
              {members
                .filter(m => m.type === 'in-house')
                .map((member) => (
                  <TeamMember key={member.id} {...member} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="remote">
            <div className="grid grid-cols-4 gap-6">
              {members
                .filter(m => m.type === 'remote')
                .map((member) => (
                  <TeamMember key={member.id} {...member} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Team;
