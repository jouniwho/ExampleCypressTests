describe('Test Eml to do list', () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/elm/#/");
  });

  it("should add a new task", () => {
    cy.get(".new-todo").type("New To Do{enter}");
    cy.get(".todo-list li").should("contain", "New To Do");
  });

  it("should have an active task", () => {
    cy.get(".new-todo").type("New To Do{enter}");
    cy.contains("Active").click();
    cy.get(".todo-list li").should("have.length", 1);
  });

  it("should mark a task as completed", () => {
    cy.get(".new-todo").type("New To Do{enter}");
    cy.get(".toggle").click();
    cy.get(".todo-list li").should("have.class", "completed");
  });

  it("should delete a task", () => {
    cy.get(".new-todo").type("Delete me{enter}");
    cy.get(".destroy").click({ force: true });
    cy.get(".todo-list li").should("not.exist");
  });

  it("should filter completed tasks", () => {
    cy.get(".new-todo").type("Task 1{enter}");
    cy.get(".new-todo").type("Task 2{enter}");
    cy.get(".todo-list li").first().find(".toggle").click();

    cy.contains("Completed").click();
    cy.get(".todo-list li").should("have.length", 1);
  });

  it("should delete completed tasks", () => {
    cy.get(".new-todo").type("Task 1{enter}");
    cy.get(".new-todo").type("Task 2{enter}");
    cy.get(".todo-list li").first().find(".toggle").click();

    cy.contains("Clear completed").click();
    cy.get(".todo-list li label").should("not.contain", "Task 1");
  });

  it("should edit a task", () => {
    const originalText = "Old Task";
    const modifiedText = "Updated Task";
  
    cy.get(".new-todo").type(`${originalText}{enter}`);
  
    cy.get(".todo-list li label").contains(originalText).dblclick();
  
    cy.get(".todo-list li .edit")
      .clear()
      .type(`${modifiedText}{enter}`);
  
    cy.get(".todo-list li label").should("contain", modifiedText);
  });

});