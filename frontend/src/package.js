import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import api from "./api";

// Get all packages
export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await api.get("/tour-package/allPackages");
      return response.data;
    },
  });
};

// Add a package
export const useAddPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      console.log("Raw data from form:", data);
      console.log("packageImage raw data:", data.packageImage);

      const formData = new FormData();

      // Basic fields
      const basicFields = {
        destinationCountry: data.destinationCountry,
        packageName: data.packageName,
        duration: data.duration,
        packagePrice: data.packagePrice,
        discount: data.discount,
        displayName: data.displayName,
        description: data.description,
        packageType: data.packageType,
        fromCountry: data.fromCountry,
      };

      Object.entries(basicFields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // File handling
      const file = data.packageImage?.[0]; // optional chaining
      console.log(file);

      if (!file) {
        console.error("No image selected");
        return;
      }
      formData.append("packageImage", file);

      // Package Inclusion
      if (data.packageInclusion && typeof data.packageInclusion === "object") {
        Object.entries(data.packageInclusion).forEach(([key, value]) => {
          formData.append(`packageInclusion[${key}]`, value);
        });
      }

      // Package Exclusion
      if (data.packageExclusion && typeof data.packageExclusion === "object") {
        Object.entries(data.packageExclusion).forEach(([key, value]) => {
          formData.append(`packageExclusion[${key}]`, value);
        });
      }

      // Package Itinerary
      if (data.packageItinerary && typeof data.packageItinerary === "object") {
        Object.entries(data.packageItinerary).forEach(([day, desc]) => {
          formData.append(`packageItinerary[${day}]`, desc);
        });
      }

      // Debug FormData
      console.log("FormData Content:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const res = await api.post("/tour-package/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["packages"]),
  });
};

// Get package by ID
export const usePackageById = (id) => {
  return useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const response = await api.get(`/tour-package/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Update package
//export const useUpdatePackage = (id) => {
//  const queryClient = useQueryClient();

//  return useMutation({
//    mutationFn: async (updatedData) => {
//      const { data } = await api.put(
//        `/tour-package/updatePackage/${id}`,
//        updatedData
//      );

//      return data;
//    },
//    onSuccess: () => queryClient.invalidateQueries(["package", id]),
//  });
//};
      
export const useUpdatePackage = () => {
  const queryClient = useQueryClient(); 
  
  return useMutation({ 
    mutationFn: async ({ id, updatedData }) => {
      console.log("Mutation running with:", { id, updatedData });

      // Safety check
      if (!updatedData || typeof updatedData !== "object") {
        throw new Error("Invalid updatedData provided.");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        throw new Error("Authentication token missing.");
      } 

      const formData = new FormData();

      // Dynamically build FormData
      Object.keys(updatedData).forEach((key) => {
        const value = updatedData[key];
        if (value === null || value === undefined || value === "") return;

        if (key === "packageImage") {
          // Only add image if new file selected
          if (value instanceof File) {
            formData.append(key, value);
          } else if (Array.isArray(value) && value[0]) {
            formData.append(key, value[0]);
          }
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      // Debugging
      for (let [k, v] of formData.entries()) {
        console.log("FormData Entry:", k, v);
      }

      console.log("Token being sent:", token);

      const res = await api.put(`/tour-package/updatePackage/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["package", id]);
    },
  });
};

// Delete package
export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/tour-package/deletePackage/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["packages"]),
  });
};
