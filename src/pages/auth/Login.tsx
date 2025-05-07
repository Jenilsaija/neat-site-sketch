
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Login = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} space-y-4`}>
        <AuthForm mode="login" />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          <Link to="/auth/forgot-password" className="text-primary hover:underline">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
