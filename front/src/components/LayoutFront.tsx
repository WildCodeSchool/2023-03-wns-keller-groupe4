import { Outlet } from "react-router-dom";

import NavbarFront from "./NavbarFront";

function LayoutFront() {
  return (
    <>
      <header>
        <NavbarFront />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutFront;
