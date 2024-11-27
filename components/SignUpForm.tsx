"use client";
// Imports
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

//Zod Schema
const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

// typedefs
type FormData = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/user", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        alert("Sign Up Successful!");
        console.log(response.data);
        form.reset();
        window.location.href = "/log-in";
      } else {
        toast({
          title: "Error",
          description: `Sign Up failed: ${response.data.message || "Unknown error"}`,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast({
        title: "Error",
        description: "An error occurred while signing up.",
        variant: "destructive",
      })
      alert(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="w-full p-8 sm:p-10 md:p-12 lg:p-14 backdrop-blur-md bg-white/20 rounded-lg shadow-lg border border-white/30 border-white">
      <div className="text-center">    
        <span className="relative font-bold text-3xl text-white">
          <span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1 bottom-0 w-full h-2 bg-blue-500"
            aria-hidden="true"
          ></span>
          <span className="z-2 relative">Sign Up</span>
        </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-gray-600 hover:border-blue-600 hover:border-2"
                        placeholder="Debajoti Chakraborty"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-gray-600 hover:border-blue-600 hover:border-2"
                        type="email"
                        placeholder="dev.debuc@gmail.com"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white text-gray-600 hover:border-blue-600 hover:border-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-Enter your password"
                        type="password"
                        className="bg-white text-gray-600 hover:border-blue-600 hover:border-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
