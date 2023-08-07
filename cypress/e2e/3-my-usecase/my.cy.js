describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8091');
    })

    it('check main container', () => {
        cy.get('.main-container').should('have.length', 1)
    })
});