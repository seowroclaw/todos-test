describe('Spec1', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should add several items and check the number of items in the list', () => {
        cy.request('POST', '/todos', {title: "tmp_todo_1", completed: false,})
        cy.request('POST', '/todos', {title: "tmp_todo_2", completed: false,})
        cy.request('POST', '/todos', {title: "tmp_todo_3", completed: false,})

        cy.reload()
        cy.get('div > label').should('have.length', 3)
    });

    it('should append new items to the bottom of the list', () => {
        cy.intercept('POST', '/todos').as('postTodosAppend')

        cy.get('.new-todo').click().type('new_todo_1').type('{enter}')
        cy.wait('@postTodosAppend').its('response.statusCode').should('eq', 201)
        cy.get('li.todo').contains('new_todo_1').should('be.visible')

        cy.get('.new-todo').click().type('new_todo_2').type('{enter}')
        cy.wait('@postTodosAppend').its('response.statusCode').should('eq', 201)
        cy.get('li.todo').contains('new_todo_2').should('be.visible')
    });

    it('should remove element after clicking on x button', () => {
        cy.get('button.destroy').eq(0).should('be.hidden').invoke('show').click()

        cy.reload()
        cy.get('div > label').should('have.length', 4)
    });

    it('should indicate item as done when clicking on button before item title', () => {
        cy.get('li > div > input').eq(0).click()
        cy.get('li.todo.completed').should('be.visible')
    })

    it('should delete all item', () => {
        cy.get('button.destroy').should('be.hidden').invoke('show').click({multiple: true})

        cy.reload()
        cy.get('div > label').should('have.length', 0)
    })
})
