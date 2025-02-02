describe('Тест конструктора бургеров', () => {
  const selectBun = '[data-cy="bun"]';
  const selectMain = '[data-cy="main"]';
  const selectSauce = '[data-cy="sauce"]';
  const selectModal = '#modals';
  const selectOrderButton = '[data-order-button]';
  
  beforeEach(() => {
    // Перехват запросов на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getAuthUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('postOrders');

    cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
    localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

    cy.visit('/');
  });

  it('Список ингредиентов доступен для выбора', () => {
    cy.get(selectBun).should('exist');
    cy.get(selectMain).should('exist');
    cy.get(selectSauce).should('exist');
  });

  describe('Проверка работы модальных окон описаний ингредиентов', () => {
    it('добавление ингредиентов в конструктор', () => {
      cy.get('button').contains('Добавить').click();
      cy.get(selectBun).should('exist');
    });

    it('Открытие по карточке ингредиента', () => {
      cy.get(selectBun).click();
      cy.get(selectModal).should('exist');
    });

    it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
      cy.get(selectBun).click();
      cy.reload(true);
      cy.get(selectModal).should('exist');
    });

    describe('Проверка закрытия модальных окон', () => {
      it('Через нажатие на крестик', () => {
        cy.get(selectBun).click();
        cy.get(selectModal).click({ force: true });
        cy.get(selectModal).children().should('have.length', 0);
      });

      it('Через нажатие на оверлей', () => {
        cy.get(selectBun).click();
        cy.get(selectModal).click({ force: true });
        cy.get(selectModal).children().should('have.length', 0);
      });

      it('Через нажатие на Escape', () => {
        cy.get(selectBun).click();
        cy.get('body').type('{esc}');
        cy.get(selectModal).children().should('have.length', 0);
      });
    });
  });

  describe('Оформление заказа', () => {
    it('Оформления заказа', () => {
      // Проверка работы конструктора, по умолчанию он отключен пока не будет выбрана хотя бы 1 ингредиент и булка
      cy.get(selectOrderButton).should('be.disabled');
      cy.get(`${selectBun} button`).click();
      cy.get(selectOrderButton).should('be.disabled');
      cy.get(`${selectMain} button`).click();
      cy.get(selectOrderButton).should('be.enabled');

      // Нажатие на кнопку оформления заказа
      cy.get(selectOrderButton).click({ force: true });

      // После успешной отправки данных на сервер должно быть открыто модальное окно с оформлением заказа
      cy.get(selectModal).should('exist');
    });

    afterEach(() => {
      // Очистка фейковых токенов
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
