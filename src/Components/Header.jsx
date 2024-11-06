import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function Header() {
  const menu = [
    { id: 1, name: "Home", path: "/home" },
    { id: 3, name: "Thriller", path: "/anime" },
    { id: 4, name: "Series", path: "/series" },
    { id: 2, name: "Fiction", path: "/fiction" },
    { id: 5, name: "Crime", path: "/crime" },
    { id: 6, name: "Podcast", path: "/pod" },
  ];

  // Get the current location
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Extract the path from the location
  const currentPath = location.pathname;

  // Determine the active tab based on the current path
  const [activeTab, setActiveTab] = useState(
    menu.find((item) => item.path === currentPath)?.id || 1
  );

  const handleTabClick = (id) => {
    setActiveTab(id);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignout = () => {
    // Logic to handle signout
    // For now, let's just redirect to "/"
    window.location.href = "/";
  };
  return (
    <div className="flex z-30 justify-between items-center p-4 px-10 absolute w-full bg-gradient-to-b from-[#1e2126] to-transparent">
      <img
        src="NOVA.png"
        style={{ width: "150px", height: "auto" }}
        alt="NOVA Logo"
      />
      <ul className="hidden md:flex gap-8">
        {menu.map((item) => (
          <li
            key={item.id}
            className={`text-gray-400 text-[18px] font-medium cursor-pointer hover:bg-gray-700 hover:text-white px-3 pb-2 py-1 ${
              activeTab === item.id ? "bg-gray-700 text-white" : null
            } rounded-md transition-all duration-500 ease-in-out`}
            onClick={() => handleTabClick(item.id)}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-10 items-center relative">
        <Link to="/search" className="text-gray-300 hover:text-white">
          <IoSearch className="text-[35px] hover:bg-gray-700 px-[3px] pb-[2px] py-[2px] cursor-pointer rounded-md hover:text-white transition-all duration-500 ease-in-out" />
        </Link>

        <div className="relative">
          <img
            src="user1.png"
            alt="User Avatar"
            className="w-30 h-20 cursor-pointer"
            onClick={toggleDropdown}
          />
          {/* Conditionally render the black background */}
          {isDropdownOpen && (
            <div className="absolute left-0 top-12 bg-black text-white w-[15vh] p-2 rounded-lg shadow-lg">
              <ul>
                <li
                  className="cursor-pointer hover:text-gray-400"
                  onClick={handleSignout}
                >
                  Sign out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
