import { SELECTORS } from '../support/constants';

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.initConstructorPage();
  });

  afterEach(() => {
    cy.clearMockTokens();
  });

  it('оформляет заказ и очищает конструктор', () => {
    cy.addIngredient('Булки', 'Краторная булка N-200i');
    cy.addIngredient('Начинки', 'Сыр с астероидной плесенью');
    cy.addIngredient('Соусы', 'Соус с шипами Антарианского плоскоходца');

    cy.placeOrder();

    cy.get(SELECTORS.modal).contains('12345').should('exist');
    cy.closeModalByButton();

    cy.verifyConstructorIsEmpty();
  });
});
