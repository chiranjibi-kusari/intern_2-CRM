import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

export default function CreatePackages() {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      displayName: "",
      origin: "",
      destination: "",
      description: "",
      packageName: "",
      packageType: "",
      packageDuration: "",
      packagePrice: "",
      discount: "",
      inclusions: {
        flights: "",
        accommodation: "",
        meals: "",
        cityTours: "",
      },
      exclusions: {
        visaFee: "",
        personalExpenses: "",
      },
      itinerary: [{ day: "" }],
    },
  });

  // For dynamic itinerary
  const { fields: itineraryFields, append: addItinerary } = useFieldArray({
    control,
    name: "itinerary",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data);

    // Append single file
    if (data.packageImage && data.packageImage[0]) {
      formData.append("packageImage", data.packageImage[0]);
    }

    // Append all text fields
    formData.append("displayName", data.displayName);
    formData.append("origin", data.origin);
    formData.append("destination", data.destination);
    formData.append("description", data.description);
    formData.append("packageName", data.packageName);
    formData.append("packageType", data.packageType);
    formData.append("packageDuration", data.packageDuration);
    formData.append("packagePrice", data.packagePrice);
    formData.append("discount", data.discount);

    // Append nested fields
    formData.append("inclusions", JSON.stringify(data.inclusions));
    formData.append("exclusions", JSON.stringify(data.exclusions));
    formData.append("itinerary", JSON.stringify(data.itinerary));

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://192.168.10.102:8080/api/v1/tour-package/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Package Created:", response.data);
      reset();
    } catch (error) {
      console.error("Error submitting package:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Create Package</h2>

      {/* Basic Info */}
      <input
        type="text"
        placeholder="Display Name"
        {...register("displayName")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Origin"
        {...register("origin")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Destination"
        {...register("destination")}
        className="border p-2 rounded w-full"
      />

      {/* Package Image */}
      <input
        type="file"
        {...register("packageImage")}
        onChange={(e) =>
          setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
      />
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="w-40 mt-2 rounded" />
      )}

      <textarea
        placeholder="Description"
        {...register("description")}
        className="border p-2 rounded w-full"
      />

      {/* Package Overview */}
      <input
        type="text"
        placeholder="Package Name"
        {...register("packageName")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Package Type"
        {...register("packageType")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Package Duration"
        {...register("packageDuration")}
        className="border p-2 rounded w-full"
      />
      <input
        type="number"
        placeholder="Package Price"
        {...register("packagePrice")}
        className="border p-2 rounded w-full"
      />
      <input
        type="number"
        placeholder="Discount"
        {...register("discount")}
        className="border p-2 rounded w-full"
      />

      {/* Inclusions */}
      <h3 className="font-semibold">Package Inclusion</h3>
      <input
        type="text"
        placeholder="Flights"
        {...register("inclusions.flights")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Accommodation"
        {...register("inclusions.accommodation")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Meals"
        {...register("inclusions.meals")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="City Tours"
        {...register("inclusions.cityTours")}
        className="border p-2 rounded w-full"
      />

      {/* Exclusions */}
      <h3 className="font-semibold">Package Exclusion</h3>
      <input
        type="text"
        placeholder="Visa Fee"
        {...register("exclusions.visaFee")}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Personal Expenses"
        {...register("exclusions.personalExpenses")}
        className="border p-2 rounded w-full"
      />

      {/* Itinerary */}
      <h3 className="font-semibold">Package Itinerary</h3>
      {itineraryFields.map((item, index) => (
        <input
          key={item.id}
          type="text"
          placeholder={`Day ${index + 1}`}
          {...register(`itinerary.${index}.day`)}
          className="border p-2 rounded w-full"
        />
      ))}
      <button
        type="button"
        onClick={() => addItinerary({ day: "" })}
        className="bg-gray-300 p-2 rounded"
      >
        + Add Day
      </button>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Create Package
      </button>
    </form>
  );
}
