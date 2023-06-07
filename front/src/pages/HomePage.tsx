import NavbarFront from "../components/NavbarFront";

function HomePage() {
  return (
    <div className="h-screen">
      <header>
        <NavbarFront />
      </header>
      <main className="flex flex-col items-center justify-center h-[calc(100vh-58px)] lg:h-[calc(100vh-74px)]">
        <div className="w-4/5 flex flex-col items-center border border-main rounded-xl shadow-sm py-8 sm:w-80">
          <h1 className="text-4xl font-bold mb-4">Wildrent</h1>
          <p className="text-xl text-center">
            Louez votre matériel de chantier sans difficulté
          </p>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
