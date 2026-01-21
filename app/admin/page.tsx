"use client";
import { useState, useEffect } from "react";
import { Headerpage } from "@/components/header-page";
import { Footer } from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Users, Calendar, Ticket, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  utilisateursAPI,
  spectaclesAPI,
  reservationsAPI,
  billetsAPI,
  type Utilisateur,
  type SpectacleAdmin,
  type Reservation,
  type Billet,
} from "@/lib/admin-api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("utilisateurs");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Headerpage />
      <main className="flex-1">
        <div className="mt-20 bg-linear-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide">
                🔐 Administration
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Panneau d'administration</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Gérez les utilisateurs, spectacles, réservations et billets
            </p>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="utilisateurs" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Utilisateurs
                </TabsTrigger>
                <TabsTrigger value="spectacles" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Spectacles
                </TabsTrigger>
                <TabsTrigger value="reservations" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Réservations
                </TabsTrigger>
                <TabsTrigger value="billets" className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  Billets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="utilisateurs">
                <UtilisateursTab />
              </TabsContent>

              <TabsContent value="spectacles">
                <SpectaclesTab />
              </TabsContent>

              <TabsContent value="reservations">
                <ReservationsTab />
              </TabsContent>

              <TabsContent value="billets">
                <BilletsTab />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function UtilisateursTab() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Utilisateur | null>(null);
  const [formData, setFormData] = useState<Utilisateur>({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    telephone: "",
    role: "USER",
  });

  const loadData = async () => {
    try {
      const { data } = await utilisateursAPI.getAll();
      setUtilisateurs(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ nom: "", prenom: "", email: "", motDePasse: "", telephone: "", role: "USER" });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Utilisateur) => {
    setEditingItem(item);
    setFormData({ ...item, motDePasse: "" });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await utilisateursAPI.update(editingItem.id!, formData);
        toast.success("Utilisateur modifié avec succès");
      } else {
        await utilisateursAPI.create(formData);
        toast.success("Utilisateur créé avec succès");
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    try {
      await utilisateursAPI.delete(id);
      toast.success("Utilisateur supprimé");
      loadData();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h2>
        <Button onClick={handleCreate} className="bg-[#4ECDC4] hover:bg-[#5218CC]">
          <Plus className="h-4 w-4 mr-2" />
          Nouvel utilisateur
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {utilisateurs.map((user, index) => (
              <tr key={user.id ?? index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.nom}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.prenom}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.telephone}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id!)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Modifier" : "Créer"} un utilisateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nom</Label>
              <Input value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} />
            </div>
            <div>
              <Label>Prénom</Label>
              <Input value={formData.prenom} onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <Label>Mot de passe {editingItem && "(laisser vide pour ne pas changer)"}</Label>
              <Input type="password" value={formData.motDePasse} onChange={(e) => setFormData({ ...formData, motDePasse: e.target.value })} />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
            </div>
            <div>
              <Label>Rôle</Label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as "USER" | "ADMIN" })}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSave} className="bg-[#4ECDC4] hover:bg-[#5218CC]">Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SpectaclesTab() {
  const [spectacles, setSpectacles] = useState<SpectacleAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SpectacleAdmin | null>(null);
  const [formData, setFormData] = useState<SpectacleAdmin>({
    titre: "",
    description: "",
    dateHeure: "",
    lieu: "",
    prixUnitaire: 0,
    imageUrl: "",
    placesDisponibles: 0,
    capaciteTotale: 0,
    statut: "DISPONIBLE",
  });

  const loadData = async () => {
    try {
      const { data } = await spectaclesAPI.getAll();
      setSpectacles(Array.isArray(data) ? data : (data as any).content || []);
    } catch (error) {
      toast.error("Erreur lors du chargement des spectacles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      titre: "",
      description: "",
      dateHeure: "",
      lieu: "",
      prixUnitaire: 0,
      imageUrl: "",
      placesDisponibles: 0,
      capaciteTotale: 0,
      statut: "DISPONIBLE",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: SpectacleAdmin) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await spectaclesAPI.update(editingItem.id!, formData);
        toast.success("Spectacle modifié avec succès");
      } else {
        await spectaclesAPI.create(formData);
        toast.success("Spectacle créé avec succès");
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce spectacle ?")) return;
    try {
      await spectaclesAPI.delete(id);
      toast.success("Spectacle supprimé");
      loadData();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des spectacles</h2>
        <Button onClick={handleCreate} className="bg-[#4ECDC4] hover:bg-[#5218CC]">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau spectacle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spectacles.map((spectacle, index) => (
          <Card key={spectacle.id ?? index} className="overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              {spectacle.imageUrl && (
                <img src={spectacle.imageUrl} alt={spectacle.titre} className="w-full h-full object-cover" />
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{spectacle.titre}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{spectacle.description}</p>
              <div className="text-xs text-gray-500 space-y-1 mb-3">
                <p>📍 {spectacle.lieu}</p>
                <p>📅 {new Date(spectacle.dateHeure).toLocaleString("fr-FR")}</p>
                <p>💰 {spectacle.prixUnitaire.toFixed(2)} €</p>
                <p>👥 {spectacle.placesDisponibles} / {spectacle.capaciteTotale} places</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                spectacle.statut === "DISPONIBLE" ? "bg-green-100 text-green-800" :
                spectacle.statut === "COMPLET" ? "bg-red-100 text-red-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {spectacle.statut}
              </span>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(spectacle)} className="flex-1">
                  <Pencil className="h-3 w-3 mr-1" /> Modifier
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(spectacle.id!)}>
                  <Trash2 className="h-3 w-3 text-red-600" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Modifier" : "Créer"} un spectacle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Titre</Label>
              <Input value={formData.titre} onChange={(e) => setFormData({ ...formData, titre: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date et heure</Label>
                <Input
                  type="datetime-local"
                  value={formData.dateHeure}
                  onChange={(e) => setFormData({ ...formData, dateHeure: e.target.value })}
                />
              </div>
              <div>
                <Label>Lieu</Label>
                <Input value={formData.lieu} onChange={(e) => setFormData({ ...formData, lieu: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Prix unitaire (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.prixUnitaire}
                  onChange={(e) => setFormData({ ...formData, prixUnitaire: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label>Places disponibles</Label>
                <Input
                  type="number"
                  value={formData.placesDisponibles}
                  onChange={(e) => setFormData({ ...formData, placesDisponibles: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label>Capacité totale</Label>
                <Input
                  type="number"
                  value={formData.capaciteTotale}
                  onChange={(e) => setFormData({ ...formData, capaciteTotale: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label>URL de l'image</Label>
              <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
            </div>
            <div>
              <Label>Statut</Label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
              >
                <option value="DISPONIBLE">DISPONIBLE</option>
                <option value="COMPLET">COMPLET</option>
                <option value="ANNULE">ANNULE</option>
                <option value="TERMINE">TERMINE</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSave} className="bg-[#4ECDC4] hover:bg-[#5218CC]">Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ReservationsTab() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Reservation | null>(null);
  const [formData, setFormData] = useState<Reservation>({
    dateReservation: new Date().toISOString().split('T')[0],
    statut: "EN_ATTENTE",
    montantTotal: 0,
    moyenPaiement: "CARTE_BANCAIRE",
    utilisateur: { id: 0 },
    spectacle: { id: 0 },
  });

  const loadData = async () => {
    try {
      const { data } = await reservationsAPI.getAll();
      setReservations(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des réservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      dateReservation: new Date().toISOString().split('T')[0],
      statut: "EN_ATTENTE",
      montantTotal: 0,
      moyenPaiement: "CARTE_BANCAIRE",
      utilisateur: { id: 0 },
      spectacle: { id: 0 },
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Reservation) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await reservationsAPI.update(editingItem.id!, formData);
        toast.success("Réservation modifiée avec succès");
      } else {
        await reservationsAPI.create(formData);
        toast.success("Réservation créée avec succès");
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) return;
    try {
      await reservationsAPI.delete(id);
      toast.success("Réservation supprimée");
      loadData();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des réservations</h2>
        <Button onClick={handleCreate} className="bg-[#4ECDC4] hover:bg-[#5218CC]">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle réservation
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur ID</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((reservation, index) => (
              <tr key={reservation.id ?? index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">#{reservation.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(reservation.dateReservation).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    reservation.statut === "CONFIRMEE" ? "bg-green-100 text-green-800" :
                    reservation.statut === "ANNULEE" ? "bg-red-100 text-red-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {reservation.statut}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {reservation.montantTotal.toFixed(2)} €
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">#{reservation.utilisateur.id}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(reservation)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(reservation.id!)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Modifier" : "Créer"} une réservation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Date de réservation</Label>
              <Input
                type="date"
                value={formData.dateReservation}
                onChange={(e) => setFormData({ ...formData, dateReservation: e.target.value })}
              />
            </div>
            <div>
              <Label>Statut</Label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
              >
                <option value="EN_ATTENTE">EN_ATTENTE</option>
                <option value="CONFIRMEE">CONFIRMEE</option>
                <option value="ANNULEE">ANNULEE</option>
              </select>
            </div>
            <div>
              <Label>Montant total (€)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.montantTotal}
                onChange={(e) => setFormData({ ...formData, montantTotal: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label>Moyen de paiement</Label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.moyenPaiement}
                onChange={(e) => setFormData({ ...formData, moyenPaiement: e.target.value as any })}
              >
                <option value="CARTE_BANCAIRE">CARTE_BANCAIRE</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="VIREMENT">VIREMENT</option>
                <option value="ESPECES">ESPECES</option>
              </select>
            </div>
            <div>
              <Label>ID Utilisateur</Label>
              <Input
                type="number"
                value={formData.utilisateur.id}
                onChange={(e) => setFormData({ ...formData, utilisateur: { id: parseInt(e.target.value) } })}
              />
            </div>
            <div>
              <Label>ID Spectacle</Label>
              <Input
                type="number"
                value={formData.spectacle.id}
                onChange={(e) => setFormData({ ...formData, spectacle: { id: parseInt(e.target.value) } })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSave} className="bg-[#4ECDC4] hover:bg-[#5218CC]">Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function BilletsTab() {
  const [billets, setBillets] = useState<Billet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Billet | null>(null);
  const [formData, setFormData] = useState<Billet>({
    numeroBillet: "",
    prix: 0,
    statut: "VALIDE",
    reservation: { id: 0 },
  });

  const loadData = async () => {
    try {
      const { data } = await billetsAPI.getAll();
      setBillets(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Erreur lors du chargement des billets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      numeroBillet: `BILL-${Date.now()}`,
      prix: 0,
      statut: "VALIDE",
      reservation: { id: 0 },
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Billet) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await billetsAPI.update(editingItem.id!, formData);
        toast.success("Billet modifié avec succès");
      } else {
        await billetsAPI.create(formData);
        toast.success("Billet créé avec succès");
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce billet ?")) return;
    try {
      await billetsAPI.delete(id);
      toast.success("Billet supprimé");
      loadData();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des billets</h2>
        <Button onClick={handleCreate} className="bg-[#4ECDC4] hover:bg-[#5218CC]">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau billet
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Numéro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Réservation ID</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {billets.map((billet, index) => (
              <tr key={billet.id ?? index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{billet.numeroBillet}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{billet.prix.toFixed(2)} €</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    billet.statut === "VALIDE" ? "bg-green-100 text-green-800" :
                    billet.statut === "UTILISE" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {billet.statut}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">#{billet.reservation.id}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(billet)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(billet.id!)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Modifier" : "Créer"} un billet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Numéro de billet</Label>
              <Input
                value={formData.numeroBillet}
                onChange={(e) => setFormData({ ...formData, numeroBillet: e.target.value })}
              />
            </div>
            <div>
              <Label>Prix (€)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.prix}
                onChange={(e) => setFormData({ ...formData, prix: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label>Statut</Label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
              >
                <option value="VALIDE">VALIDE</option>
                <option value="UTILISE">UTILISE</option>
                <option value="ANNULE">ANNULE</option>
              </select>
            </div>
            <div>
              <Label>ID Réservation</Label>
              <Input
                type="number"
                value={formData.reservation.id}
                onChange={(e) => setFormData({ ...formData, reservation: { id: parseInt(e.target.value) } })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSave} className="bg-[#4ECDC4] hover:bg-[#5218CC]">Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
