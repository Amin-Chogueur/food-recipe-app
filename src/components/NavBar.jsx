import { Link, useLocation } from "react-router-dom";
import useFavoriteContext from "../hooks/useFavoriteContext";
import { Menu } from "lucide-react";
import { useState } from "react";
function Navbar() {
  const { favorites } = useFavoriteContext();
  const { pathname } = useLocation();
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="bg-green-900 px-[40px] h-[60px] flex justify-between items-center relative">
      <div>
        <img
          width={150}
          src="/logo (1).svg"
          alt="logo"
          className="hidden md:block  mx-auto"
        />
        <img
          width={50}
          src="/mobile-logo.svg"
          alt="logo"
          className="block md:hidden  mx-auto"
        />
      </div>
      <Menu
        className="md:hidden cursor-pointer"
        onClick={() => setShowLinks((prev) => !prev)}
      />
      <ul className="md:flex items-center gap-6 text-xl hidden">
        <li
          className=" p-1 rounded-md"
          style={pathname === "/" ? { backgroundColor: "#222" } : {}}
        >
          <Link to={"/"}> Home</Link>
        </li>
        <li
          className="  p-1 rounded-md"
          style={pathname === "/categories" ? { backgroundColor: "#222" } : {}}
        >
          <Link to={"/categories"}> Categories</Link>
        </li>
        <li
          className="relative  p-1 rounded-md "
          style={pathname === "/favorites" ? { backgroundColor: "#222" } : {}}
        >
          <Link to={"/favorites"}>
            {" "}
            Favorite{" "}
            <span className="absolute bg-red-700 rounded-full flex justify-center items-center w-[20px] h-[20px]  right-[-10px]  top-[-5px] text-white">
              {favorites.length}
            </span>
          </Link>
        </li>
      </ul>
      {showLinks && (
        <ul className="absolute bg-green-900 bottom-[-51px] h-[50px] left-0 w-full flex justify-between items-center gap-6 text-xl  px-[30px]">
          <li
            className=" p-1 rounded-md"
            style={pathname === "/" ? { backgroundColor: "#222" } : {}}
          >
            <Link onClick={() => setShowLinks(false)} to={"/"}>
              {" "}
              Home
            </Link>
          </li>
          <li
            className="  p-1 rounded-md"
            style={
              pathname === "/categories" ? { backgroundColor: "#222" } : {}
            }
          >
            <Link onClick={() => setShowLinks(false)} to={"/categories"}>
              {" "}
              Categories
            </Link>
          </li>
          <li
            className="relative  p-1 rounded-md "
            style={pathname === "/favorites" ? { backgroundColor: "#222" } : {}}
          >
            <Link onClick={() => setShowLinks(false)} to={"/favorites"}>
              {" "}
              Favorite{" "}
              <span className="absolute bg-red-700 rounded-full flex justify-center items-center w-[20px] h-[20px]  right-[-10px]  top-[-5px] text-white">
                {favorites.length}
              </span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
export default Navbar;
