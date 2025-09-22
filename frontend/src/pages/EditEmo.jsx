import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeById, useUpdateEmployee } from "../employee";
import { toast } from "react-toastify";

const EditEmployee = () => {
  const { id } = useParams(); // employee ID
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const { data: user, isLoading, error } = useEmployeeById(id);
  const updateMutation = useUpdateEmployee(id);

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.employee.fullName,
        email: user.employee.email,
        role: user.employee.role,
      });
    }
  }, [user]);

  const onSubmit = (data) => {
    updateMutation.mutate(data, {
      onSuccess: () => navigate(`/emp/${id}`),
    });
    toast.success("Edit is successfully");
  };

  if (isLoading) return <p>Loading employee data...</p>;
  if (error) return <p>Error loading employee</p>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Edit Employee</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("fullName", { required: true })}
          placeholder="Full Name"
          className="border p-2 rounded"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          {...register("role", { required: true })}
          placeholder="Role"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={updateMutation.isLoading}
        >
          {updateMutation.isLoading ? "Updating..." : "Update"}
        </button>
      </form>

      {updateMutation.isError && (
        <p className="text-red-500 mt-2">{updateMutation.error.message}</p>
      )}
    </div>
  );
};

export default EditEmployee;
