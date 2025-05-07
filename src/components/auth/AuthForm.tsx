
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Github, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useIsMobile } from "@/hooks/use-mobile";

type AuthFormProps = {
  mode: "login" | "register" | "forgot-password";
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const isMobile = useIsMobile();
  
  // Create validation schema based on mode
  const formSchema = z.object({
    ...(mode === "register" ? { name: z.string().min(2, "Name is required") } : {}),
    ...(mode !== "forgot-password" ? { 
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters")
    } : {
      email: z.string().email("Invalid email address")
    }),
  });

  // Define form with validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(mode === "register" ? { name: "" } : {}),
      email: "",
      ...(mode !== "forgot-password" ? { password: "" } : {})
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    // In a real implementation, this would connect to authentication APIs
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
          {mode === "login" ? "Welcome back" : mode === "register" ? "Create an account" : "Reset password"}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : mode === "register" 
            ? "Enter your details to create your account"
            : "Enter your email to reset your password"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {mode !== "forgot-password" && (
            <>
              {mode === "register" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {mode === "forgot-password" && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full mt-2">
            {mode === "login" ? "Sign in" : mode === "register" ? "Sign up" : "Reset password"}
          </Button>
        </form>
      </Form>

      {(mode === "login" || mode === "register") && (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
            <Button variant="outline" type="button" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
