import { fakeName } from "../utils";
import { eq } from "lodash";

context("Login", () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);
    cy.visit("/");
    cy.clearCookies();
  });

  it("Sign In", () => {
    const email = Cypress.env("userEmail");
    const password = Cypress.env("userPassword");

    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.url().should("include", "/inbox");
    cy.getCookie("auth-token").should("exist");

    cy.get("title").should("contain", "Conversation");

    cy.get('button[id="robot-get-started"]').click();

    cy.get('div[id="robot-features"]')
      .children()
      .should("have.length", 9);
    cy.get('button[id="robot-get-started"]').should("be.disabled");

    cy.get('div[id="robot-item-inbox"]').click();
    cy.get('div[id="robot-item-contacts"]').click();
    cy.get('div[id="robot-item-integrations"]').click();

    cy.get('button[id="robot-get-started"]').click();
    cy.get('div[id="robot-feature-close"]').click();

    const randomm = fakeName(5);

    sendMessage();

    cy.get("#btn-inbox-channel-visible").click();
    cy.get('i[icon="angle-down"]')
      .eq(2)
      .click();
    cy.get('i[icon="angle-down"]')
      .eq(3)
      .click();

    cy.get("#btn-inbox-channel-visible").click();

    cy.get('button[icon="check-circle"]').click();

    cy.get(":nth-child(2) > .icon-angle-down").click();
    cy.get('a[href="#link"]')
      .eq(2)
      .click();

    cy.get('button[icon="redo"]').click();

    cy.get('a[href="/inbox"]').click();

    tags();

    cy.get("#mask").click();

    cy.get('div[class="RichEditor-editor"]').click();

    cy.get("#conversationAssignTrigger").click();
    cy.get('input[placeholder="Search"]').type("Admin");

    cy.get('li[class="none"]').click();

    cy.wait(1000);

    cy.get("#conversationAssignTrigger").click();

    cy.get('a[href="/inbox/index"]')
      .eq(1)
      .click();

    cy.get("#conversationWrapper").scrollTo("top", { duration: 5000 });

    cy.get("#mask").click();
  });
});

const randomm = fakeName(5);
const sendMessage = () => {
  cy.get("#mask").click();
  cy.get('div[class="RichEditor-editor"]').type(randomm);
  cy.get('button[icon="message"]').click();
};

const tags = () => {
  cy.get("#conversationTags").click();

  cy.get('input[placeholder="Search"]').type("Angry");
  cy.get('i[class="icon icon-tag-alt"]').click();
};

const internalNote = () => {
  cy.get("#conversationInternalNote").click();
  cy.get('div[class="RichEditor-editor"]').type(randomm);
};

const assingTo = () => {
  cy.get("#conversationAssignTo").click();
  cy.get('input[placeholder="Search"]').type("Admin");

  cy.get('li[class="none"]').click();
};
