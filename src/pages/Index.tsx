
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Redirect to dashboard
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-4`}>Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
