describe('DMV Real ID Test', () => {
    it('Checks for real ID appointments', () => {
        // Edison branch
        cy.visit('https://telegov.njportal.com/njmvc/AppointmentWizard/12/132')

        // South plainfield branch
        // cy.visit('https://telegov.njportal.com/njmvc/AppointmentWizard/12/131')
        // cy.get('.availableTimeslot')

        // Cape May. Has appointments
        // cy.visit('https://telegov.njportal.com/njmvc/AppointmentWizard/12/126')
        cy.get('.availableTimeslot').first().click()

        cy.get('[name="Customer.FirstName"]')
        .type('Hanzen')

        cy.get('[name="Customer.LastName"]')
        .type('Lim')

        cy.get('[name="Customer.Email"]')
        .type('hanzenlim@gmail.com')

        cy.get('[name="Customer.PhoneNumber"]')
        .type('4155628424')

        cy.get('[name="driverLicense"]')
        .type('L44083147105891')

        cy.get('[type="checkbox"]').first().check()
        // cy.get('[name="Customer.ReceiveTexts"]')
        // .check()

        cy.get('.attestationtext #receiveTexts')
        .click()

        cy.get('[data-callback="onSubmit"]').first()
        .click()
    })
  })

