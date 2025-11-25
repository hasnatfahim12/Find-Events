describe('Events List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/eventsList')
  })

  it('should filter events by city', () => {
    // Open the city dropdown
    cy.get('[data-cy=city-filter]').click()

    // Select a city option
    cy.get('[data-cy=options]').contains('Berlin').click()

    // Verify that the URL query parameter is updated
    cy.url().should('include', 'city=Berlin')

    // Ensure that filtered events are displayed
    cy.get('[data-cy=event-card]').should('have.length.gt', 0) // Assert that some event cards are visible
  })

  it('should filter events by cities & category', () => {
    // Open the city dropdown
    cy.get('[data-cy=city-filter]').click()

    // Select a city option
    cy.get('[data-cy=options]').contains('Berlin').click()

    cy.get('[data-cy=options]').contains('Hamburg').click()

    cy.get('[data-cy=category-filter]').click()

    cy.get('[data-cy=options]').contains('Junggesellenabschied').click()

    // Verify that the URL query parameter is updated
    cy.url().should('include', 'city=Berlin,Hamburg&category=Junggesellenabschied')

    // Ensure that filtered events are displayed
    cy.get('[data-cy=event-card]').should('have.length.gt', 0) // Assert that some event cards are visible
  })

  

})