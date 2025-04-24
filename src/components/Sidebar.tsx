
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Grid2x2, 
  Users, 
  FileText, 
  MessageSquare, 
  Clock, 
  Settings, 
  MoreVertical 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen w-16 bg-app-blue flex flex-col items-center py-6 fixed left-0 top-0">
      <div className="mb-8">
        <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-app-blue rounded"></div>
        </div>
      </div>
      
      <div className="flex flex-col gap-6 items-center">
        <Link to="/" className="text-white p-2 rounded-md hover:bg-white/10">
          <Home size={20} />
        </Link>
        <Link to="/projects" className="text-white p-2 rounded-md hover:bg-white/10">
          <Grid2x2 size={20} />
        </Link>
        <Link to="/files" className="text-white p-2 rounded-md hover:bg-white/10">
          <FileText size={20} />
        </Link>
        <Link to="/messages" className="text-white p-2 rounded-md hover:bg-white/10">
          <MessageSquare size={20} />
        </Link>
        <Link to="/history" className="text-white p-2 rounded-md hover:bg-white/10">
          <Clock size={20} />
        </Link>
        <Link to="/team" className="text-white p-2 rounded-md hover:bg-white/10">
          <Users size={20} />
        </Link>
      </div>
      
      <div className="mt-auto flex flex-col gap-6 items-center">
        <Link to="/settings" className="text-white p-2 rounded-md hover:bg-white/10">
          <Settings size={20} />
        </Link>
        <button className="text-white p-2 rounded-md hover:bg-white/10">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
