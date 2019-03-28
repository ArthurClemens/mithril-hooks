/* global cy, describe, before, it */

describe("useState", () => {
  
  before(() => {
    cy.visit("/TestUseState");
  });
  
  it("should render with the initial value", () => {
    cy.get("[data-test-id=InitialValue] [data-test-id=count]").should("contain", "Count: 1");
  });
  
  it("should render with the initial value updated after useEffect", () => {
    cy.get("[data-test-id=WithEffect] [data-test-id=count]").should("contain", "Count: 101");
  });
  
  it("should increase the count with setCount", () => {
    cy.get("[data-test-id=Interactive] [data-test-id=button]").click();
    cy.get("[data-test-id=Interactive] [data-test-id=count]").should("contain", "Count: 1001");
  });
  
  it("should increase the count with setCount as function", () => {
    cy.get("[data-test-id=Interactive] [data-test-id=fn-button]").click();
    cy.get("[data-test-id=Interactive] [data-test-id=count]").should("contain", "Count: 1002");
  });
  
});


