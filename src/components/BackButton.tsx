
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface BackButtonProps {
  className?: string;
  variant?: 'ghost' | 'outline' | 'default';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const BackButton: React.FC<BackButtonProps> = ({ 
  className = '', 
  variant = 'ghost', 
  size = 'icon' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, go to home
      navigate('/');
    }
  };

  // Don't show back button on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBack}
      className={`${isMobile ? 'touch-button' : ''} ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft size={isMobile ? 20 : 18} />
    </Button>
  );
};

export default BackButton;
