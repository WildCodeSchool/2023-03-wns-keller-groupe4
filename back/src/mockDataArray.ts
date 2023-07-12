export const categoriesNames = [
	"Bétonnière",
	"Brouette",
	"Camion",
	"Compresseur",
	"Dameuse",
	"Décapeur",
	"Décolleuse",
	"Défonceuse",
	"Diable",
	"Echafaudage",
	"Echelle",
	"Escabeau",
	"Groupe électrogène",
	"Marteau piqueur",
	"Mini-pelle",
	"Nacelle",
	"Nettoyeur haute pression",
	"Perforateur",
	"Ponceuse",
	"Scie",
	"Tarière",
	"Tondeuse",
	"Tronçonneuse",
	"Visseuse",
];

export interface IMockProduct {
	name: string;
	price: number;
	stock: number;
	available: boolean;
	description: string;
	picture: string;
	categories: string[];
}

export const mockProducts: IMockProduct[] = [
	{
		name: "Bétonnière électrique 350L",
		price: 30,
		stock: 10,
		available: true,
		description: "Bétonnière électrique 350L",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/0/100_0001_1.jpg",
		categories: [],
	},
	{
		name: "Bétonnière électrique 200L",
		price: 20,
		stock: 0,
		available: false,
		description: "Bétonnière électrique 200L",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/0/100_0001_1.jpg",
		categories: [],
	},
	{
		name: "Bétonnière électrique 100L",
		price: 10,
		stock: 5,
		available: true,
		description: "Bétonnière électrique 100L",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/0/100_0001_1.jpg",
		categories: [],
	},
	{
		name: "Brouette 100L",
		price: 10,
		stock: 12,
		available: true,
		description: "Brouette 100L",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/0/100_0001_1.jpg",
		categories: [],
	},
	{
		name: "Brouette 200L",
		price: 20,
		stock: 11,
		available: true,
		description: "Brouette 200L",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/0/100_0001_1.jpg",
		categories: [],
	},
	{
		name: "Dameuse 200kg",
		price: 50,
		stock: 3,
		available: true,
		description: "Dameuse 200kg",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/a/dameuse_100kg.jpg",
		categories: [],
	},
	{
		name: "Dameuse 300kg",
		price: 60,
		stock: 0,
		available: false,
		description: "Dameuse 300kg",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/a/dameuse_100kg.jpg",
		categories: [],
	},
	{
		name: "Compresseur 100L",
		price: 22,
		stock: 3,
		available: true,
		description: "Compresseur 100L",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/compresseur_100l.jpg",
		categories: [],
	},
	{
		name: "Compresseur 200L",
		price: 25,
		stock: 0,
		available: false,
		description: "Compresseur 200L",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/compresseur_100l.jpg",
		categories: [],
	},
	{
		name: "Compresseur 300L",
		price: 30,
		stock: 1,
		available: true,
		description: "Compresseur 300L",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/compresseur_100l.jpg",
		categories: [],
	},
	{
		name: "Décapeur thermique 1000W",
		price: 10,
		stock: 0,
		available: false,
		description: "Décapeur thermique 1000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/decapeur_thermique_1000w.jpg",
		categories: [],
	},
	{
		name: "Décapeur thermique 2000W",
		price: 15,
		stock: 3,
		available: true,
		description: "Décapeur thermique 2000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/decapeur_thermique_1000w.jpg",
		categories: [],
	},
	{
		name: "Décolleuse papier peint 2000W",
		price: 20,
		stock: 0,
		available: false,
		description: "Décolleuse papier peint 2000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/decolleuse_papier_peint_2000w.jpg",
		categories: [],
	},
	{
		name: "Décolleuse papier peint 3000W",
		price: 25,
		stock: 3,
		available: true,
		description: "Décolleuse papier peint 3000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/decolleuse_papier_peint_2000w.jpg",
		categories: [],
	},
	{
		name: "Décolleuse papier peint 4000W",
		price: 30,
		stock: 0,
		available: false,
		description: "Décolleuse papier peint 4000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/decolleuse_papier_peint_2000w.jpg",
		categories: [],
	},
	{
		name: "Défonceuse 1000W",
		price: 10,
		stock: 3,
		available: true,
		description: "Défonceuse 1000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/defonceuse_1000w.jpg",
		categories: [],
	},
	{
		name: "Défonceuse 2000W",
		price: 15,
		stock: 0,
		available: false,
		description: "Défonceuse 2000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/defonceuse_1000w.jpg",
		categories: [],
	},
	{
		name: "Défonceuse 3000W",
		price: 20,
		stock: 3,
		available: true,
		description: "Défonceuse 3000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/defonceuse_1000w.jpg",
		categories: [],
	},
	{
		name: "Défonceuse 4000W",
		price: 25,
		stock: 0,
		available: false,
		description: "Défonceuse 4000W",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/e/defonceuse_1000w.jpg",
		categories: [],
	},
	{
		name: "Diable à bavette",
		price: 10,
		stock: 3,
		available: true,
		description: "Diable à bavette",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diable_a_bavette.jpg",
		categories: [],
	},
	{
		name: "Diable à bande",
		price: 15,
		stock: 0,
		available: false,
		description: "Diable à bande",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diable_a_bavette.jpg",
		categories: [],
	},
	{
		name: "Diable chariot",
		price: 20,
		stock: 3,
		available: true,
		description: "Diable chariot",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/h/chariot_roulant.jpg",
		categories: [],
	},
	{
		name: "Echafaudage 2m",
		price: 25,
		stock: 0,
		available: false,
		description: "Echafaudage 2m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/c/echafaudage_2m.jpg",
		categories: [],
	},
	{
		name: "Echafaudage 4m",
		price: 30,
		stock: 3,
		available: true,
		description: "Echafaudage 4m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/c/echafaudage_2m.jpg",
		categories: [],
	},
	{
		name: "Echafaudage 6m",
		price: 35,
		stock: 0,
		available: false,
		description: "Echafaudage 6m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/c/echafaudage_2m.jpg",
		categories: [],
	},
	{
		name: "Echelle 2m",
		price: 10,
		stock: 3,
		available: true,
		description: "Echelle 2m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/c/echelle_2m.jpg",
		categories: [],
	},
	{
		name: "Echelle 4m",
		price: 15,
		stock: 0,
		available: false,
		description: "Echelle 4m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/c/echelle_2m.jpg",
		categories: [],
	},
	{
		name: "Echelle 6m",
		price: 20,
		stock: 3,
		available: true,
		description: "Echelle 6m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/c/echelle_2m.jpg",
		categories: [],
	},
	{
		name: "Escabeau 2m",
		price: 25,
		stock: 0,
		available: false,
		description: "Escabeau 2m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/s/escabeau_2m.jpg",
		categories: [],
	},
	{
		name: "Escabeau 4m",
		price: 30,
		stock: 3,
		available: true,
		description: "Escabeau 4m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/s/escabeau_2m.jpg",
		categories: [],
	},
	{
		name: "Escabeau 6m",
		price: 35,
		stock: 0,
		available: false,
		description: "Escabeau 6m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/s/escabeau_2m.jpg",
		categories: [],
	},
	{
		name: "Groupe électrogène 2kW",
		price: 10,
		stock: 3,
		available: true,
		description: "Groupe électrogène 2kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/groupe_electrogene_2kw.jpg",
		categories: [],
	},
	{
		name: "Groupe électrogène 4kW",
		price: 15,
		stock: 0,
		available: false,
		description: "Groupe électrogène 4kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/groupe_electrogene_2kw.jpg",
		categories: [],
	},
	{
		name: "Groupe électrogène 6kW",
		price: 20,
		stock: 3,
		available: true,
		description: "Groupe électrogène 6kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/r/groupe_electrogene_2kw.jpg",
		categories: [],
	},
	{
		name: "Marteau piqueur 2kW",
		price: 25,
		stock: 0,
		available: false,
		description: "Marteau piqueur",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/a/marteau_piqueur.jpg",
		categories: [],
	},
	{
		name: "Marteau piqueur 4kW",
		price: 30,
		stock: 3,
		available: true,
		description: "Marteau piqueur",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/a/marteau_piqueur.jpg",
		categories: [],
	},
	{
		name: "Marteau piqueur 6kW",
		price: 35,
		stock: 0,
		available: false,
		description: "Marteau piqueur",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/a/marteau_piqueur.jpg",
		categories: [],
	},
	{
		name: "Mini-pelle 2t",
		price: 10,
		stock: 3,
		available: true,
		description: "Mini-pelle 2t",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/i/mini-pelle_2t.jpg",
		categories: [],
	},
	{
		name: "Mini-pelle 4t",
		price: 15,
		stock: 0,
		available: false,
		description: "Mini-pelle 4t",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/i/mini-pelle_2t.jpg",
		categories: [],
	},
	{
		name: "Nacelle 2m",
		price: 20,
		stock: 3,
		available: true,
		description: "Nacelle 2m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/a/nacelle_2m.jpg",
		categories: [],
	},
	{
		name: "Nacelle 4m",
		price: 25,
		stock: 0,
		available: false,
		description: "Nacelle 4m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/a/nacelle_2m.jpg",
		categories: [],
	},
	{
		name: "Nacelle 6m",
		price: 30,
		stock: 3,
		available: true,
		description: "Nacelle 6m",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/a/nacelle_2m.jpg",
		categories: [],
	},
	{
		name: "Nettoyeur haute pression 2kW",
		price: 35,
		stock: 0,
		available: false,
		description: "Nettoyeur haute pression 2kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/e/nettoyeur_haute_pression_2kw.jpg",
		categories: [],
	},
	{
		name: "Nettoyeur haute pression 4kW",
		price: 40,
		stock: 3,
		available: true,
		description: "Nettoyeur haute pression 4kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/e/nettoyeur_haute_pression_2kw.jpg",
		categories: [],
	},
	{
		name: "Nettoyeur haute pression 6kW",
		price: 45,
		stock: 0,
		available: false,
		description: "Nettoyeur haute pression 6kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/e/nettoyeur_haute_pression_2kw.jpg",
		categories: [],
	},
	{
		name: "Perforateur 2kW",
		price: 50,
		stock: 3,
		available: true,
		description: "Perforateur 2kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/e/perforateur_2kw.jpg",
		categories: [],
	},
	{
		name: "Perforateur 4kW",
		price: 55,
		stock: 0,
		available: false,
		description: "Perforateur 4kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/e/perforateur_2kw.jpg",
		categories: [],
	},
	{
		name: "Perforateur 6kW",
		price: 10,
		stock: 3,
		available: true,
		description: "Perforateur 6kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/e/perforateur_2kw.jpg",
		categories: [],
	},
	{
		name: "Ponceuse 2kW",
		price: 15,
		stock: 0,
		available: false,
		description: "Ponceuse 2kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/o/ponceuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Ponceuse 4kW",
		price: 20,
		stock: 3,
		available: true,
		description: "Ponceuse 4kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/o/ponceuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Scie à métaux",
		price: 25,
		stock: 0,
		available: false,
		description: "Scie à métaux",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/c/scie_a_metaux.jpg",
		categories: [],
	},
	{
		name: "Scie à bois",
		price: 30,
		stock: 3,
		available: true,
		description: "Scie à bois",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/c/scie_a_metaux.jpg",
		categories: [],
	},
	{
		name: "Tarière 2kW",
		price: 35,
		stock: 0,
		available: false,
		description: "Tarière 2kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/a/tariere_2kw.jpg",
		categories: [],
	},
	{
		name: "Tarière 4kW",
		price: 40,
		stock: 3,
		available: true,
		description: "Tarière 4kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/a/tariere_2kw.jpg",
		categories: [],
	},
	{
		name: "Tarière 6kW",
		price: 45,
		stock: 0,
		available: false,
		description: "Tarière 6kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/a/tariere_2kw.jpg",
		categories: [],
	},
	{
		name: "Tondeuse 2kW",
		price: 50,
		stock: 3,
		available: true,
		description: "Tondeuse 2kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/o/tondeuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Tondeuse 4kW",
		price: 55,
		stock: 0,
		available: false,
		description: "Tondeuse 4kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/o/tondeuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Tronçonneuse 2kW",
		price: 10,
		stock: 3,
		available: true,
		description: "Tronçonneuse 2kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/r/tronconneuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Tronçonneuse 4kW",
		price: 15,
		stock: 0,
		available: false,
		description: "Tronçonneuse 4kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/t/r/tronconneuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Visseuse 2kW",
		price: 20,
		stock: 3,
		available: true,
		description: "Visseuse 2kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/i/visseuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Visseuse 4kW",
		price: 25,
		stock: 0,
		available: false,
		description: "Visseuse 4kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/i/visseuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Visseuse 6kW",
		price: 30,
		stock: 3,
		available: true,
		description: "Visseuse 6kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/i/visseuse_2kw.jpg",
		categories: [],
	},
	{
		name: "Visseuse 8kW",
		price: 35,
		stock: 0,
		available: false,
		description: "Visseuse 8kW",
		picture:
			"https://www.loxam.fr/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/i/visseuse_2kw.jpg",
		categories: [],
	},
];
