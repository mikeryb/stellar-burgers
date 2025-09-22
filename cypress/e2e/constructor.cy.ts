const testUrl = 'http://localhost:4000/';
const constructorTop = '[data-cy="constructor-top"]';
const constructorBot = '[data-cy="constructor-bot"]';
const constructorMid = '[data-cy="constructor-middle"]';
const ingredient = '[data-cy="ingredient-item"]';
const modal = '[data-cy="modal"]';
const modalCloseBtn = '[data-cy="modal-close-button"]';
const modalOverlay = '[data-cy="modal-overlay"]';


describe('Ingredients mock', () => {
  beforeEach(function () {
    cy.fixture('ingredients.json').as('mockIngredients');
    cy.intercept('GET', '**/api/ingredients', (req) => {
      req.reply({
        statusCode: 200,
        body: { success: true, data: this.mockIngredients }
      });
    }).as('getIngredients');
    cy.visit(testUrl);
    cy.wait('@getIngredients');
  });

  it('Проверяем, что конструктор пустой изначально', () => {
    cy.get(constructorTop).should('not.exist');
    cy.get(constructorBot).should('not.exist');
  });

  it('Можно добавить булку в конструктор', function () {
    cy.get(ingredient)
      .filter(':contains("Краторная булка N-200i")')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get(constructorTop).should('contain', 'булка');
    cy.get(constructorBot).should('contain', 'булка');
  });

  it('Можно добавить другой ингредиент', function () {
    cy.get(ingredient)
      .filter(':contains("Говяжий метеорит (отбивная)")')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get(constructorMid).should(
      'contain',
      'Говяжий метеорит'
    );
  });

  describe('Modal window', () => {
    it('Открывается при клике на ингредиент', function () {
      cy.get(ingredient)
        .contains('Краторная булка N-200i')
        .click();

      cy.get(modal).should('be.visible');

      cy.get(modal).within(() => {
        cy.contains('Краторная булка N-200i').should('be.visible');
        cy.contains('Калории').should('exist');
      });

      cy.get(modalCloseBtn).click();
      cy.get(modal).should('not.exist');
    });

    it('закрывается при клике на кнопку закрытия', function () {
      cy.get(ingredient)
        .contains('Краторная булка N-200i')
        .click();
      cy.get(modalCloseBtn).click();
      cy.get(modal).should('not.exist');
    });

    it('закрывается при клике на оверлей', function () {
      cy.get(ingredient)
        .contains('Краторная булка N-200i')
        .click();
      cy.get(modalOverlay).click({ force: true });
      cy.get(modal).should('not.exist');
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
    cy.visit(testUrl);
    cy.wait('@getUser');
  });

  it('Проверяем что данные юзера пришли и отобразились', () => {
    cy.get('[data-cy="header-login"]').should('contain', 'Test');
  });

  it('собираем бургер', function () {
    cy.get(ingredient)
      .filter(':contains("Краторная булка N-200i")')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get(ingredient)
      .filter(':contains("Говяжий метеорит (отбивная)")')
      .find('button')
      .contains('Добавить')
      .click();
  });

  it('оформляем заказ', function () {
    cy.get(ingredient)
      .filter(':contains("Краторная булка N-200i")')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get(ingredient)
      .filter(':contains("Говяжий метеорит (отбивная)")')
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="postOrder"')
      .find('button')
      .contains('Оформить заказ')
      .click();
    cy.get(modal).should('be.visible');
    cy.get('[data-cy="order-number"]').should(
      'contain',
      this.order.order.number
    );
    cy.get(modalOverlay).click({ force: true });
  });

    it('проверяем, что конструктор пуст', function () {
    cy.get(constructorTop).should('not.exist');
    cy.get(constructorBot).should('not.exist');
    cy.get(constructorMid).should('contain', 'Выберите начинку');
  });
 afterEach(() => {
  cy.window().then((win) => {
    win.localStorage.removeItem('refreshToken');
  });
  cy.clearCookie('accessToken');
});
});
