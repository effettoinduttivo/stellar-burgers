import { SELECTORS } from '../support/constants';

describe('Работа модальных окон', () => {
  beforeEach(() => {
    cy.initConstructorPage();
  });

  afterEach(() => {
    cy.clearMockTokens();
  });

  it('открывает модальное окно ингредиента по клику на карточку', () => {
    cy.openIngredientModal('Сыр с астероидной плесенью');
    cy.get(SELECTORS.modal).contains('Сыр с астероидной плесенью').should('exist');
    cy.url().should('include', '/ingredients/');
  });

  it('закрывает модальное окно по клику на крестик', () => {
    cy.openIngredientModal('Сыр с астероидной плесенью');
    cy.closeModalByButton();
  });

  it('закрывает модальное окно по клику на оверлей', () => {
    cy.openIngredientModal('Сыр с астероидной плесенью');
    cy.closeModalByOverlay();
  });
});
