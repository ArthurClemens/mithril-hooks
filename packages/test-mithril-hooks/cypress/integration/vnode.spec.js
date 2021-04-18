/* global cy, describe, before, it */

describe('Children', () => {
  before(() => {
    cy.visit('/TestChildren');
  });

  it('should render children', () => {
    cy.get('[data-test-id=Children]').should('contain', 'This is a child');
  });
});
