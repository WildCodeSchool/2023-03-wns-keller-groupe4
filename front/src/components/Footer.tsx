import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Footer() {
    const slug = useLocation().pathname.split("/")[1];
    let [showFooter, setShowFooter] = useState(true);
    
    useEffect(() => {
        console.log(slug);
        if (slug === "cart") 
            setShowFooter(false);
        else
            setShowFooter(true);
    }, [slug]);
    
    return (
        (showFooter === true ? (
            <footer className="w-full bg-gray-200 shadow mt-4">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a
                            href="https://flowbite.com/"
                            className="flex items-center mb-4 sm:mb-0"
                        >
                            <span className="self-center text-gray-500 text-2xl font-semibold whitespace-nowrap ps-3">
                                WildRent
                            </span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="mr-4 hover:underline md:mr-6 "
                                >
                                    Produits
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="mr-4 hover:underline md:mr-6 "
                                >
                                    A Propos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="mr-4 hover:underline md:mr-6"
                                >
                                    Politique de confidentialité
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023{" "}
                        <a href="https://flowbite.com/" className="hover:underline">
                            WildRent™
                        </a>
                        . Tous droits réservés.
                    </span>
                </div>
            </footer>
        ) : 
            null
        )
    );
}

export default Footer;
