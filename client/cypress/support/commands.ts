// export {};

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(username: string, password: string): Chainable<Element>;
//       register(
//         username: string,
//         email: string,
//         password: string
//       ): Chainable<Element>;
//     }
//   }
// }

// Cypress.Commands.add(
//   "register",
//   (username: string, email: string, password: string) => {
//     cy.visit("/auth/register");
//     cy.url().should("include", "/auth/register");

//     cy.get('input[name="username"]').type(username);
//     cy.get('input[name="email"]').type(email);
//     cy.get('input[name="password"]').type(password);
//     cy.get('button[type="submit"]').click();

//     cy.wait(30000);
//     cy.url().should("include", "/login");
//   }
// );

// Cypress.Commands.add("login", (username: string, password: string) => {
//   cy.visit("/");
//   cy.get("a").contains("Login").click();
//   cy.url().should("include", "/auth/login");
//   cy.get('input[name="username"]').type(username);
//   cy.get('input[name="password"]').type(password);
//   cy.get('button[type="submit"]').click();

//   cy.wait(10000);
//   cy.url().should("include", "/songs");
// });
