describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Name')
    cy.contains('Password')
    cy.get('#username')
    cy.get('#password')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('roasdfot')
    cy.get('#password').type('rooasdft')
    cy.get('#login-button').click()
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#title').type('title1')
      cy.get('#author').type('author1')
      cy.get('#url').type('https://url.com')
      cy.get('#number').type(1)

      cy.get('#create-button').click()
    })
  })
})
