describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9001/#!/');
    }
    )
    it('should be titled', () => {
        cy.get('h1').should('contain', 'Home Page');
    }
    )
    it('should show header', () => {
        cy.get('h1').should('contain', 'POC Webapp');
    }
    )
}) 