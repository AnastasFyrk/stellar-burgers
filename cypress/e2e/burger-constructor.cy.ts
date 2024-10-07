describe('Проверка работы приложения', () => {
  //селекторы
  const bunSelector = `[data-cy="bun-ingredient"]`;
  const sauceSelector = `[data-cy="sauce-ingredient"]`;
  const mainSelector = `[data-cy="main-ingredient"]`;
  const modalSelector = '#modals';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('createOrder');
    cy.setCookie('accessToken', 'tokenTest');
    localStorage.setItem('refreshToken', 'refreshTokenTest');
    cy.visit('/');
    cy.viewport(1200, 800);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Добавление булки', () => {
      cy.contains('Выберите булки').should('exist');
      cy.get(bunSelector).contains('Добавить').click();
      cy.get('.constructor-element_pos_top')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
    });

    it('Добавление соуса', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get(sauceSelector).contains('Добавить').click();
      cy.get('.constructor-element')
        .contains('Соус традиционный галактический')
        .should('exist');
    });

    it('Добавление начинки', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get(mainSelector).contains('Добавить').click();
      cy.get('.constructor-element')
        .contains('Хрустящие минеральные кольца')
        .should('exist');
    });
  });

  describe('Оформление заказа', () => {
    it('Успешное оформление заказа', () => {
      cy.get(bunSelector).contains('Добавить').click();
      cy.get(sauceSelector).contains('Добавить').click();
      cy.get(mainSelector).contains('Добавить').click();
      cy.get('[type=button]').contains('Оформить заказ').click();

      cy.wait('@createOrder', { timeout: 1000 })
        .its('response.statusCode')
        .should('eq', 200);

      cy.get(modalSelector).contains('111').should('be.visible');
      cy.get(modalSelector).find('button').click().should('not.exist');

      cy.get('[id=root]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });
  });

  describe('работа модульного окна', () => {
    it('Открытие модульного окна', () => {
      cy.get(sauceSelector).find('li').first().click();
      cy.get(modalSelector)
        .contains('Соус традиционный галактический')
        .should('be.visible');
      cy.get(modalSelector).find('button').click().should('not.exist');
    });

    it('Закрытие модульного окна', () => {
      cy.get(sauceSelector).find('li').first().click();
      cy.get(modalSelector)
        .find('div')
        .click({ force: true, multiple: true })
        .should('not.exist');
    });
  });
});
