/* global cy, describe, before, it */

describe("useMemo", () => {

  before(() => {
    cy.visit("/TestUseMemo");
  });

  it("should store a memoized value and only update it after updating a variable", () => {
    cy.get("[data-test-id=memoizedValue]").invoke("text").then((memoizedValue) => {
      cy.get("[data-test-id=render]").click();
      cy.get("[data-test-id=memoizedValue]").should("contain", memoizedValue);
      cy.get("[data-test-id=expensive]").click();
      cy.get("[data-test-id=memoizedValue]").should("not.contain", memoizedValue);
    });
  });

});
