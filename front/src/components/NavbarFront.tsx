import { Link } from "react-router-dom";
import { getIDToken } from "../utils/jwtHandler";
import wildRentIcon from "../assets/icons/wildRentIcon.png";
import userProfileIcon from "../assets/icons/userProfileIcon.png";
import shoppingCartIcon from "../assets/icons/shoppingCartIcon.png";
interface INavbarFrontProps {
    openNav: boolean;
    setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavbarFront({ openNav, setOpenNav }: INavbarFrontProps) {
    return (
        <header className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 shadow-sm lg:px-8 lg:py-4 border-gray-200 bg-gray-100">
            <nav className="flex items-center justify-between h-12">
                {/* Open Menu Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        className="hidden border border-main px-4 py-1 rounded-md active:bg-yellow-400 md:block"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        Toutes nos catégories
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
                <div>
                    {/* Logo */}

                    <Link
                        to="/"
                        className="  text-center font-bold cursor-pointer py-1.5  text-lg ml-8 md:ml-0 md:mr-24"
                    >
                        <img
                            src={wildRentIcon}
                            className="w-16"
                            alt="Icone de wild rent"
                        />
                        Wildrent
                    </Link>
                </div>
                {/* User */}
                <div className="flex gap-4">
                    <Link to={getIDToken() ? "/profile" : "/connect"}>
                        <img
                            src={userProfileIcon}
                            className="w-10"
                            alt="Go to profile page"
                            aria-label="Go to profile page"
                        />
                    </Link>
                    <Link to="/cart">
                        <img
                            src={shoppingCartIcon}
                            className="w-10"
                            alt="Go to cart page"
                            aria-label="Go to cart page"
                        />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default NavbarFront;
