describe('Book Dir Page Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9001/#!/book-dir');
    }
    )
    it('should be titled', () => {
        cy.get('h2').should('contain', 'List of available books:');
    }
    )
    it('should show header', () => {
        cy.get('h1').should('contain', 'POC Webapp');
    }
    )
})