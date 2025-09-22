import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { data, Link } from "react-router-dom";
import { useEmployees, useDeleteEmployee } from "../employee";
import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmBox from "../components/ConformBox";

const ViewEmployees = () => {
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);
  const { data: employees, isLoading, error } = useEmployees();
  const deleteEmployee = useDeleteEmployee();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;
  const handleDelete = () => {
    deleteEmployee.mutate(employees.employees.id);
    setShowConfirm(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.employees.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50 border-b">
              <td className="p-2 border">{u.fullName}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border flex gap-2">
                <Link
                  to={`/emp/${u.id}`}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  View
                </Link>
                <Link
                  to={`/emp/${u.id}/edit`}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteEmployee.mutate(u.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                {showConfirm && (
                  <ConfirmBox
                    title="Confirm Delete"
                    message={`Are you sure you want to delete ${u.fullName}?`}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ViewEmployees;
