// cypress/support/commands.ts

// ─── Déclaration des types AVANT les commandes ────────────────────────────────
declare global {
    namespace Cypress {
        interface Chainable {
            loginMock(): void;
            logoutMock(): void;
            mockSpectacles(): void;
            addFirstSpectacleToCart(): void;
        }
    }
}

// ─── Simuler un utilisateur Auth0 connecté ───────────────────────────────────
Cypress.Commands.add("loginMock" as keyof Cypress.Chainable, () => {
    cy.intercept("GET", "/auth/me", {
        statusCode: 200,
        body: {
            sub: "auth0|test-user-123",
            name: "Test User",
            email: "test@pestacle.fr",
            picture: "https://via.placeholder.com/50",
        },
    }).as("getUser");
});

// ─── Simuler un utilisateur non connecté ─────────────────────────────────────
Cypress.Commands.add("logoutMock" as keyof Cypress.Chainable, () => {
    cy.intercept("GET", "/auth/me", { statusCode: 401, body: {} }).as("getUser");
});

// ─── Stub de l'API spectacles ─────────────────────────────────────────────────
Cypress.Commands.add("mockSpectacles" as keyof Cypress.Chainable, () => {
    cy.fixture("spectacles").then((spectacles) => {
        cy.intercept("GET", "**/api/spectacles**", {
            statusCode: 200,
            body: { content: spectacles },
        }).as("getSpectacles");
    });
});

// ─── Ajouter un spectacle au panier via l'UI ──────────────────────────────────
Cypress.Commands.add(
    "addFirstSpectacleToCart" as keyof Cypress.Chainable,
    () => {
        cy.visit("/spectacle");
        cy.wait("@getSpectacles");
        cy.contains("DISPONIBLE")
            .parents(".group")
            .trigger("mouseover")
            .find("button")
            .contains(/Ajouter au panier/i)
            .click({ force: true });
    }
);

export {};