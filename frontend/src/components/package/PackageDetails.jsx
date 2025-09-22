import { Link, useParams } from "react-router-dom";
import { usePackageById } from "../../package";

const PackageDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = usePackageById(id);

  if (isLoading) return <p>Loading package...</p>;
  if (isError) return <p>Error loading package.</p>;

  return (
    <div className="px-10 py-10">
      <h1 className="text-2xl font-bold mb-4">
        {data.tourPackage.displayName}
      </h1>

      <p>
        <strong>From:</strong> {data.tourPackage.fromCountry}
      </p>
      <p>
        <strong>Destination:</strong> {data.tourPackage.destinationCountry}
      </p>
      <p>
        <strong>Duration:</strong> {data.tourPackage.duration}
      </p>

      <p>
        <strong>Price:</strong> ${data.tourPackage.packagePrice}
      </p>
      <p>
        <strong>Price:</strong> ${data.tourPackage.finalAmount}
      </p>
      <p>
        <strong>Description:</strong> {data.tourPackage.description}
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/tour-package/${id}/edit`}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>
        <Link to="/admin" className="bg-gray-600 text-white px-3 py-1 rounded">
          Back
        </Link>
      </div>
    </div>
  );
};

export default PackageDetails;
