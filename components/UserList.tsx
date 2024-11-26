"use client"
import React, { useEffect, useState } from "react";

const UsersList = ({ currentUserEmail, currentUserRole }: { currentUserEmail: string; currentUserRole: string }) => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users List (excluding you)</h2>
      <ul>
        {users.map((user: { id: number; email: string; name: string | null; role: string; status: string; permissions?: string[] }) => (
          <li key={user.id}>
            <strong>{user.name || "Unknown Name"}</strong> ({user.email}) - Role: {user.role}, Status: {user.status} {user.permissions ? `Permissions: ${user.permissions.join(", ")}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
