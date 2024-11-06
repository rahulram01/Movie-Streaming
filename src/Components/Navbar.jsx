import { useState } from "react"; // Import useState hook
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can add further logic here to toggle dark mode in your application
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
    <div className="flex justify-between items-center p-4 px-10 absolute w-full bg-gradient-to-b from-[#1e2126] to-transparent z-50">
      <img
        src="NOVA.png"
        style={{ width: "150px", height: "auto" }}
        alt="NOVA Logo"
      />
      <div className="flex gap-10 items-center relative">
        {/* User Avatar without link */}
        <img
          src="user1.png"
          alt="User Avatar"
          className="w-30 h-20 cursor-pointer"
          onClick={toggleDropdown} // Attach toggleDropdown function to onClick event
        />

        {/* Render dark mode toggle icon based on darkMode state */}
        {darkMode ? (
          <MdDarkMode
            onClick={toggleDarkMode}
            className="text-gray-400 cursor-pointer hover:text-white"
          />
        ) : (
          <MdOutlineDarkMode
            onClick={toggleDarkMode}
            className="text-gray-400 cursor-pointer hover:text-white"
          />
        )}
        {/* Render dropdown for user login */}
        <div className="">
          {isDropdownOpen && (
            <ul>
              <li className="cursor-pointer hover:text-gray-400">Payment</li>
              <li
                className="cursor-pointer hover:text-gray-400"
                onClick={handleSignout}
              >
                Sign out
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
