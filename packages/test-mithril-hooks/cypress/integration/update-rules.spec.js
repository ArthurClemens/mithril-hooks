/* global cy, describe, before, it */

describe("update rules", () => {

  before(() => {
    cy.visit("/TestHookupUpdateRules");
  });

  it("empty array: should run the effect only once with mount only", () => {
    cy.get("[data-test-id=RunCountOnMount] [data-test-id=effectRunCount]").should("contain", "effect called: 1");
    cy.get("[data-test-id=RunCountOnMount] [data-test-id=button]").click();
    cy.get("[data-test-id=RunCountOnMount] [data-test-id=effectRunCount]").should("contain", "effect called: 1");
    cy.get("[data-test-id=RunCountOnMount] [data-test-id=renderRunCount]").should("not.contain", "render called: 1");
  });

  it("array with variable: should run the effect only after variable change", () => {
    cy.get("[data-test-id=RunCountOnChange] [data-test-id=effectRunCount]").should("contain", "effect called: 1");
    cy.get("[data-test-id=RunCountOnChange] [data-test-id=button]").click();
    cy.get("[data-test-id=RunCountOnChange] [data-test-id=effectRunCount]").should("contain", "effect called: 2");
    cy.get("[data-test-id=RunCountOnChange] [data-test-id=renderRunCount]").should("not.contain", "render called: 2");
  });

  it("no array: should run the effect at each render", () => {
    cy.get("[data-test-id=RunCountOnRender] [data-test-id=effectRunCount]").should("contain", "effect called: 1");
    cy.get("[data-test-id=RunCountOnRender] [data-test-id=button]").click();
    cy.get("[data-test-id=RunCountOnRender] [data-test-id=effectRunCount]").should("contain", "effect called: 2");
    cy.get("[data-test-id=RunCountOnRender] [data-test-id=button]").click();
    cy.get("[data-test-id=RunCountOnRender] [data-test-id=effectRunCount]").should("contain", "effect called: 3");
    cy.get("[data-test-id=RunCountOnRender] [data-test-id=renderRunCount]").should("not.contain", "render called: 3");
  });

});
