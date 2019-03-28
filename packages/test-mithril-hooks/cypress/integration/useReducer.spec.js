/* global cy, describe, before, it */

describe("useReducer", () => {

  before(() => {
    cy.visit("/TestUseReducer");
  });

  it("should set the initial state using an init function", () => {
    cy.get("[data-test-id=ReducerInitFunction] [data-test-id=count]").should("contain", "99");
    cy.get("[data-test-id=ReducerInitFunction] [data-test-id=state]").should("contain", "{\"count\":99}");
  });

  it("should change the count using reducer functions", () => {
    cy.get("[data-test-id=ReducerCounter] [data-test-id=count]").should("contain", "10");
    cy.get("[data-test-id=ReducerCounter] [data-test-id=increment]").click();
    cy.get("[data-test-id=ReducerCounter] [data-test-id=count]").should("contain", "11");
    cy.get("[data-test-id=ReducerCounter] [data-test-id=state]").should("contain", "{\"count\":11}");
  });

});
