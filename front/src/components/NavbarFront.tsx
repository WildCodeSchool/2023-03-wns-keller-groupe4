import { Link } from "react-router-dom";

import { GoPerson } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";

interface INavbarFrontProps {
  openNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavbarFront({ openNav, setOpenNav }: INavbarFrontProps) {
  return (
    <header className="sticky inset-0 z-10 h-max max-w-full rounded-none bg-white py-2 px-4 shadow-sm lg:px-8 lg:py-4">
      <nav className="flex items-center justify-between">
        {/* Open Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="hidden border border-main px-4 py-1 rounded-md active:bg-yellow-400 md:block"
            onClick={() => setOpenNav(!openNav)}
          >
            Tous nos matériels
          </button>
          <button
            type="button"
            aria-label="Open Menu"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
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
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="cursor-pointer py-1.5 text-lg ml-8 md:ml-0 md:mr-24"
        >
          Wildrent
        </Link>

        {/* User */}
        <div className="flex gap-4">
          <Link to="/profile">
            <GoPerson
              aria-label="Go to profile page"
              className="cursor-pointer"
              size="1.5rem"
            />
          </Link>
          <Link to="/cart">
            <FaShoppingCart
              aria-label="Go to cart page"
              className="cursor-pointer"
              size="1.5rem"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavbarFront;
