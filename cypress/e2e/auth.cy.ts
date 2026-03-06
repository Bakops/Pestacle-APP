// cypress/e2e/auth.cy.ts
// Tests de l'authentification Auth0 et du bouton de déconnexion

describe("Authentification", () => {
    // ── AddToCartButton - invite à se connecter ───────────────────────────────
    describe("AddToCartButton - utilisateur non connecté", () => {
        beforeEach(() => {
            // Simuler un utilisateur non connecté (pas de session Auth0)
            cy.intercept("GET", "/auth/me", { statusCode: 401 }).as("getUser");
            cy.mockSpectacles();
        });

        it("affiche le prompt de connexion au clic sur Ajouter au panier", () => {
            cy.visit("/spectacle");
            cy.wait("@getSpectacles");

            // Hover sur une carte disponible pour révéler le bouton
            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });

            // Un message invite à se connecter
            cy.contains("Vous devez être connecté pour réserver").should(
                "be.visible"
            );
            cy.contains("Se connecter pour réserver").should("be.visible");
        });

        it("affiche un bouton Annuler qui ferme le prompt", () => {
            cy.visit("/spectacle");
            cy.wait("@getSpectacles");

            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });

            cy.contains("Annuler").click();
            cy.contains("Vous devez être connecté pour réserver").should(
                "not.exist"
            );
        });

        it('le bouton "Se connecter pour réserver" pointe vers /api/auth/login', () => {
            cy.visit("/spectacle");
            cy.wait("@getSpectacles");

            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });

            cy.contains("Se connecter pour réserver")
                .closest("a")
                .should("have.attr", "href")
                .and("include", "/api/auth/login");
        });
    });

    // ── Modal de déconnexion ──────────────────────────────────────────────────
    describe("LogoutButtonWithModal", () => {
        it("affiche la modal de confirmation au clic sur Déconnexion", () => {
            // Naviguer vers une page qui contient le bouton (ex: profil)
            // Pour tester directement le composant, on visite la page et on cherche le bouton
            cy.visit("/");
            // Si le bouton de déconnexion est visible dans la nav
            cy.get("button").contains("Déconnexion").then(($btn) => {
                if ($btn.length) {
                    cy.wrap($btn).click();
                    cy.contains("Voulez-vous vraiment vous déconnecter ?").should(
                        "be.visible"
                    );
                }
            });
        });

        it("ferme la modal en cliquant Non", () => {
            cy.visit("/");
            cy.get("button")
                .contains("Déconnexion")
                .then(($btn) => {
                    if ($btn.length) {
                        cy.wrap($btn).click();
                        cy.contains("Non").click();
                        cy.contains("Voulez-vous vraiment vous déconnecter ?").should(
                            "not.exist"
                        );
                    }
                });
        });

        it("redirige vers /auth/logout en cliquant Oui", () => {
            cy.visit("/");
            cy.get("button")
                .contains("Déconnexion")
                .then(($btn) => {
                    if ($btn.length) {
                        cy.wrap($btn).click();
                        // Intercepter la redirection logout
                        cy.intercept("GET", "/auth/logout*").as("logout");
                        cy.contains("Oui").click();
                        cy.wait("@logout");
                    }
                });
        });
    });
});