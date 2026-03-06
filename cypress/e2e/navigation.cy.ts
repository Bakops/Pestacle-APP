// cypress/e2e/navigation.cy.ts
// Tests de la navigation globale (header, footer, liens)

describe("Navigation", () => {
    beforeEach(() => {
        cy.mockSpectacles();
        cy.visit("/");
    });

    // ── Header ────────────────────────────────────────────────────────────────
    describe("Header", () => {
        it("affiche le logo Pestacle", () => {
            cy.get("header img[alt*='Logo'], header img[alt*='logo']").should(
                "be.visible"
            );
        });

        it("affiche le bouton Panier avec lien vers /cart", () => {
            cy.get("a[href='/cart']").should("be.visible");
            cy.contains("Panier").should("be.visible");
        });

        it("le compteur du panier est absent si le panier est vide", () => {
            cy.get("a[href='/cart'] span.bg-\\[\\#FF6B6B\\]").should("not.exist");
        });

        it("affiche le compteur panier après ajout d'un article", () => {
            cy.visit("/spectacle");
            cy.wait("@getSpectacles");
            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });

            cy.get("a[href='/cart']").find("span").should("be.visible");
        });
    });

    // ── Footer ────────────────────────────────────────────────────────────────
    describe("Footer", () => {
        it("affiche le logo dans le footer", () => {
            cy.get("footer img[alt*='Logo']").should("be.visible");
        });

        it("affiche les liens de navigation du footer", () => {
            cy.get("footer").within(() => {
                cy.contains("Spectacles").should("be.visible");
                cy.contains("Informations").should("be.visible");
                cy.contains("Services").should("be.visible");
            });
        });

        it("affiche les icônes des réseaux sociaux", () => {
            cy.get("footer").find("a").should("have.length.at.least", 4);
        });

        it("affiche le copyright 2026", () => {
            cy.get("footer").contains("2026 Pestacle").should("be.visible");
        });

        it("affiche les liens légaux", () => {
            cy.get("footer").within(() => {
                cy.contains("Mentions légales").should("be.visible");
                cy.contains("Politique de confidentialité").should("be.visible");
                cy.contains("CGV").should("be.visible");
            });
        });
    });

    // ── Routing ───────────────────────────────────────────────────────────────
    describe("Routing principal", () => {
        it("/ charge la page d'accueil", () => {
            cy.url().should("eq", Cypress.config("baseUrl") + "/");
            cy.get("section").should("exist");
        });

        it("/spectacle charge la liste des spectacles", () => {
            cy.visit("/spectacle");
            cy.wait("@getSpectacles");
            cy.get("h1").should("contain", "spectacle");
        });

        it("/cart charge la page panier", () => {
            cy.visit("/cart");
            cy.get("h1").should("contain", "panier");
        });

        it("/salles charge la page des salles", () => {
            cy.visit("/salles");
            cy.get("h1").should("contain", "Salles");
        });
    });
});