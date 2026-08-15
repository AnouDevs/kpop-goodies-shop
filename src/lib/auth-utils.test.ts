import { describe, it, expect, vi } from "vitest";
import { requireAdmin } from "./auth-utils";
import { auth } from "@/lib/auth";

// on "intercepte" le module next/headers : au lieu d'exécuter sa vraie fonction
// (qui plante hors d'un vrai serveur Next.js), on la remplace par une fausse
// qui retourne juste un objet Headers vide — suffisant pour que le code ne plante pas
vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

// on intercepte aussi le module auth (Better Auth) : on remplace sa fonction
// getSession par une fausse fonction vide qu'on va contrôler nous-mêmes
// dans chaque test (vi.fn() = une fonction "espionnée", vide pour l'instant)
vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

describe("requireAdmin", () => {
  // regroupe tous les tests qui concernent la fonction requireAdmin

  it("throws an error when no user is connected", async () => {
    // UN test précis : "ça lance une erreur quand personne n'est connecté"

    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    // pour CE test précis, on dit à la fausse getSession() de retourner "null"
    // (= personne n'est connecté), comme si la vraie base de données
    // n'avait trouvé aucune session valide

    await expect(requireAdmin()).rejects.toThrow("Not authenticated");
    // on appelle requireAdmin() (qui va utiliser en interne le faux getSession
    // qu'on vient de configurer), et on vérifie qu'elle lance bien une erreur
    // avec exactement le message "Not authenticated"
  });
});