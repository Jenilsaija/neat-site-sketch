import React from 'react';
import TeamMember from '@/components/TeamMember';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamMember as TeamMemberType } from '@/data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

interface TeamProps {
  user: {
    name: string;
    avatar: string;
  };
  members: TeamMemberType[];
}

const Team = ({ user, members }: TeamProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">Team</h1>
      </div>
      
      <div className="mt-6">
        <Tabs defaultValue="all">
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'} mb-6`}>
            <TabsList className={`${isMobile ? 'w-full' : ''}`}>
              <TabsTrigger value="all" className="text-xs md:text-sm">ALL ({members.length})</TabsTrigger>
              <TabsTrigger value="in-house" className="text-xs md:text-sm">IN-HOUSE ({members.filter(m => m.type === 'in-house').length})</TabsTrigger>
              <TabsTrigger value="remote" className="text-xs md:text-sm">REMOTE ({members.filter(m => m.type === 'remote').length})</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-3 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search a member" 
                className="px-4 py-2 border border-border rounded-lg text-sm w-full md:w-auto"
              />
            </div>
          </div>
          
          <TabsContent value="all">
            <div className={`grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 md:gap-6`}>
              {members.map((member) => (
                <TeamMember key={member.id} {...member} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-house">
            <div className={`grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 md:gap-6`}>
              {members
                .filter(m => m.type === 'in-house')
                .map((member) => (
                  <TeamMember key={member.id} {...member} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="remote">
            <div className={`grid ${isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 md:gap-6`}>
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
