// Login to admin page and test content
describe('Admin Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9001/#!/');
    }
    )
    it('logging in with correct password', () => {
        // Click on admin page
        cy.get('a').contains('Admin').click();

        // Input password
        cy.get('input').type('123');

        // Click login
        cy.get('button').contains('Login').click();

        // see if alert pops up
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Successfully logged in.')
        }
        )
    }
    )
    it('logging in with incorrect password', () => {
        cy.get('a').contains('Admin').click();
        cy.get('input').type('321');
        cy.get('button').contains('Login').click();
        // see if alert pops up
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Wrong Password. Try again.')
        }
        )
    }
    )
    it('logging in with no password', () => {
        cy.get('a').contains('Admin').click();

        // Input nothing
        // cy.get('input').type('');

        cy.get('button').contains('Login').click();
        // see if alert pops up
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Wrong Password. Try again.')
        }
        )
    }
    )
})