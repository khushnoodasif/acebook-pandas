describe("Timeline", () => {
  it("can submit posts, when signed in, and view them with the newest showing first", () => {
    // sign up
    cy.visit("/users/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // sign in
    cy.visit("/sessions/new");
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    // submit a post
    cy.visit("/posts");
    cy.contains("New Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello, world!");
    cy.get("#new-post-form").submit();

    //submit another post
    cy.visit("/posts");
    cy.contains("New Post").click();

    cy.get("#new-post-form").find('[type="text"]').type("Hello again, world!");
    cy.get("#new-post-form").submit();

    cy.get(".posts").should("contain", "Hello, world!");

    //posts should display in the newest first
    cy.get(".list-item").eq(0).should("contain", "Hello again, world!");
    cy.get(".list-item").eq(1).should("contain", "Hello, world!");
  });
});
