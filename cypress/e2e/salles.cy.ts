// cypress/e2e/salles.cy.ts
// Tests de la page Nos Salles et du composant SalleCard

describe("Page Nos Salles", () => {
    beforeEach(() => {
        cy.visit("/salles");
    });

    // ── Affichage ─────────────────────────────────────────────────────────────
    describe("Affichage", () => {
        it("affiche le titre principal", () => {
            cy.get("h1").should("contain", "Nos Salles");
        });

        it("affiche les 4 salles", () => {
            // 4 salles définies en dur dans la page
            cy.get(".group.overflow-hidden.border-0.bg-white.rounded-3xl").should(
                "have.length",
                4
            );
        });

        it("affiche le nom, la capacité et l'adresse de chaque salle", () => {
            cy.get(".group.overflow-hidden.border-0.bg-white.rounded-3xl")
                .first()
                .within(() => {
                    cy.get("h3").should("not.be.empty");
                    // Capacité (icône Users)
                    cy.get(".rounded-full span, .font-bold").should("exist");
                    // Adresse
                    cy.contains("Paris").should("exist");
                });
        });

        it("affiche les amenities et équipements de chaque salle", () => {
            cy.get(".group.overflow-hidden.border-0.bg-white.rounded-3xl")
                .first()
                .within(() => {
                    cy.contains("Commodités").should("be.visible");
                    cy.contains("Équipements").should("be.visible");
                });
        });
    });

    // ── Copie d'adresse ───────────────────────────────────────────────────────
    describe("Copie de l'adresse", () => {
        it("le bouton copie l'adresse et affiche l'icône de confirmation", () => {
            // On autorise l'accès au clipboard dans Cypress
            cy.window().then((win) => {
                cy.stub(win.navigator.clipboard, "writeText").resolves();
            });

            cy.get(".group.overflow-hidden.border-0.bg-white.rounded-3xl")
                .first()
                .find("button[class*='rounded-full']")
                .click();

            // L'icône Check remplace l'icône Copy
            cy.get(".group.overflow-hidden.border-0.bg-white.rounded-3xl")
                .first()
                .find("button[class*='bg-green-500']")
                .should("exist");
        });
    });

    // ── CTA ───────────────────────────────────────────────────────────────────
    describe("Bouton Voir les spectacles", () => {
        it('affiche un bouton "Voir les spectacles" dans chaque carte', () => {
            cy.get(".group.overflow-hidden.border-0.bg-white.rounded-3xl").each(
                ($card) => {
                    cy.wrap($card)
                        .contains("Voir les spectacles")
                        .should("be.visible");
                }
            );
        });
    });
});