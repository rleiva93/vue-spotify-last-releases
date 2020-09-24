// https://docs.cypress.io/api/introduction/api.html

describe("Homepage Test", () => {
  it("Visits the app root url and check title", () => {
    cy.visit("/");
    cy.contains("h1", "New releases");
  });

  it("Checks that error message is displayed", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://api.spotify.com/v1/browse/new-releases/?offset=0&limit=9",
      status: 500,
      response: {},
    }).as("releases");
    cy.visit("/");

    cy.wait("@releases")
      .its("response.body")
      .should("be", "object");

    cy.contains(".error-msg", "An error happened. Please try again.");
  });

  it("Interacts with albums list", () => {
    cy.server();
    cy.route(
      "GET",
      "https://api.spotify.com/v1/browse/new-releases/?offset=0&limit=9"
    ).as("releases");
    cy.visit("/");

    // Validates that initially loads 9 cards
    cy.wait("@releases")
      .its("response.body")
      .should("be", "object");
    cy.get(".album-card").should("have.length", 9);

    // Validates that when user scrolls, load more elements
    cy.get("body").scrollIntoView({ offset: { top: 2000, left: 0 } });
    cy.get(".album-card").should("have.length.to.be.greaterThan", 9);
  });

  it("Clicks on a release card", () => {
    cy.server();
    cy.route(
      "GET",
      "https://api.spotify.com/v1/browse/new-releases/?offset=0&limit=9"
    ).as("releases");
    cy.visit("/");

    cy.wait("@releases")
      .its("response.body")
      .should("be", "object");

    cy.get(".album-card:nth-child(3)").click();
    cy.url().should("include", "/album");
  });
});

describe("Album detail Test", () => {
  it("Visits the app root url and check title", () => {
    cy.visit("#/album/1vTV3bbycMPkbIocAma0eN");
    cy.contains("h1", "New releases");
  });

  it("Checks that error message is displayed", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://api.spotify.com/v1/albums/4F3rUFQcKJm6b1BsJRwAbf/",
      status: 500,
      response: {},
    }).as("albumMock");
    cy.visit("#/album/4F3rUFQcKJm6b1BsJRwAbf");

    cy.wait("@albumMock")
      .its("response.body")
      .should("be", "object");

    cy.contains(".error-msg", "An error happened. Please try again.");
  });

  it("Interacts with page and audio if exists", () => {
    cy.server();
    cy.route(
      "GET",
      "https://api.spotify.com/v1/albums/1vTV3bbycMPkbIocAma0eN/"
    ).as("albumReal");

    cy.visit("#/album/1vTV3bbycMPkbIocAma0eN");

    cy.wait("@albumReal")
      .its("response.body")
      .should("be", "object");

    cy.get(".tracks").should("be.visible");

    const playBtn = cy.get(".track:nth-child(1) .play-btn");
    playBtn.should("to.exist");

    playBtn.click();
    cy.wait(500);
    cy.get(".track:nth-child(1) i").should("have.class", "mdi-pause");

    playBtn.click();
    cy.wait(500);
    cy.get(".track:nth-child(1) i").should("have.class", "mdi-play");
  });
});

describe("404 Test", () => {
  it("Visits a page that doesn't exists", () => {
    cy.visit("#/asdf");
    cy.contains("h1", "New releases");
    cy.contains(
      ".error-msg",
      "The page you are trying to get, went out for lunch."
    );
  });
});
