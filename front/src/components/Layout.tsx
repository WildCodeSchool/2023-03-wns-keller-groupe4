import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Transition } from "@headlessui/react";

import NavbarFront from "./NavbarFront";
import NavbarBack from "./NavbarBack";
import MenuFront from "./MenuFront";
import MenuBack from "./MenuBack";
import Footer from "./Footer";

interface ILayoutFrontProps {
    isFrontOffice: boolean;
}

function Layout({ isFrontOffice }: ILayoutFrontProps) {
    const [openNav, setOpenNav] = useState(false);
    return (
        <div className="font-primary">
            {isFrontOffice ? (
                <NavbarFront openNav={openNav} setOpenNav={setOpenNav} />
            ) : (
                <NavbarBack openNav={openNav} setOpenNav={setOpenNav} />
            )}

            <main className="min-h-screen flex ">
                <Transition
                    show={openNav}
                    as="div"
                    enter="transition-all duration-100"
                    enterFrom="opacity-0 px-2"
                    enterTo="opacity-80  p-2 shadow-md"
                    leave="transition-all duration-150"
                    leaveFrom="opacity-80  p-2 shadow-md"
                    leaveTo="opacity-0 px-2"
                >
                    {isFrontOffice ? (
                        <MenuFront setOpenNav={setOpenNav} />
                    ) : (
                        <MenuBack setOpenNav={setOpenNav} />
                    )}
                </Transition>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
