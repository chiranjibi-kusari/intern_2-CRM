import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import RegisterEmployee from "../../pages/RegisterEmployee";
import LogoutButton from "../LogoutButton";
import PackageList from "../package/PackageList";
import CreatePackage from "../package/CreatePackage";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("register");
  const navigate = useNavigate();
  const renderContent = () => {
    switch (activeTab) {
      case "package":
        return <CreatePackage />;
      //case "package":
      //  return <CreatePackages />;
      case "viewPackage":
        return <PackageList />;
      default:
        return <PackageList />;
    }
  };

  //const handleLogout = () => {
  //  dispatch(logout());
  //  navigate("/");
  //};
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Employee Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("package")}
            className={`w-full text-left p-2 rounded`}
          >
            Create Package
          </button>
          <button
            onClick={() => setActiveTab("viewPackage")}
            className={`w-full text-left p-2 rounded`}
          >
            View Package
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          {/*<button
            onClick={handleLogout}
            className="bg-red-500 w-full p-2 rounded"
          >
            Logout
          </button>*/}
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
