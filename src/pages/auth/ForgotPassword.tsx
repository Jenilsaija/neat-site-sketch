
import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md space-y-4">
        <AuthForm mode="forgot-password" />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
