/* global cy, describe, before, it */

describe('useEffect', () => {
  before(() => {
    cy.visit('/TestUseEffect');
  });

  it('should render with the initial value', () => {
    cy.get('#root.dark-mode').should('not.exist');
  });

  it('should update the class list after setDarkModeEnabled', () => {
    cy.get('[data-test-id=dark] [data-test-id=button]').click();
    cy.get('body.dark-mode').should('exist');
    cy.get('[data-test-id=dark] [data-test-id=button]').click();
  });

  it('should cleanup', () => {
    cy.get('[data-test-id=cleanup-wrapper] [data-test-id=button]').click();

    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-1-called]').should(
      'contain',
      'false',
    );
    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-2-called]').should(
      'contain',
      'false',
    );
    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-3-called]').should(
      'contain',
      'false',
    );
    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-4-called]').should(
      'contain',
      'false',
    );
    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-5-called]').should(
      'contain',
      'false',
    );

    cy.get('[data-test-id=cleanup] input[data-test-id=source]').type('A');

    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-1-called]').should(
      'contain',
      'true',
    );
    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-2-called]').should(
      'contain',
      'true',
    );
    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-3-called]').should(
      'contain',
      'true',
    );
    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-4-called]').should(
      'contain',
      'false',
    ); // effect only runs on mount / unmount
    cy.get('[data-test-id=cleanup] [data-test-id=cleanup-5-called]').should(
      'contain',
      'true',
    );

    cy.get(
      '[data-test-id=cleanup-wrapper] [data-test-id=cleanups-called]',
    ).should('contain', '1,2,3,5');

    cy.get('[data-test-id=cleanup-wrapper] [data-test-id=button]').click();

    cy.get(
      '[data-test-id=cleanup-wrapper] [data-test-id=cleanups-called]',
    ).should('contain', '1,2,3,4,5');
  });
});
