import api from "./http"
import { Spectacle } from "./types"

export async function getSpectacles(): Promise<Spectacle[]> {
  const { data } = await api.get<unknown>("/spectacles")

  // API peut renvoyer soit un tableau, soit une page Spring (`content`).
  if (Array.isArray(data)) return data as Spectacle[]
  if (data && typeof data === "object" && Array.isArray((data as any).content)) {
    return (data as any).content as Spectacle[]
  }

  throw new Error("Réponse inattendue pour /spectacles")
}
