"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { User } from "next-auth";
import { Link, UserPen } from "lucide-react";
import { Button } from "./ui/button";



export function UserTable({users, roles} : any) {
    // console.log(users)
    // console.log(roles)
  return (
    <div className="rounded-md border">
      <Table>
      <TableHeader>
        <TableRow className="text-center items-center justify-center align-middle bg-gray-900">
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Role</TableHead>
          <TableHead className="text-center">Permissions</TableHead>
          <TableHead className="text-center">Status</TableHead>
          {roles === "ADMIN" && (<TableHead className="text-center">Actions</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 && users?.map((user: User) => (
          <TableRow key={user.id} className="text-center">
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.permissions.join(", ")}</TableCell>
            <TableCell>{user.status}</TableCell>
            {roles === "ADMIN" && (<TableCell><Button><UserPen/></Button></TableCell>)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
