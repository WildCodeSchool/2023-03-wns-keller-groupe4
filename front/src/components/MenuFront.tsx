function MenuFront() {
  return (
    <div>
      <label htmlFor="searchMenu" className="sr-only">
        Tous nos matériels
      </label>
      <input
        type="text"
        name="searchMenu"
        id="searchMenu"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-main focus:border-transparent"
        placeholder="Chercher un matériel"
      />
    </div>
  );
}

export default MenuFront;
