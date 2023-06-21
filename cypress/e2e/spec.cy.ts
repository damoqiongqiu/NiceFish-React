describe("signIn niceFish spec", () => {
  const baseUrl = Cypress.env("baseUrl");
  it("login", async () => {
    cy.visit("/");
    cy.get(".fa-sign-in").click();
    cy.get(".name").type("admin");
    cy.get(".pwd").type("123456");
    cy.get(".btn-login").click();

    cy.url().should("include", "/home");
    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({
        [baseUrl]: {
          user: "admin",
        },
      });
    });
  });
});
