
describe('Initial attributes', () => {
  before(() => {
    cy.visit('/TestInitialAttributes');
  });

  it('should render with initial attributes', () => {
    cy.get('[data-test-id=title]').should('contain', 'Hello');
  });

  it('should render with instance props', () => {
    cy.get('[data-test-id=count]').should('contain', '1');
  });
});
