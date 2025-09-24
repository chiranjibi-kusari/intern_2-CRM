import { useForm } from "react-hook-form";
import { useAddEmployee } from "../employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { roles } from "../api";
import { toast } from "react-toastify";

const RegisterEmployee = () => {
  const { register, handleSubmit, reset, errors } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addEmployee = useAddEmployee();

  const onSubmit = (data) => {
    addEmployee.mutate(data);
    localStorage.setItem("role", data.role);

    console.log(data.role);
    reset();
    toast.success("user Register successfully!");
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Register Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <input
          {...register("fullName", { required: true })}
          placeholder="FullName"
          className="w-full p-2 border rounded"
        />
        {/*<input
          {...register("role", { required: "role is required" })}
          placeholder="role"
          className="w-full p-2 border rounded"
        />*/}
        <select
          {...register("role", { required: "Role is required" })}
          className="w-full p-2 border rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Select role
          </option>
          {roles.map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>

        <input
          {...register("email", { required: "email is required" })}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("password", { required: "password is required" })}
          type="Password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={addEmployee.isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {addEmployee.isLoading ? "Saving..." : "Register"}
        </button>
        {addEmployee.isError && (
          <p className="text-red-500">Error: {addEmployee.error.message}</p>
        )}
      </form>
    </div>
  );
};
export default RegisterEmployee;
