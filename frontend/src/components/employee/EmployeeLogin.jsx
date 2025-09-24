import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authslice";
import { toast } from "react-toastify";
const EmployeeLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://192.168.10.102:8080/api/v1/auth/employee-login",
        data
      );
      console.log(data);

      const token = response.data.token || response.data.accessToken;
      const role = response.data.role;
      localStorage.setItem("token", token);
      dispatch(loginSuccess({ token, role }));
      toast.success("Login successfully!");

      navigate("/employeeDashboard");
    } catch (error) {
      if (error.response) {
        setError("root", { message: error.response.data.message });
      } else {
        setError("root", { message: "Network error. Try again later." });
      }
      toast.error(error?.response?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        {/*//password*/}
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {errors.root && (
          <p className="text-red-500 text-sm text-center">
            {errors.root.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
export default EmployeeLogin;
