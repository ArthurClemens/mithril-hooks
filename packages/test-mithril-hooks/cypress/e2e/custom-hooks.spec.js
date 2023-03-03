
describe('custom hooks', () => {
  beforeEach(() => {
    cy.visit('/TestCustomHooks');
  });

  it('should use a custom hook counter function', () => {
    cy.get('[data-test-id=CounterCustomHooks] [data-test-id=count]').should(
      'contain',
      '0',
    );
    cy.get(
      '[data-test-id=CounterCustomHooks] [data-test-id=increment]',
    ).click();
    cy.get('[data-test-id=CounterCustomHooks] [data-test-id=count]').should(
      'contain',
      '1',
    );
    cy.get(
      '[data-test-id=CounterCustomHooks] [data-test-id=decrement]',
    ).click();
    cy.get('[data-test-id=CounterCustomHooks] [data-test-id=count]').should(
      'contain',
      '0',
    );
  });

  it('should use a custom hook functions that references another custom hook function', () => {
    cy.get('[data-test-id=ItemsCustomHooks] [data-test-id=count]').should(
      'contain',
      '1',
    );
    cy.get('[data-test-id=ItemsCustomHooks] [data-test-id=increment]').click();
    cy.get('[data-test-id=ItemsCustomHooks] [data-test-id=count]').should(
      'contain',
      '2',
    );
    cy.get('[data-test-id=ItemsCustomHooks] [data-test-id=decrement]').click();
    cy.get('[data-test-id=ItemsCustomHooks] [data-test-id=count]').should(
      'contain',
      '1',
    );
  });
});
