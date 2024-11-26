'use client'
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  role: string;
  status: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));

    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data.roles.map((role: any) => role.name)));
  }, []);

  const saveUser = async (user: User) => {
    const method = user.id ? "PUT" : "POST";
    const url = user.id ? `/api/users/${user.id}` : "/api/users";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));

    setEditingUser(null);
  };

  const deleteUser = async (id: number) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  };

  return (
    <div>
      <h2>User Management</h2>
      <button onClick={() => setEditingUser({ id: 0, name: "", role: roles[0], status: "Active" })}>
        Add User
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUser(editingUser);
          }}
        >
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            placeholder="Name"
          />
          <select
            value={editingUser.role}
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            value={editingUser.status}
            onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;
