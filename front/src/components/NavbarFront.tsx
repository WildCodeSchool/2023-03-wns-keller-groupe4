import { useEffect, useState } from "react";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";

import { GoPerson } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";

function NavbarFront() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <div className="w-full md:mt-2">
      <label htmlFor="search" className="md:sr-only">
        Tous nos matériels
      </label>
      <input
        type="text"
        name="search"
        id="search"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-gray-400 focus:border-transparent"
        placeholder="Chercher un matériel"
      />
    </div>
  );

  return (
    <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none bg-white py-2 px-4 shadow-sm lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center gap-4">
          <button
            className="hidden border border-main px-4 py-1 rounded-md active:bg-yellow-400 md:block"
            onClick={() => setOpenNav(!openNav)}
          >
            Tous nos matériels
          </button>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <a
          href="/"
          className="cursor-pointer py-1.5 text-lg ml-8 md:ml-0 md:mr-24"
        >
          Wildrent
        </a>
        <div className="flex gap-4">
          <GoPerson className="cursor-pointer" size="1.5rem" />
          <FaShoppingCart className="cursor-pointer" size="1.5rem" />
        </div>
      </div>
      <Collapse open={openNav}>{navList}</Collapse>
    </Navbar>
  );
}

export default NavbarFront;
