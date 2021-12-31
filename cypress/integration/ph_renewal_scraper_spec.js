describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.visit('https://kiosk.na4.qless.com/kiosk/app/home/195')
        cy.get('[name="consumerfield_firstName"]')
          .type('hzen')

        cy.get('[name="consumerfield_lastName"]')
          .type('Caramba')

        cy.get('[name="consumerfield_email"]')
          .type('hzen316@gmail.com')

        cy.get('[name="consumerfield_phone"]')
          .type('4155628424')

        cy.get('#qBtnNext').click()

        // Clicking on Passport Flex Appointment Only
        cy.wait(1000)
        cy.get('#btnQueue_1173').click()

        // Clicking on sinle application button
        cy.wait(1000)
        cy.get('#tt4036').click()

        // If there are no available time slots
        cy.get('#appointmentTimeNonAvail')

        // If there are available time slots
        // cy.get('#appointmentTimeBlocks')

        // cy.get('#appointmentTimeBlocks').as("appointmentTimeBlocks")

        // const r = cy.get("@appointmentTimeBlocks").text()
        // console.log(r);
    })
  })

//   describe('My First Test', () => {
//     it('clicking "type" shows the right headings', () => {
//       cy.visit('https://example.cypress.io')
  
//       cy.pause()
  
//       cy.contains('type').click()
  
//       // Should be on a new URL which includes '/commands/actions'
//       cy.url().should('include', '/commands/actions')
  
//       // Get an input, type into it and verify that the value has been updated
//       cy.get('.action-email')
//         .type('fake@email.com')
//         .should('have.value', 'fake@email.com')
//     })
//   })