import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Transition } from "@headlessui/react";

import NavbarFront from "./NavbarFront";

function LayoutFront() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <div className="font-primary">
      <NavbarFront openNav={openNav} setOpenNav={setOpenNav} />

      <main>
        <Transition
          show={openNav}
          as="div"
          enter="transition-all duration-100"
          enterFrom="opacity-0 px-2"
          enterTo="opacity-90 bg-main p-2 shadow-md"
          leave="transition-all duration-100"
          leaveFrom="opacity-90 bg-main p-2 shadow-md"
          leaveTo="opacity-0 px-2"
        >
          <div className="h-full">
            <div className="w-full">
              <label htmlFor="search" className="sr-only">
                Tous nos matériels
              </label>
              <input
                type="text"
                name="search"
                id="search"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-main focus:border-transparent"
                placeholder="Chercher un matériel"
              />
            </div>
          </div>
        </Transition>
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutFront;
