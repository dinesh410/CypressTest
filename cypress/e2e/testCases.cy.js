import { ELEMENT_TEST_ID } from "../support/enums/elements";

/**
 * Click on a sub menu option and verify URL and title.
 * @params { mainMenuElement, subMenuOption, expectedUrl, expectedTitle}
 */
const clickSubMenuOption = ({
  mainMenuElement,
  subMenuOption,
  expectedUrl,
  expectedTitle,
}) => {
  // For stability - To click on the sub-menu option hovering to the main menu element and then clicking sub menu option.
  cy.dataCy(mainMenuElement).trigger("mouseover");
  cy.contains(subMenuOption).click();
  // Verify Url and title of the page as user navigates to new page.
  cy.verifyUrl(expectedUrl);
  cy.title().should("contain", expectedTitle);
};

describe("Plotly - Interview test cases", () => {
  beforeEach(() => {
    // Visit baseUrl before each test.
    cy.visit("/");
  });

  it(`Users are able to visit the website and able to scroll down to “Loved by OSS,
    trusted by Enterprise” and see the weekly downloads number.`, () => {
    const ossText = "Loved by OSS, trusted by Enterprise";
    const weeklyDownloads = "Weekly downloads";

    cy.contains(ossText).scrollIntoView().should("be.visible");
    cy.contains(weeklyDownloads)
      .should("be.visible")
      .parent("div.grow")
      .invoke("text")
      .then((weeklyDownloads) => {
        // Log the weekly downloads value.
        cy.log(weeklyDownloads);
        // Verifies if the weekly downloads visible on screen.
        cy.contains(weeklyDownloads).should("be.visible");
      });
  });

  it(`User is able to click on Company and then on “About Cypress”`, () => {
    const aboutCypress = "About Cypress";
    const aboutUs = "about-us";

    // Current implementation does not allow the dropdown menu to stay visible after clicking the "Company".
    // User is able to click on the "Company"
    cy.dataCy(ELEMENT_TEST_ID.DROPDOWN_COMPANY).click();
    // When Clicked on company user is navigated to "about-us" page
    cy.verifyUrl(aboutUs);

    clickSubMenuOption({
      mainMenuElement: ELEMENT_TEST_ID.DROPDOWN_COMPANY,
      subMenuOption: aboutCypress,
      expectedUrl: aboutUs,
      expectedTitle: aboutCypress,
    });
  });

  it(`User is able to click on “Install” and then on “npm install cypress” and make sure
    the copied text is “npm install cypress --save-dev”`, () => {
    const npmCommand = "npm install cypress --save-dev";

    // Click on Install
    cy.dataCy(ELEMENT_TEST_ID.HEADER_INSTALL).scrollIntoView().click();

    // Click on "npm install Cypress"
    cy.dataCy(ELEMENT_TEST_ID.MODAL_INSTALL_COPY).click();

    // Verify the text copied to clipboard
    cy.verifyClipboardText(npmCommand);
  });

  it(`User is able to click on “Product” and then “visual review”`, () => {
    const visualReviews = "Visual Reviews";

    // User is able to click on the "Product"
    cy.dataCy(ELEMENT_TEST_ID.DROPDOWN_PRODUCT).click();

    // When CLicked on company user is navigated to "app" page
    cy.verifyUrl("app");
    cy.title().should("contain", "Open-Source E2E Testing Tools");
    
    // For stability - To click on the "Visual Reviews" sub-menu option hovering to the "Product" and then clicking "Visual Reviews"
    clickSubMenuOption({
      mainMenuElement: ELEMENT_TEST_ID.DROPDOWN_PRODUCT,
      subMenuOption: visualReviews,
      expectedUrl: "cloud#visual_reviews",
      expectedTitle: "Automated Software Testing Tools for CI | Cypress Cloud",
    });
  });

  it(`User is able to click on “Product”, then “Smart Orchestration”, then scroll down to
      “Test Analytics” and see that the green circle is around “Test Analytics”`, () => {
    const smartOrchestration = "Smart Orchestration";
    const testAnalytics = "Test Analytics";

    // User is able to click on the "Product"
    cy.dataCy(ELEMENT_TEST_ID.DROPDOWN_PRODUCT).click();

    // When Clicked on company user is navigated to "app" page
    cy.verifyUrl("app");
    cy.title().should("contain", "Open-Source E2E Testing Tools");

    // Other way of clicking the hidden element used here.
    cy.contains(smartOrchestration)
      .should("not.be.visible")
      .and("exist")
      .click({ force: true });

    // Scrolling into the section for Test Analytics and verifying if visible.
    cy.get("section#test_analytics").within(() => {
      cy.contains(testAnalytics).scrollIntoView().should("be.visible");
    });

    // Verify the css attributes to check the border.
    cy.dataCy(ELEMENT_TEST_ID.PRODUCT_APP).within(() => {
      cy.contains(testAnalytics)
        .should("have.attr", "class")
        .and("contain", "border-jade-200")
        .and("contain", "bg-white")
        .and("contain", "text-teal-600");
      cy.contains("Test Analytics")
        .should("have.attr", "class")
        .and("not.contain", "border-transparent")
        .and("not.contain", "hover:border-jade-300")
        .and("not.contain", "hover:text-teal-500")
        .and("not.contain", "hover:ring-jade-100");
    });
  });
});
