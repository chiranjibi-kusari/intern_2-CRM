import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { data, Link } from "react-router-dom";
import { useEmployees, useDeleteEmployee } from "../employee";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewEmployees = () => {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const {
    data: employees,
    isLoading,
    error,
  } = useEmployees(pageNumber, pageSize);
  const deleteEmployee = useDeleteEmployee();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  const totalPages = employees.totalPages;
  console.log(totalPages);

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-4 flex items-center justify-center gap-4">
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1, pageSize)}
          className="bg-green-500 text-white px-3 py-2 rounded-xl hover:text-black"
        >
          Prev
        </button>
        <h1>{pageNumber}</h1>
        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
          className="bg-green-500 text-white px-3 py-2 rounded-xl hover:text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ViewEmployees;
