import { useForm, useFieldArray } from "react-hook-form";
import { useAddPackage, usePackageById, useUpdatePackage } from "../../package";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CreatePackage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data } = usePackageById(id);

  //const validationSchema = Yup.object().shape({
  //  displayName: Yup.string()
  //    .required("Display Name is required")
  //    .min(3, "Display Name must be at least 3 characters"),
  //  fromCountry: Yup.string().required("Origin location is required"),
  //  destinationCountry: Yup.string().required("Destination is required"),

  //  //packageImage: Yup.mixed()
  //  //  .required("Package image is required")
  //  //  .test("fileSize", "File size must be less than 2MB", (value) => {
  //  //    return value && value[0] && value[0].size <= 2000000;
  //  //  })
  //  //  .test("fileType", "Only JPG/PNG files are allowed", (value) => {
  //  //    return (
  //  //      value &&
  //  //      value[0] &&
  //  //      ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
  //  //    );
  //  //  }),

  //  description: Yup.string().nullable(),

  //  packageName: Yup.string(),
  //  packageType: Yup.string(),
  //  duration: Yup.string(),

  //  packagePrice: Yup.number()
  //    .typeError("Package price must be a number")
  //    .min(0, "Price cannot be negative"),
  //  discount: Yup.number()
  //    .typeError("Discount must be a number")
  //    .min(0, "Discount cannot be negative")
  //    .default(0),

  //  packageInclusion: Yup.array().of(
  //    Yup.object().shape({
  //      key: Yup.string(),
  //      value: Yup.string(),
  //    })
  //  ),

  //  packageExclusion: Yup.array().of(
  //    Yup.object().shape({
  //      key: Yup.string(),
  //      value: Yup.string(),
  //    })
  //  ),

  //  packageItinerary: Yup.array().of(
  //    Yup.object().shape({
  //      day: Yup.string(),
  //      plan: Yup.string(),
  //    })
  //  ),
  //});
  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm({
    //resolver: yupResolver(validationSchema),
    defaultValues: {
      packageInclusion: [{ key: "Flights", value: "" }],
      packageExclusion: [{ key: "Visa Fee", value: "" }],
      packageItinerary: [{ day: "Day 1", plan: "" }],
      packagePrice: 0,
      discount: 0,
      packageImage: null,
    },
  });

  useEffect(() => {
    if (data?.tourPackage) {
      reset({
        displayName: data.tourPackage.displayName,
        fromCountry: data.tourPackage.fromCountry,
        destinationCountry: data.tourPackage.destinationCountry,
        description: data.tourPackage.description,
        packageName: data.tourPackage.packageName,
        packageType: data.tourPackage.packageType,
        duration: data.tourPackage.duration,
        packagePrice: data.tourPackage.packagePrice,
        discount: data.tourPackage.discount,
        packageInclusion: data.tourPackage.packageInclusion || [
          { key: "Flights", value: "" },
        ],
        packageExclusion: data.tourPackage.packageExclusion || [
          { key: "Visa Fee", value: "" },
        ],
        packageItinerary: data.tourPackage.packageItinerary || [
          { day: "Day 1", plan: "" },
        ],
      });

      setPreview(data.tourPackage.packageImageUrl); // show existing image
    }
  }, [data, reset]);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      console.log("Selected file:", file);
    }
  };

  // Dynamic fields
  const { fields: inclusions, append: addInclusion } = useFieldArray({
    control,
    name: "packageInclusion",
  });

  const { fields: exclusions, append: addExclusion } = useFieldArray({
    control,
    name: "packageExclusion",
  });

  const { fields: itineraries, append: addItinerary } = useFieldArray({
    control,
    name: "packageItinerary",
  });

  //const onSubmit = (data) => {
  //  addPackage.mutate(data, {
  //    onSuccess: () => {
  //      toast.success("Package created successfully!"); // only on success
  //      reset(); // reset form on success
  //      setPreview(null); // clear image preview
  //    },
  //    onError: (error) => {
  //      toast.error("Failed to create package");
  //      console.err or(error);
  //    },
  //  });
  //};

  const addPackage = useAddPackage();
  const updatePackage = useUpdatePackage();

  //const onSubmit = (formData) => {
  //  if (id) {
  //    // Edit mode
  //    updatePackage.mutate(
  //      { id, updatedData: formData },

  //      {
  //        onSuccess: () => {
  //          toast.success("Package updated successfully!");
  //          navigate(`/tour-package/${id}`);
  //        },

  //        onError: () => {
  //          toast.error("Failed to update package");
  //        },
  //      }
  //    );
  //  } else {
  //    // Create mode
  //    addPackage.mutate(formData, {
  //      onSuccess: () => {
  //        toast.success("Package created successfully!");
  //        reset();
  //        setPreview(null);
  //      },
  //      onError: () => {
  //        toast.error("Failed to create package");
  //      },
  //    });
  //  }
  //};

  const onSubmit = (formData) => {
    console.log("onSubmit received:", formData);
    if (id) {
      console.log("Running in UPDATE mode");
      updatePackage.mutate(
        { id, updatedData: formData },
        {
          onSuccess: () => {
            toast.success("Package updated successfully!");
            navigate(`/tour-package/${id}`);
          },
          onError: (error) => {
            console.error("Update failed:", error.response || error.message);
            toast.error("Failed to update package");
          },
        }
      );
    } else {
      // CREATE
      addPackage.mutate(formData, {
        onSuccess: () => {
          toast.success("Package created successfully!");
          reset();
          setPreview(null);
        },
        onError: (error) => {
          console.error("Create failed:", error.response || error.message);
          toast.error("Failed to create package");
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="p-6 space-y-6 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Create Package</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="block font-medium text-sm">Display Name</label>
          <input
            {...register("displayName", {
              required: "Display Name is required",
            })}
            placeholder="Enter Display Name"
            className="border p-2 rounded-xl"
          />
          {errors.displayName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.displayName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="block font-medium text-sm">Origin (from)</label>
          <input
            {...register("fromCountry", {
              required: "Origin Location is required",
            })}
            placeholder="Enter Origin Location"
            className="border p-2 rounded-xl"
          />
          {errors.fromCountry && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fromCountry.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block font-medium text-sm">Destination (to)</label>
          <input
            {...register("destinationCountry", {
              required: "Destination is required",
            })}
            placeholder="Enter Destination Location"
            className="border p-2 rounded-xl"
          />
          {errors.destinationCountry && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destinationCountry.message}
            </p>
          )}
        </div>
      </div>

      {/* Image Upload + Description */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-sm">Package Image</label>
          {/*
          <input
            type="file"
            accept="image/*"
            {...register("packageImage", {
              required: "Package image is required",
              onChange: (e) => {
                const file = e.target.files?.[0];

                if (file) setPreview(URL.createObjectURL(file));
              },
            })}
          />*/}

          <input
            type="file"
            accept="image/*"
            {...register("packageImage", {
              required: id ? false : "Package image is required", // ✅ Only required when creating
              onChange: (e) => {
                const file = e.target.files?.[0];
                if (file) setPreview(URL.createObjectURL(file));
              },
            })}
          />

          {errors.packageImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.packageImage.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium text-sm">
            Package Image (Display)
          </label>

          <div className="border rounded h-32 flex items-center justify-center text-gray-500">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : (
              "🖼 "
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="block font-medium text-sm">Description</label>
        <textarea
          {...register("description")}
          placeholder="A clear, descriptive name for package"
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Package Overview */}
      <h3 className="font-bold">Package Overview</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="block font-medium text-sm">Package Name</label>
          <input
            {...register("packageName")}
            placeholder="Enter Package Name"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block font-medium text-sm">Package Type</label>
          <input
            {...register("packageType")}
            placeholder="Enter Package Type"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block font-medium text-sm">Package Duration</label>
          <input
            {...register("duration")}
            placeholder="Enter Package Duration"
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block font-medium text-sm">Package Price</label>
          <input
            type="number"
            {...register("packagePrice", { valueAsNumber: true })}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block font-medium text-sm">
            Package Discount (if any)
          </label>
          <input
            type="number"
            {...register("discount", { valueAsNumber: true })}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Package Inclusions */}
      <h3 className="font-bold">Package Inclusion</h3>
      {inclusions.map((field, index) => (
        <div key={field.id} className="grid grid-cols-2 gap-4 mb-2">
          {/*<div className="flex flex-col gap-2">
            <input
              {...register(`packageInclusion.${index}.key`)}
              placeholder="Inclusion Name"
              className="border p-2 rounded"
            />
            <input
              {...register(`packageInclusion.${index}.value`)}
              placeholder="Enter Details"
              className="border p-2 rounded"
            />
          </div>*/}
          <input
            {...register(`packageInclusion.${index}.key`)}
            placeholder="Inclusion Name"
            className="border p-2 rounded"
          />
          <input
            {...register(`packageInclusion.${index}.value`)}
            placeholder="Enter Details"
            className="border p-2 rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => addInclusion({ key: "", value: "" })}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        +
      </button>

      {/* Package Exclusions */}
      <h3 className="font-bold">Package Exclusion</h3>
      {exclusions.map((field, index) => (
        <div key={field.id} className="grid grid-cols-2 gap-4 mb-2">
          <input
            {...register(`packageExclusion.${index}.key`)}
            placeholder="Exclusion Name"
            className="border p-2 rounded"
          />
          <input
            {...register(`packageExclusion.${index}.value`)}
            placeholder="Enter Details"
            className="border p-2 rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => addExclusion({ key: "", value: "" })}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        +
      </button>

      {/* Package Itinerary */}
      <h3 className="font-bold">Package Itinerary</h3>
      {itineraries.map((field, index) => (
        <div key={field.id} className="grid grid-cols-2 gap-4 mb-8">
          <input
            {...register(`packageItinerary.${index}.day`)}
            placeholder="Day (e.g. Day 1)"
            className="border p-2 rounded"
          />
          <input
            {...register(`packageItinerary.${index}.plan`)}
            placeholder="Plan (e.g. City Tour)"
            className="border p-2 rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItinerary({ day: "", plan: "" })}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        +
      </button>

      {/* Submit */}
      {/*<div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Create Package
        </button>
      </div>*/}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded text-center mt-10"
      >
        {id ? "Update Package" : "Create Package"}
      </button>
    </form>
  );
};

export default CreatePackage;
