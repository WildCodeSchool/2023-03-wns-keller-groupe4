import { Link } from "react-router-dom";

interface MenuBackProps {
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuBack({ setOpenNav }: MenuBackProps) {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4">
      <button type="button" onClick={() => setOpenNav(false)}>
        <Link
          to="/admin/create"
          className="block border hover:border-main px-4 py-1 rounded-md active:bg-yellow-400"
        >
          Ajouter un matériel
        </Link>
      </button>
      <button type="button" onClick={() => setOpenNav(false)}>
        <Link
          to="/admin/stock"
          className="block border hover:border-main px-4 py-1 rounded-md active:bg-yellow-400"
        >
          Stock
        </Link>
      </button>
      <button type="button" onClick={() => setOpenNav(false)}>
        <Link
          to="/admin/reservations"
          className="block border hover:border-main px-4 py-1 rounded-md active:bg-yellow-400"
        >
          Réservations
        </Link>
      </button>
    </div>
  );
}

export default MenuBack;
