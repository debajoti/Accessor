"use client";

import * as React from "react";
import axios from "axios";
import { DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserEditDrawer({ user, onUpdate, onClose }: any) {
  const isNewUser = !user;
  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "USER", 
    permissions: user?.permissions || [],
    status: user?.status || "ACTIVE", 
    password: process.env.DEFAULT_PASSWORD || "", 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handlePermissionChange = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p: string) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNewUser) {
        const response = await axios.post(`/api/user`, formData);
        console.log("New user created:", response.data);
      } else {
        const response = await axios.put(`/api/updateUser`, {
          ...formData,
          id: user.id,
        });
        console.log("User updated:", response.data);
      }
      onUpdate();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DrawerContent className="p-10 pt-20">
      <DrawerHeader>
        <DrawerTitle>{isNewUser ? "Add New User" : "Edit User"}</DrawerTitle>
      </DrawerHeader>
      <form className="p-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {isNewUser && (
          <div>
            <Label htmlFor="password">Default Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter a default password"
            />
          </div>
        )}

        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleSelectChange("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Permissions</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {["READ", "CREATE", "DELETE", "UPDATE"].map((permission) => (
              <Button
                key={permission}
                variant={
                  formData.permissions.includes(permission)
                    ? "default"
                    : "outline"
                }
                onClick={(e) => {
                  e.preventDefault();
                  handlePermissionChange(permission);
                }}
              >
                {permission}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end space-x-4">
          <DrawerClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DrawerClose>
          <Button type="submit">{isNewUser ? "Create User" : "Save Changes"}</Button>
        </div>
      </form>
    </DrawerContent>
  );
}
