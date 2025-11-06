export type UserRole = "user" | "admin"

export interface User {
    id: string
    email: string
    nom: string
    prenom: string
    role: UserRole
}

// Simulation d'utilisateurs (à remplacer par vraie base de données)
export const mockUsers: User[] = [
    {
        id: "1",
        email: "admin@pestacle.com",
        nom: "Admin",
        prenom: "Super",
        role: "admin"
    },
    {
        id: "2",
        email: "user@pestacle.com",
        nom: "Dupont",
        prenom: "Jean",
        role: "user"
    }
]

// Fonction de connexion simulée
export async function login(email: string, password: string): Promise<User | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulation : admin@pestacle.com / admin123 ou user@pestacle.com / user123
            if (email === "admin@pestacle.com" && password === "admin123") {
                resolve(mockUsers[0])
            } else if (email === "user@pestacle.com" && password === "user123") {
                resolve(mockUsers[1])
            } else {
                resolve(null)
            }
        }, 500)
    })
}

// Fonction pour vérifier si l'utilisateur est admin
export function isAdmin(user: User | null): boolean {
    return user?.role === "admin"
}