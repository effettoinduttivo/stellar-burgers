import { SELECTORS } from './constants';

Cypress.Commands.add('initConstructorPage', () => {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
    'getUser'
  );
  cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );
  cy.intercept('GET', '**/api/orders', { orders: [] }).as('getOrders');

  cy.setCookie('accessToken', 'test-access-token');
  cy.getCookie('accessToken').should('have.property', 'value', 'test-access-token');
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'test-refresh-token');
  });

  cy.visit('/');
  cy.wait('@getIngredients');
  cy.wait('@getUser');
});

Cypress.Commands.add('clearMockTokens', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

Cypress.Commands.add('addIngredient', (category: string, name: string) => {
  cy.get(`[data-testid="${category}"]`)
    .contains(SELECTORS.ingredientCard, name)
    .within(() => {
      cy.contains('button', 'Добавить').click();
    });
});

Cypress.Commands.add('openIngredientModal', (name: string) => {
  cy.contains(SELECTORS.ingredientCard, name).click();
  cy.get(SELECTORS.modal).should('exist');
});

Cypress.Commands.add('closeModalByButton', () => {
  cy.get(SELECTORS.closeModal).click();
  cy.get(SELECTORS.modal).should('not.exist');
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(SELECTORS.overlay).click({ force: true });
  cy.get(SELECTORS.modal).should('not.exist');
});

Cypress.Commands.add('placeOrder', () => {
  cy.contains('Оформить заказ').click();
  cy.get(SELECTORS.modal).should('exist');
  cy.wait('@createOrder');
});

Cypress.Commands.add('verifyConstructorIsEmpty', () => {
  cy.get(SELECTORS.bunTop).should('not.exist');
  cy.get(SELECTORS.bunBottom).should('not.exist');
  cy.get(SELECTORS.ingredient).should('not.exist');
});
