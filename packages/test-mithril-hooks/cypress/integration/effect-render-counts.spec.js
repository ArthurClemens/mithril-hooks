/* global cy, describe, before, it */

describe("effect render counts", () => {

  before(() => {
    cy.visit("/TestEffectRenderCounts");
  });

  it("effect with empty deps: should have 1 render", () => {
    cy.get("[data-test-id=EffectCountEmpty] [data-test-id=renderCounts]").invoke("text").then((renderCounts) => {
      const count = parseInt(renderCounts, 10);
      cy.expect(count).to.be.equal(1);
    });
  });

  it("effect with empty deps: after click it should have 2 renders", () => {
    cy.get("[data-test-id=EffectCountEmpty] [data-test-id=button]").click();
    cy.get("[data-test-id=EffectCountEmpty] [data-test-id=renderCounts]").invoke("text").then((renderCounts) => {
      const count = parseInt(renderCounts, 10);
      cy.expect(count).to.be.equal(2);
    });
  });

  it("effect with variable deps: should have 2 renders", () => {
    cy.get("[data-test-id=EffectCountVariable] [data-test-id=renderCounts]").invoke("text").then((renderCounts) => {
      const count = parseInt(renderCounts, 10);
      cy.expect(count).to.be.equal(2);
    });
  });

  it("effect with variable deps: after update count it should have 3 renders", () => {
    cy.get("[data-test-id=EffectCountVariable] [data-test-id=button-increment]").click();
    cy.get("[data-test-id=EffectCountVariable] [data-test-id=renderCounts]").invoke("text").then((renderCounts) => {
      const count = parseInt(renderCounts, 10);
      cy.expect(count).to.be.equal(3);
    });
  });

});
