// https://docs.cypress.io/api/introduction/api.html

describe("Homepage Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "New releases");
  });
});
