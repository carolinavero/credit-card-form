describe('Card Form page', () => {

    beforeEach('visit the page', () => {
        cy.visit('/')
    })

    it('set the viewport', () => {
        cy.viewport('macbook-15')
        cy.wait(200)
        cy.viewport('macbook-13')
        cy.wait(200)
        cy.viewport('macbook-11')
        cy.wait(200)
        cy.viewport('ipad-2')
        cy.wait(200)
        cy.viewport('ipad-mini')
        cy.wait(200)
        cy.viewport('iphone-6+')
        cy.wait(200)
        cy.viewport('iphone-6')
        cy.wait(200)
        cy.viewport('iphone-5')
        cy.wait(200)
        cy.viewport('iphone-4')
        cy.wait(200)
        cy.viewport('iphone-3')
        cy.wait(200)
        cy.viewport('ipad-2', 'portrait')
        cy.wait(200)
        cy.viewport('iphone-4', 'landscape')
        cy.wait(200)
    })

    it('successfully loads', () => {

        cy.contains('form')
        cy.get('h1').should('contain', 'Fill your credit card information')
        cy.get('[data-cy=credit-card]').should('have.class', 'card')

    })

    it('fills the form', () => {

        const myCard = {
            cardNumber: '4141 4141 4141 4141',
            cardName: 'John Doe',
            expireDate: '12/21',
            cardCvc: '123'
        }

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
    })
        
    it('check if the card is flipping', () => {
        cy.get('[data-cy=card-cvc').first().focus().then(() => {
            cy.get('[data-cy=credit-card]').should('have.class', 'card-flipped')
        })
    })

    it('checks if errors is shown when an input is empty', () => {
        cy.get('[data-cy=submit]').click()
        cy.get('[data-cy=errors-list]').should('have.css', 'display', 'flex')
    })

    it('changes the card logo if it`s a mastercard number', () => {
        cy.get('[data-cy=card-number]').type('5255 5555 5555 5555').then(() => {
            cy.get('[data-cy=card-logo]').should('have.class', 'mastercard')
        })

    })

})