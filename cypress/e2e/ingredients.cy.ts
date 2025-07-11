import { SELECTORS } from '../support/constants';

describe('Загрузка ингредиентов', () => {
  beforeEach(() => {
    cy.initConstructorPage();
  });

  afterEach(() => {
    cy.clearMockTokens();
  });

  it('отображает список ингредиентов после успешной загрузки', () => {
    cy.get(SELECTORS.ingredientCard).should('have.length', 3);
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Сыр с астероидной плесенью').should('exist');
    cy.contains('Соус с шипами Антарианского плоскоходца').should('exist');
  });
});
