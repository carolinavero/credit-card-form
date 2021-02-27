describe('The home page', () => {


    it('successfully loads', () => {

        const myCard = {
            cardNumber: '4141 4141 4141 4141',
            cardName: 'John Doe',
            expireDate: '12/21',
            cardCvc: '123'
        }

        cy.visit('/')
        cy.contains('form')

        cy.get('h1').should('contain', 'Fill your credit card information')

        cy.get('[data-cy=credit-card]').should('have.class', 'card')

        cy.get('[data-cy=card-number]')
            .type(myCard.cardNumber)
            .should('have.value', myCard.cardNumber)

        cy.get('[data-cy=card-name]')
            .type(myCard.cardName)
            .should('have.value', myCard.cardName)

        cy.get('[data-cy=expire-date]')
            .type(myCard.expireDate)
            .should('have.value', myCard.expireDate)

        cy.get('[data-cy=card-cvc]')
            .type(myCard.cardCvc)
            .should('have.value', myCard.cardCvc)

        cy.get('form').submit();


    })


})