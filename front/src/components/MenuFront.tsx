function MenuFront() {
  return (
    <div>
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
  );
}

export default MenuFront;
