import { useParams, Link } from "react-router-dom";
import { useEmployeeById } from "../employee";

const ViewById = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useEmployeeById(id);

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Error loading user</p>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">User Detail</h1>
      <p>
        <strong>ID:</strong> {user.employee.id}
      </p>
      <p>
        <strong>Name:</strong> {user.employee.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user.employee.email}
      </p>
      <p>
        <strong>Role:</strong> {user.employee.role}
      </p>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/emp/${id}/edit`}
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

export default ViewById;
