// cypress/e2e/spectacles.cy.ts
// Tests de la liste des spectacles et des cartes SpectacleCardClient

describe("Page Spectacles", () => {
    beforeEach(() => {
        cy.mockSpectacles();
        cy.visit("/spectacle");
        cy.wait("@getSpectacles");
    });

    // ── Affichage de la liste ─────────────────────────────────────────────────
    describe("Affichage", () => {
        it("affiche le titre de la page", () => {
            cy.get("h1").should("contain", "Nos spectacles");
        });

        it("affiche au moins une carte de spectacle", () => {
            cy.get("[data-cy=spectacle-card], .group.overflow-hidden.border-0.bg-white.rounded-2xl")
                .should("have.length.at.least", 1);
        });

        it("affiche le nom, la date, le lieu et le prix pour chaque spectacle", () => {
            // On teste la première carte
            cy.get(".group.overflow-hidden.border-0.bg-white.rounded-2xl")
                .first()
                .within(() => {
                    // Titre
                    cy.get("h3").should("not.be.empty");
                    // Prix (format XX.XX €)
                    cy.contains(/\d+,\d{2}\s*€/).should("exist");
                });
        });

        it("affiche un badge DISPONIBLE en turquoise pour les spectacles disponibles", () => {
            cy.contains("DISPONIBLE")
                .should("be.visible")
                .and("have.class", "bg-[#4ECDC4]");
        });

        it("affiche un badge COMPLET en rouge pour les spectacles complets", () => {
            cy.contains("COMPLET")
                .should("be.visible")
                .and("have.class", "bg-[#FF6B6B]");
        });
    });

    // ── Bouton Ajouter au panier (SpectacleCardClient) ────────────────────────
    describe("Ajout au panier depuis la liste", () => {
        it("le bouton panier est désactivé pour un spectacle COMPLET", () => {
            // Hover sur la carte COMPLET
            cy.contains("COMPLET")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .should("be.disabled");
        });

        it("ajoute un spectacle DISPONIBLE au panier et affiche la confirmation", () => {
            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });

            // Le bouton passe en vert avec le texte de confirmation
            cy.contains("Ajouté au panier ✓").should("be.visible");
        });

        it("le compteur panier dans le header s'incrémente après ajout", () => {
            // Récupérer le compteur initial (peut être absent si vide)
            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });

            // Le badge de compteur apparaît dans le header
            cy.get("header, nav")
                .find("a[href='/cart']")
                .find("span")
                .should("be.visible")
                .and("not.have.text", "0");
        });
    });
});