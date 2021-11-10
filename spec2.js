/**
 * TODO: modify script below to test loading element at start of app;
 * run it multiple times to ensure it is not a flaky test;
 * hint: using cy.wait is forbidden but you can use cy.intercept
 */

describe('App', () => {
  it.only('should show loading element at start', { retries: 3 },() => {
    cy.visit('/');
    cy.intercept('GET', '/todos', { fixture: 'todos.json' })
    cy.get('.loading').should('be.visible');
    cy.get('.loading').should('not.be.visible');
    cy.get('li.todo').should('have.length', 2);
  })
})
