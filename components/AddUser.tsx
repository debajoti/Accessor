"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { UserEditDrawer } from "./UserEditDrawer";

const AddUser = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);
  const handleUserCreated = () => {
    setDrawerOpen(false);
    console.log("User created successfully!");
  };

  return (
    <div>
      <Button onClick={handleOpenDrawer}>
        <PlusCircle /> Add User
      </Button>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <UserEditDrawer
          user={null}
          onUpdate={handleUserCreated}
          onClose={handleCloseDrawer}
        />
      </Drawer>
    </div>
  );
};

export default AddUser;
