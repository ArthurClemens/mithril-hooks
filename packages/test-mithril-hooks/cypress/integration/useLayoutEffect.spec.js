/* global cy, describe, before, it */

describe("useLayoutEffect", () => {

  before(() => {
    cy.visit("/TestHookupUseLayoutEffect");
  });

  it("should get the size of a dom element", () => {
    cy.get("[data-test-id=render]").click(); // SMELL: Required for consistent Cypress results

    cy.get("[data-test-id=elementSize]").should("contain", "100");
    cy.get("[data-test-id=measuredHeight]").should("contain", "100");
    cy.get("[data-test-id=button]").click();
    cy.get("[data-test-id=elementSize]").should("contain", "110");
    cy.get("[data-test-id=measuredHeight]").should("contain", "110");
    cy.get("[data-test-id=clear-button]").click();
    cy.get("[data-test-id=measuredHeight]").should("contain", "0");
    cy.get("[data-test-id=button]").click();
    cy.get("[data-test-id=measuredHeight]").should("contain", "120");
  });

});
