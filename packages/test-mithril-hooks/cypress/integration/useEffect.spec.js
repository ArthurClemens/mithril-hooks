/* global cy, describe, before, it */

describe("useEffect", () => {

  before(() => {
    cy.visit("/TestUseEffect");
  });

  it("should render with the initial value", () => {
    cy.get("#root.dark-mode").should("not.exist");
  });

  it("should update the class list after setDarkModeEnabled", () => {
    cy.get("[data-test-id=dark] [data-test-id=button]").click();
    cy.get("body.dark-mode").should("exist");
  });

});
