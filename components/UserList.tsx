"use client"
import React, { useEffect, useState } from "react";
import { UserTable } from "./UserTable";
import {Bars} from 'react-loader-spinner'

const UsersList = ({ currentUserEmail, currentUserRole, currentUserPermisions}: { currentUserEmail: string; currentUserRole: string , currentUserPermisions: string[]}) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/getUser?role=${encodeURIComponent(currentUserRole)}&email=${encodeURIComponent(currentUserEmail)}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch users");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserEmail, currentUserRole]);

  if (loading) return <div className="flex justify-center"><Bars
  height="50"
  width="50"
  color="#60a5fa"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /></div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        <UserTable users={users} roles={currentUserRole} permissions={currentUserPermisions}/>
      </div>
    </div>
  );
};

export default UsersList;
