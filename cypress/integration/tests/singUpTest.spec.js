describe('Sing Up Test Suite', () => {


    beforeEach(() => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
            cy.visit(testValues.signUpObject.url).get(testValues.signUpObject.loginId).click()
            .url().should('includes','login');
            cy.get(testValues.signUpObject.signUpId).click()
            .url().should('includes', 'signup')
            .get(testValues.signUpObject.asContractorId).click()
            .get(testValues.signUpObject.submitid1).click()
            .url().should('includes', 'signup')
        })
    })

    it('Test that when not typing the name the submit button does not turn able', ()  => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
        cy.get(testValues.signUpObject.signUpFormId).should('exist')
        .get(testValues.signUpObject.inputName)
        .get(testValues.signUpObject.inputEmail).type('jackson@gmail.com')
        .get(testValues.signUpObject.inputPassword1).type('123]]Mk1232')
        .get(testValues.signUpObject.inputPassword2).type('123]]Mk1232')
        .get(testValues.signUpObject.typeOfClientDropdown).click({force: true}).type('{enter}')
        .get(testValues.signUpObject.submitSignUpFormId).should('have.attr', 'disabled', 'disabled')
        })
    })

    it('Test that when not typing the email the submit button does not turn able', ()  => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
        cy.get(testValues.signUpObject.signUpFormId).should('exist')
        .get(testValues.signUpObject.inputName).type('jackson')
        .get(testValues.signUpObject.inputEmail)
        .get(testValues.signUpObject.inputPassword1).type('123]]Mk1232')
        .get(testValues.signUpObject.inputPassword2).type('123]]Mk1232')
        .get(testValues.signUpObject.typeOfClientDropdown).click({force: true}).type('{enter}')
        .get(testValues.signUpObject.submitSignUpFormId).should('have.attr', 'disabled', 'disabled')
        })
    })
    it('Test that when not typing the password the submit button does not turn able', ()  => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
        cy.get(testValues.signUpObject.signUpFormId).should('exist')
        .get(testValues.signUpObject.inputName).type('jackson')
        .get(testValues.signUpObject.inputEmail).type('jackson@gmail.com')
        .get(testValues.signUpObject.inputPassword1)
        .get(testValues.signUpObject.inputPassword2).type('123]]Mk1232')
        .get(testValues.signUpObject.typeOfClientDropdown).click({force: true}).type('{enter}')
        .get(testValues.signUpObject.submitSignUpFormId).should('have.attr', 'disabled', 'disabled')
        })
    })
    it('Test that when not typing correctly the passwords the submit button does not turn able', ()  => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
        cy.get(testValues.signUpObject.signUpFormId).should('exist')
        .get(testValues.signUpObject.inputName).type('jackson')
        .get(testValues.signUpObject.inputEmail).type('jackson@gmail.com')
        .get(testValues.signUpObject.inputPassword1).type('123]]Mk1232')
        .get(testValues.signUpObject.inputPassword2).type('notcorrect')
        .get(testValues.signUpObject.typeOfClientDropdown).click({force: true}).type('{enter}')
        .get(testValues.signUpObject.submitSignUpFormId).should('have.attr', 'disabled', 'disabled')
        })
    })
    it('Test that when not typing correctly the email the submit button does not turn able', ()  => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
        cy.get(testValues.signUpObject.signUpFormId).should('exist')
        .get(testValues.signUpObject.inputName).type('jackson')
        .get(testValues.signUpObject.inputEmail).type('jackson')
        .get(testValues.signUpObject.inputPassword1).type('123]]Mk1232')
        .get(testValues.signUpObject.inputPassword2).type('123]]Mk1232')
        .get(testValues.signUpObject.typeOfClientDropdown).click({force: true}).type('{enter}')
        .get(testValues.signUpObject.submitSignUpFormId).should('have.attr', 'disabled', 'disabled')
        })
    })
    it('Test that when sending incorrect data validations shows up', ()  => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
        cy.get(testValues.signUpObject.signUpFormId).should('exist')
        .get(testValues.signUpObject.inputName).type('jackson')
        .get(testValues.signUpObject.inputEmail).type('jackson.com')
        .get(testValues.signUpObject.inputPassword1).type('123]]Mk12')
        .get(testValues.signUpObject.inputPassword2).type('123]]Mk2232')
        .get(testValues.signUpObject.typeOfClientDropdown).click({force: true}).type('{enter}')
        .get(testValues.signUpObject.submitSignUpFormId).click()
        .get(testValues.signUpObject.emailValidationInnerText)
        .should('have.text', "Invalid email address")
        .get(testValues.signUpObject.password1ValidationInnerText)
        .should('have.text', 'Password must match')
        .get(testValues.signUpObject.password2ValidationInnerText)
        .should('have.text', 'Password required to be at least 10 characters long')
        })
    })
    it('Test that when introducing all the correct data the user gets a confirmation message', ()  => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
        cy.get(testValues.signUpObject.signUpFormId).should('exist')
        .get(testValues.signUpObject.inputName).type('jackson')
        .get(testValues.signUpObject.inputEmail).type(`m${Math.floor(Math.random() * (10 - 0)) + 0}@gmail.com`)
        .get(testValues.signUpObject.inputPassword1).type('123]]Mk1232')
        .get(testValues.signUpObject.inputPassword2).type('123]]Mk1232')
        .get(testValues.signUpObject.typeOfClientDropdown).click({force: true}).type('{enter}')
        .get(testValues.signUpObject.submitSignUpFormId).click()
        .get(testValues.signUpObject.confirmationMessage,{timeout: 10000}).should('have.text', 'We’ve sent you a confirmation email')
        })
    })
    it('Test that the value of the password does not shows on the html', ()  => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
        cy.get(testValues.signUpObject.signUpFormId).should('exist')
        .get(testValues.signUpObject.inputName).type('jackson')
        .get(testValues.signUpObject.inputEmail).type('jackson@gmail.com')
        .get(testValues.signUpObject.inputPassword1).type('123]]Mk1232')
        .get(testValues.signUpObject.inputPassword2).type('123]]Mk1232')
        .get(testValues.signUpObject.inputPassword1).should('not.have.attr', 'value', '123]]Mk1232')
        })
    })
})