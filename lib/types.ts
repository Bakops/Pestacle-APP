export type Spectacle = {
  id: number;
  titre: string;
  description: string | null;
  dateHeure: string; // ISO datetime
  lieu: string | null;
  prixUnitaire: number;
  imageUrl: string | null;
  placesDisponibles: number;
  capaciteTotale: number;
  statut: "DISPONIBLE" | "COMPLET" | "ANNULE" | "TERMINE";
};

export type Utilisateur = {
  id: number;
  nom: string;
  prenom: string | null;
  email: string;
  telephone: string | null;
  dateCreation: string; // ISO datetime
};

export type Reservation = {
  id: number;
  utilisateurId: number;
  dateReservation: string; // ISO datetime
  statut: "EN_ATTENTE" | "CONFIRMEE" | "ANNULEE";
  montantTotal: number | null;
  moyenPaiement: string | null;
};

export type Billet = {
  id: number;
  reservationId: number;
  spectacleId: number;
  quantite: number;
  prixUnitaire: number;
};

export type StatistiqueVente = {
  id: number;
  spectacleId: number;
  dateJour: string; // ISO date
  nbBilletsVendus: number;
  montantVentes: number;
};

export type StatsVente = {
  id: number;
  spectacleId: number;
  dateJour: string | null;
  montantVentes: number | null;
  nbBilletsVendus: number;
};