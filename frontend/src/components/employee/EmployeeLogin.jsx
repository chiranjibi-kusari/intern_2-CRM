import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEmployeeLogin } from "../../employee";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: useEmployeeLogin,
    onSuccess: (data) => {
      localStorage.setItem("employeeToken", data.token);
      alert("Employee logged in successfully!");
      navigate("/employeeDashboard");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Employee login failed");
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Employee Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeLogin;
