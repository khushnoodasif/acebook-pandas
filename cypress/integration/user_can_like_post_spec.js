describe("Liking Posts", () => {
  it("when a user clicks Like the number displayed increases by 1", () => {
    cy.visit("/posts")
    cy.get("li").first().find(".like-button").click()

    cy.get("li").first().should("contain", "🐼 1")
  })
})