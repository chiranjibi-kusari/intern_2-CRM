//import { useState } from "react";
//import { usePackages, useDeletePackage } from "../../package";
//import { toast } from "react-toastify";

//const PackageList = () => {
//  const { data, isLoading, isError } = usePackages();
//  const deletePackage = useDeletePackage();

//  if (isLoading) return <p>Loading packages...</p>;
//  if (isError) return <p>Error loading packages.</p>;

//  const handleDelete = (id) => {
//    deletePackage.mutate(id, {
//      onSuccess: () => toast.success("Package deleted successfully!"),
//      onError: () => toast.error("Error deleting package"),
//    });
//  };

//  return (
//    <div>
//      <h1 className="text-2xl font-bold mb-4">Packages</h1>
//      <table className="w-full border">
//        <thead>
//          <tr className="bg-gray-200">
//            <th className="p-2 border">Name</th>
//            <th className="p-2 border">Country</th>
//            <th className="p-2 border">Price</th>
//            <th className="p-2 border">Actions</th>
//          </tr>
//        </thead>
//        <tbody>
//          {data.packages.map((pkg) => (
//            <tr key={pkg.id}>
//              <td className="p-2 border">{pkg.packageName}</td>
//              <td className="p-2 border">{pkg.destinationCountry}</td>
//              <td className="p-2 border">${pkg.packagePrice}</td>
//              <td className="p-2 border">
//                <button
//                  onClick={() => handleDelete(pkg.id)}
//                  className="bg-red-500 text-white px-3 py-1 rounded"
//                  disabled={deletePackage.isLoading}
//                >
//                  Delete
//                </button>
//                <a
//                  href={`/packages/${pkg.id}`}
//                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
//                >
//                  View
//                </a>
//              </td>
//            </tr>
//          ))}
//        </tbody>
//      </table>
//    </div>
//  );
//};

//export default PackageList;

//this is use also images
//import { usePackages, useDeletePackage } from "../../package";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDeletePackage, usePackages } from "../../package";

const PackageList = () => {
  const { data, isLoading, isError } = usePackages();

  const deletePackage = useDeletePackage();

  if (isLoading) return <p>Loading packages...</p>;
  if (isError) return <p>Error loading packages.</p>;

  const handleDelete = (id) => {
    deletePackage.mutate(id, {
      onSuccess: () => toast.success("Package deleted successfully!"),
      onError: () => toast.error("Error deleting package"),
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Packages</h1>

      {/* === TABLE VIEW === */}
      <table className="w-full border mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Country</th>

            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.tourPackage.map((pkg) => (
            <tr key={pkg.id}>
              <td className="p-2 border">{pkg.displayName}</td>
              <td className="p-2 border">{pkg.destinationCountry}</td>

              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  disabled={deletePackage.isLoading}
                >
                  Delete
                </button>
                <Link
                  to={`/tour-package/${pkg.id}`}
                  className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === IMAGE GRID VIEW === */}
      <h2 className="text-xl font-semibold mb-4">Package Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.tourPackage.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded-lg shadow hover:shadow-lg transition"
          >
            <Link to={`/tour-package/${pkg.id}`}>
              <img
                src={pkg.packageImageUrl}
                alt={pkg.packageImageUrl}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="font-bold text-lg">{pkg.packageName}</h3>
                <p className="text-sm text-gray-600">
                  {pkg.destinationCountry}
                </p>
                <p className="text-sm font-semibold">${pkg.packagePrice}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
