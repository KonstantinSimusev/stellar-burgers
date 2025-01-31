describe('Тест конструктора бургеров', () => {
  beforeEach(() => {
    // Перехват запросов на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

    cy.visit('http://localhost:4000/');
  });

  it('Список ингредиентов доступен для выбора', () => {
    cy.get('[data-cy="bun"]').should('exist');
    cy.get('[data-cy="main"],[data-cy="sauce"]').should('exist');
  });

  describe('Проверка работы модальных окон описаний ингредиентов', () => {
    it('добавление ингредиентов в конструктор', () => {
      cy.get('button').contains('Добавить').click();
      cy.get('[data-cy="bun"]').should('exist');
    });

    it('Открытие по карточке ингредиента', () => {
      cy.get('[data-cy="bun"]:first-of-type').click();
      cy.get('#modals').should('exist');
    });

    it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
      cy.get('[data-cy="bun"]:first-of-type').click();
      cy.reload(true);
      cy.get('#modals').should('exist');
    });

    describe('Проверка закрытия модальных окон', () => {
      it('Через нажатие на крестик', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('#modals').click({ force: true });
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Через нажатие на оверлей', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('#modals').click({ force: true });
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Через нажатие на Escape', () => {
        cy.get('[data-cy="bun"]:first-of-type').click();
        cy.get('body').type('{esc}');
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      // Перехват запросов авторизации, оформления заказа и получения ингредиентов
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
      cy.visit('http://localhost:4000/');

      // В localStorage и сookie подставляются фейковые токены авторизации
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');
    });

    it('Оформления заказа', () => {
      // Проверка работы конструктора, по умолчанию он отключен пока не будет выбрана хотя бы 1 ингредиент и булка
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-cy="bun"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-cy="main"] button').click();
      cy.get('[data-order-button]').should('be.enabled');

      // Нажатие на кнопку оформления заказа
      cy.get('[data-order-button]').click({force: true});

      // После успешной отправки данных на сервер должно быть открыто модальное окно с оформлением заказа
      cy.get('#modals').should('exist');
    });

    afterEach(() => {
      // Очистка фейковых токенов
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
