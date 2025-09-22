import { useDispatch } from "react-redux";
import { logout } from "../redux/authslice";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "./ConformBox";
import { useState } from "react";

const LogoutButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-500 w-full p-2 rounded"
      >
        Logout
      </button>

      {showConfirm && (
        <ConfirmBox
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default LogoutButton;
