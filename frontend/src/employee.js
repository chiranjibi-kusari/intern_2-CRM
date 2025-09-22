import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

// Fetch all users
//export const useEmployees = (pageNumber = 1, pageSize = 2) => {
//  return useQuery({
//    queryKey: ["user", pageNumber, pageSize],
//    queryFn: async () => {
//      const response = await api.get("/admin/employeeList", {
//        params: {
//          pageNumber: pageNumber - 1, // backend is 0-based
//          pageSize,
//        },
//      });
//      return response.data; // should include: content, totalPages, totalElements, pageable
//    },
//    keepPreviousData: true,
//  });
//};

export const useEmployees = (pageNumber, pageSize) => {
  return useQuery({
    queryKey: ["user", pageNumber, pageSize],
    queryFn: async () => {
      const response = await api.get(
        `/admin/employeeList?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });
};

//register
export const useAddEmployee = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newEmployee) => {
      const { data } = await api.post("/admin/employee/register", newEmployee);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// Fetch single user by ID
export const useEmployeeById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await api.get(`/admin/employee/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Update user

export const useUpdateEmployee = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedUser) => {
      const token = localStorage.getItem("token");
      const { data } = await api.put(`/admin/${id}`, updatedUser);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["employee", id]),
  });
};

// Delete user

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/admin/delete/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["employees"]),
  });
};


