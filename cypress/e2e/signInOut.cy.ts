interface ISignIn {
  signInIcon: string;
  signOutIcon: string;
  nameInput: string;
  pwdInput: string;
  nameValue: string;
  pwdValue: string;
  signInBtn: string;
  homeUrl: string;
  postUrl: string;
}
describe('signIn && signOut niceFish spec', () => {
  const baseUrl = Cypress.env('baseUrl');
  beforeEach(() => {
    cy.fixture('signIn').as('signIn');
  });
  it('signIn && signOut correctly', () => {
    cy.get<ISignIn>('@signIn').then((signIn) => {
      cy.visit('/');
      cy.get(signIn.signInIcon).click();
      cy.get(signIn.nameInput).type(signIn.nameValue);
      cy.get(signIn.pwdInput).type(signIn.pwdValue);
      cy.get(signIn.signInBtn).click();
      cy.url().should('include', signIn.homeUrl);
      cy.getAllLocalStorage().then((result) => {
        console.log(result);
        expect(result).to.deep.equal({
          [baseUrl]: {
            user: signIn.nameValue
          }
        });
      });
      cy.get(signIn.signOutIcon).click();
      cy.url().should('include', signIn.postUrl);
      cy.getAllLocalStorage().then((result) => {
        console.log(result, 'result');
        expect(result).to.deep.equal({});
      });
    });
  });
});
