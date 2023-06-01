describe('API Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9001/#!/book-dir');
    }
    )
    // Go through api results and check that each book has a title
    it('should have a title for each book', () => {
        cy.get('h3').each(($el, index, $list) => {
            cy.wrap($el).should('contain', 'Title:');
        }
        )
    }
    )
})