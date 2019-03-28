/* global cy, describe, before, it */

describe("useCallback", () => {

  before(() => {
    cy.visit("/TestUseCallback");
  });

  it("should store a memoized callback function and only update it after updating a variable", () => {
    cy.get("[data-test-id=callbackReference]").should("contain", "false");
    cy.get("[data-test-id=render]").click();
    cy.get("[data-test-id=callbackReference]").should("contain", "false");
    cy.get("[data-test-id=updatePreviousCallback]").click();
    cy.get("[data-test-id=callbackReference]").should("contain", "true");
    cy.get("[data-test-id=render]").click();
    cy.get("[data-test-id=callbackReference]").should("contain", "true");
  });

});
