describe('Ingredients mock', () => {
  beforeEach(function () {
    cy.fixture('ingredients.json').as('mockIngredients');
    cy.intercept('GET', '**/api/ingredients', (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true, data: this.mockIngredients }
      });
    }).as('getIngredients');
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('Проверяем, что конструктор пустой изначально', () => {
    cy.get('[data-cy="constructor-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bot"]').should('not.exist');
  });

  it('Можно добавить булку в конструктор', function () {
    cy.get('[data-cy="ingredient-item"]')
      .filter(':contains("Краторная булка N-200i")')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-top"]').should('contain', 'булка');
    cy.get('[data-cy="constructor-bot"]').should('contain', 'булка');
  });

  it('Можно добавить другой ингредиент', function () {
    cy.get('[data-cy="ingredient-item"]')
      .filter(':contains("Говяжий метеорит (отбивная)")')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-middle"]').should(
      'contain',
      'Говяжий метеорит'
    );
  });

  describe('Modal window', () => {
    it('Открывается при клике на ингредиент', function () {
      cy.get('[data-cy="ingredient-item"]')
        .contains('Краторная булка N-200i')
        .click();

      cy.get('[data-cy="modal"]').should('be.visible');

      cy.get('[data-cy="modal"]').within(() => {
        cy.contains('Краторная булка N-200i').should('be.visible');
        cy.contains('Калории').should('exist');
      });

      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('закрывается при клике на кнопку закрытия', function () {
      cy.get('[data-cy="ingredient-item"]')
        .contains('Краторная булка N-200i')
        .click();
      cy.get('[data-cy="modal-close-button"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('закрывается при клике на оверлей', function () {
      cy.get('[data-cy="ingredient-item"]')
        .contains('Краторная булка N-200i')
        .click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
});

describe('Создание заказа', () => {
  beforeEach(function () {
    cy.fixture('ingredients.json').as('mockIngredients');
    cy.intercept('GET', '**/api/ingredients', (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true, data: this.mockIngredients }
      });
    }).as('getIngredients');
    
    cy.fixture('postOrder.json').as('order');
    cy.fixture('auth.json').as('tokens');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockRefreshToken');
    });
    cy.setCookie('accessToken', 'mockAccessToken');
    cy.intercept('GET', '**/auth/user', (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true, user: { name: 'Test', email: 'test@test.com' } }
      });
    }).as('getUser');
    cy.intercept('POST', '**/orders', (req) => {
      expect(req.headers.authorization).to.eq('mockAccessToken');
      req.reply({
        statusCode: 200,
        body: this.order
      });
    }).as('postOrder');
    cy.visit('http://localhost:4000/');
    cy.wait('@getUser');
  });

  it('Проверяем что данные юзера пришли и отобразились', () => {
    cy.get('[data-cy="header-login"]').should('contain', 'Test');
  });

  it('собираем бургер', function () {
    cy.get('[data-cy="ingredient-item"]')
      .filter(':contains("Краторная булка N-200i")')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="ingredient-item"]')
      .filter(':contains("Говяжий метеорит (отбивная)")')
      .find('button')
      .contains('Добавить')
      .click();
  });

  it('оформляем заказ', function () {
    cy.get('[data-cy="ingredient-item"]')
      .filter(':contains("Краторная булка N-200i")')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="ingredient-item"]')
      .filter(':contains("Говяжий метеорит (отбивная)")')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="postOrder"')
      .find('button')
      .contains('Оформить заказ')
      .click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should(
      'contain',
      this.order.order.number
    );
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
  });

    it('проверяем, что конструктор пуст', function () {
    cy.get('[data-cy="constructor-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bot"]').should('not.exist');
    cy.get('[data-cy="constructor-middle"]').should('contain', 'Выберите начинку');
  });
});
