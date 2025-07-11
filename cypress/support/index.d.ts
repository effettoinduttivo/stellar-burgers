/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Перехватывает запросы, устанавливает моковые токены и загружает страницу 
     */
    initConstructorPage(): Chainable<JQuery<HTMLElement>>;

    /**
     * Очищает accessToken и refreshToken
     */
    clearMockTokens(): Chainable<JQuery<HTMLElement>>;

    /**
     * Добавляет ингредиент в конструктор по категории и названию
     * @param category Название категории (например, 'Булки')
     * @param name Название ингредиента
     */
    addIngredient(category: string, name: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Открывает модалку с информацией об ингредиенте
     * @param name Название ингредиента
     */
    openIngredientModal(name: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Закрывает модальное окно по крестику
     */
    closeModalByButton(): Chainable<JQuery<HTMLElement>>;

    /**
     * Закрывает модалку по клику на оверлей
     */
    closeModalByOverlay(): Chainable<JQuery<HTMLElement>>;

    /**
     * Кликает по кнопке «Оформить заказ» и ждёт появления модалки
     */
    placeOrder(): Chainable<JQuery<HTMLElement>>;

    /**
     * Проверяет, что конструктор пуст
     */
    verifyConstructorIsEmpty(): Chainable<JQuery<HTMLElement>>;
  }
}
