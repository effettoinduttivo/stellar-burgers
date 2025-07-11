import { SELECTORS } from '../support/constants';

describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.initConstructorPage();
  });

  afterEach(() => {
    cy.clearMockTokens();
  });

  it('добавляет булку и начинку в конструктор бургера', () => {
    cy.addIngredient('Булки', 'Краторная булка N-200i');
    cy.get(SELECTORS.bunTop).should('contain', 'Краторная булка N-200i');
    cy.get(SELECTORS.bunBottom).should('contain', 'Краторная булка N-200i');

    cy.addIngredient('Начинки', 'Сыр с астероидной плесенью');
    cy.get(SELECTORS.ingredient).should('contain', 'Сыр с астероидной плесенью');
  });
});
