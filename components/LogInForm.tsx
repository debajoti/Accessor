"use client";
import React, { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormData = z.infer<typeof FormSchema>;

const LogInForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("user");
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formDataWithRole = { ...data, role: activeTab };
      console.log(formDataWithRole);
      const result = await signIn("credentials", {
        redirect: false,
        email: formDataWithRole.email,
        password: formDataWithRole.password,
        role: formDataWithRole.role.toUpperCase(),
      });
      
      if (result?.ok) {
        window.location.href = "/user";
        console.log("Logged in successfully");
        toast({
          title: "Success",
          description: "Logged in successfully",
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Error",
        description: "An error occurred while logging in.",
        variant: "destructive",
      })
    }
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="w-full p-8 sm:p-10 md:p-12 lg:p-14 backdrop-blur-md bg-white/20 rounded-lg shadow-lg border border-white/30">
        <div className="text-center">
          <span className="relative font-bold text-3xl text-white">
            <span
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1 bottom-0 w-full h-2 bg-blue-500"
              aria-hidden="true"
            ></span>
            <span className="z-2 relative">Log in</span>
          </span>
        </div>
        <Tabs
          defaultValue="user"
          className="xl:w-[400px] my-5"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="user"
              className="data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:border-blue-600 data-[state=active]:border-b-2"
            >
              User
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:border-blue-600 data-[state=active]:border-b-2"
            >
              Admin
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
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
            </div>
            <Button className="w-full mt-6" type="submit">
              Log in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LogInForm;
