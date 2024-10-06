describe('Проверка работы приложения', () => {
    const homePage = '/';

    beforeEach(() => {
        cy.intercept( 'GET', 'api/ingredients', {
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
        cy.visit(homePage);
    });

    afterEach(() => {
        cy.clearCookie('accessToken');
        localStorage.removeItem('refreshToken');
    });
})