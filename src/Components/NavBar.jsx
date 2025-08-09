import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { Auth } from "../Firebase/firebase.init";
import Swal from "sweetalert2";
import { Logs, MoonStar, Sun, X } from "lucide-react";

const NavBar = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(Auth)
          .then(() => {
            // Sign-out successful.
            navigate('/')
            toast.success("Logout successfully!");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      }
    });
  };

  const navMenu = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700 dark:text-white"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700 dark:text-white"
          }
        >
          Rooms
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/my-booking"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-700 dark:text-white"
            }
          >
            My Booking
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700 dark:text-white"
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-700 dark:text-white"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div>

      <nav className="bg-white/30 dark:bg-slate-900/80 transition-colors duration-300  shadow-sm backdrop-blur-md border-b border-b-white/20">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-14 md:h-18">
            {/* logo */}
            <div>
              <Link to={'/'}>
                <h2 className="text-xl mg:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  TripHaven
                </h2>
              </Link>
            </div>
            {/* menu */}
            <div className="hidden md:block">
              <ul className="text-md text-gray-700  flex gap-5">
                {navMenu}
              </ul>
            </div>

            {/* right side */}
            <div className="flex gap-2 md:gap-6 items-center">
              {/* dark light icon */}
              <div
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full  hover:bg-slate-300 cursor-pointer 
    transform transition-transform duration-500 ease-in-out ${isDark ? "rotate-60" : "-rotate-90"
                  }`}
              >
                {isDark ? <Sun className="text-white/90" /> : <MoonStar />}
              </div>
              {/* user Profile */}
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      {user?.photoURL && (
                        <img
                          alt="Tailwind CSS Navbar component"
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                          }
                        />
                      )}
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to={"/login"}>
                  <p className="btn btn-primary">Login</p>
                </Link>
              )}


              {/* hamburger menu */}
              <div className="md:hidden dark:text-white ">
                <button
                  className="md:hidden p-2 "
                  aria-label="Open Menu"
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                >
                  {isOpenMenu ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Logs className="w-6 h-6" />
                  )}
                </button>
                {/* Mobile Menu Dropdown */}
                {isOpenMenu && (
                  <div className="absolute left-0 top-full z-40 w-full bg-white shadow-md px-5 pt-2 pb-4 flex flex-col gap-6 dark:bg-slate-900 border-t border-gray-300 dark:border-gray-700 ">
                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-4 text-lg font-medium text-gray-700 dark:text-white">
                      <ul>{navMenu}</ul>
                    </nav>

                    {/* Footer Icons + Button */}

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* old */}
      <div className="hidden navbar bg-white/30 dark:bg-slate-900/80 transition-colors duration-300  shadow-sm backdrop-blur-md border-b border-b-white/20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navMenu}
            </ul>
          </div>
          <Link to={'/'}>
            <p className="font-bold ml-5 text-xl">TripHaven</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navMenu}</ul>
        </div>
        <div className="navbar-end">
          {/* dark light icon */}
          <div
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full  hover:bg-slate-300 cursor-pointer 
    transform transition-transform duration-500 ease-in-out ${isDark ? "rotate-60" : "-rotate-90"
              }`}
          >
            {isDark ? <Sun className="text-white/90" /> : <MoonStar />}
          </div>
          {/* ====== */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user?.photoURL && (
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                      }
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"}>
              <p className="btn btn-primary">Login</p>
            </Link>
          )}
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false}></Toaster>
    </div>
  );
};

export default NavBar;
