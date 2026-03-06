// cypress/e2e/home.cy.ts
// Tests de la page d'accueil (Hero, FeaturedShows, UpcomingShows, Newsletter…)

describe("Page d'accueil", () => {
    beforeEach(() => {
        cy.mockSpectacles();
        cy.visit("/");
    });

    // ── Hero Section ──────────────────────────────────────────────────────────
    describe("Hero Section", () => {
        it("affiche le hero avec un titre et les boutons d'action", () => {
            cy.get("section").first().should("be.visible");
            cy.contains("Réserver").should("be.visible");
            cy.contains("Bande-annonce").should("be.visible");
        });

        it("navigue vers /spectacle en cliquant sur Réserver", () => {
            cy.contains("Réserver").first().click();
            cy.url().should("include", "/spectacle");
        });

        it("ouvre la modal vidéo au clic sur Bande-annonce", () => {
            cy.contains("Bande-annonce").first().click();
            cy.get("iframe").should("be.visible");
        });

        it("ferme la modal vidéo avec le bouton X", () => {
            cy.contains("Bande-annonce").first().click();
            cy.get("iframe").should("be.visible");
            cy.get('[aria-label="Fermer la vidéo"]').click();
            cy.get("iframe").should("not.exist");
        });

        it("change de slide au clic sur les indicateurs de pagination", () => {
            cy.get('[aria-label^="Aller au slide"]').eq(1).click();
            // Le slide doit changer (indicator actif a classe différente)
            cy.get('[aria-label^="Aller au slide"]')
                .eq(1)
                .should("have.class", "bg-[#FF6B6B]");
        });
    });

    // ── Spectacles à l'affiche ────────────────────────────────────────────────
    describe("Section Spectacles à l'affiche", () => {
        it("affiche les cartes de spectacles chargées depuis l'API", () => {
            cy.wait("@getSpectacles");
            cy.contains("Spectacles à l'affiche").should("be.visible");
            cy.get("section")
                .contains("Spectacles à l'affiche")
                .parents("section")
                .find("a")
                .should("have.length.at.least", 1);
        });

        it("redirige vers la page détail au clic sur une carte", () => {
            cy.wait("@getSpectacles");
            cy.contains("Spectacles à l'affiche")
                .parents("section")
                .find("a")
                .first()
                .click();
            cy.url().should("match", /\/spectacle\/\d+/);
        });

        it('le bouton "Voir tout" redirige vers /spectacle', () => {
            cy.contains("Voir tout").click();
            cy.url().should("include", "/spectacle");
        });
    });

    // ── Newsletter ────────────────────────────────────────────────────────────
    describe("Section Newsletter", () => {
        it("affiche le formulaire de newsletter", () => {
            cy.contains("Abonnez-vous à notre newsletter").should("be.visible");
            cy.get('input[type="email"]').should("be.visible");
            cy.contains("S'abonner").should("be.visible");
        });

        it("accepte la saisie d'un email valide", () => {
            cy.get('input[type="email"]').type("testeur@pestacle.fr");
            cy.get('input[type="email"]').should("have.value", "testeur@pestacle.fr");
        });
    });

    // ── Section Pestacle Explorer (vidéos) ────────────────────────────────────
    describe("Section Pestacle chez vous", () => {
        it("affiche les cartes de spectacles streamables", () => {
            cy.contains("Prolongez l'expérience Pestacle chez vous").should(
                "be.visible"
            );
        });

        it("ouvre la modal vidéo au clic sur une carte", () => {
            cy.contains("Prolongez l'expérience Pestacle chez vous")
                .parents("section")
                .find("img")
                .first()
                .trigger("mouseover");

            // Cliquer le bouton play visible au hover
            cy.contains("Prolongez l'expérience Pestacle chez vous")
                .parents("section")
                .find("button")
                .first()
                .click({ force: true });

            cy.get("iframe").should("be.visible");
        });
    });
});