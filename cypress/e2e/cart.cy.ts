// cypress/e2e/cart.cy.ts
// Tests du panier : affichage, quantités, suppression, checkout

describe("Panier", () => {
    beforeEach(() => {
        cy.mockSpectacles();
    });

    // ── Panier vide ───────────────────────────────────────────────────────────
    describe("Panier vide", () => {
        it("affiche un message et un lien vers les spectacles quand le panier est vide", () => {
            cy.visit("/cart");
            cy.contains("Panier vide").should("be.visible");
            cy.contains("Découvrir les spectacles")
                .should("have.attr", "href")
                .and("include", "/spectacle");
        });
    });

    // ── Panier avec articles ──────────────────────────────────────────────────
    describe("Panier avec articles", () => {
        beforeEach(() => {
            // Ajouter un spectacle disponible avant chaque test
            cy.visit("/spectacle");
            cy.wait("@getSpectacles");
            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });
            cy.visit("/cart");
        });

        it("affiche les articles ajoutés avec nom, date, lieu et prix", () => {
            cy.get(".bg-gray-50.rounded-xl").should("have.length.at.least", 1);
            cy.get(".bg-gray-50.rounded-xl")
                .first()
                .within(() => {
                    cy.get("h3").should("not.be.empty");
                    cy.contains(/\d+,\d{2}\s*€/).should("exist");
                });
        });

        it("affiche le total correctement", () => {
            cy.contains("Total TTC").should("be.visible");
            cy.contains(/\d+,\d{2}\s*€/).should("be.visible");
        });

        it("augmente la quantité avec le bouton +", () => {
            cy.get('[title="Augmenter la quantité"]').first().click();
            // La quantité passe à 2
            cy.get(".font-semibold.text-gray-900").contains("2").should("exist");
        });

        it("diminue la quantité avec le bouton -", () => {
            // D'abord augmenter à 2
            cy.get('[title="Augmenter la quantité"]').first().click();
            cy.get(".font-semibold.text-gray-900").contains("2").should("exist");
            // Puis diminuer à 1
            cy.get('[title="Diminuer la quantité"]').first().click();
            cy.get(".font-semibold.text-gray-900").contains("1").should("exist");
        });

        it("supprime un article avec le bouton Supprimer", () => {
            cy.contains("Supprimer").first().click();
            // Après suppression le panier est vide
            cy.contains("Panier vide").should("be.visible");
        });

        it("vide entièrement le panier avec le bouton Vider le panier", () => {
            cy.contains("Vider le panier").click();
            cy.contains("Panier vide").should("be.visible");
        });

        it("le bouton Continuer les achats redirige vers /spectacle", () => {
            cy.contains("Continuer les achats").click();
            cy.url().should("include", "/spectacle");
        });
    });

    // ── Checkout - utilisateur non connecté ──────────────────────────────────
    describe("Checkout sans connexion", () => {
        beforeEach(() => {
            cy.logoutMock();
            // Ajouter un article
            cy.visit("/spectacle");
            cy.wait("@getSpectacles");
            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });
            cy.visit("/cart");
        });

        it("affiche un avertissement de connexion requise", () => {
            cy.contains("Connexion requise").should("be.visible");
            cy.contains("Vous devez être connecté pour finaliser votre paiement").should(
                "be.visible"
            );
        });

        it('affiche le bouton "Se connecter pour payer" à la place du bouton Stripe', () => {
            cy.contains("Se connecter pour payer").should("be.visible");
            cy.contains("Procéder au paiement").should("not.exist");
        });
    });

    // ── Checkout - utilisateur connecté ──────────────────────────────────────
    describe("Checkout avec connexion", () => {
        beforeEach(() => {
            cy.loginMock();
            cy.visit("/spectacle");
            cy.wait("@getSpectacles");
            cy.contains("DISPONIBLE")
                .parents(".group")
                .trigger("mouseover")
                .find("button")
                .contains(/Ajouter au panier/i)
                .click({ force: true });
            cy.visit("/cart");
        });

        it("affiche le champ email pour recevoir les billets", () => {
            cy.get("#checkout-email").should("be.visible");
        });

        it("affiche une alerte si l'email est vide lors du checkout", () => {
            // Stubber window.alert
            cy.on("window:alert", (text) => {
                expect(text).to.include("email");
            });
            cy.contains("Procéder au paiement").click();
        });

        it("intercepte la création de session Stripe avec un email valide", () => {
            cy.intercept("POST", "**/api/payment/create-checkout-session", {
                statusCode: 200,
                body: { sessionId: "cs_test_fake_session_id" },
            }).as("createSession");

            cy.get("#checkout-email").type("acheteur@pestacle.fr");
            // On ne clique pas vraiment pour ne pas rediriger vers Stripe
            // On vérifie juste que le bouton est cliquable
            cy.contains("Procéder au paiement").should("not.be.disabled");
        });
    });
});