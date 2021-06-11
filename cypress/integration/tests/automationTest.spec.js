describe('test suite of the fixed contract', () => {

    let contractName = `contract number: ${Math.floor(Math.random() * (10 - 0)) + 0}`;
    let contractAgreedPrice= "1,000";
    before(() => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
            cy.visit(testValues.contractTestIds.url).url().should('includes', 'login')
            .get(testValues.contractTestIds.nameInputId).type(testValues.userCredentials.userEmail)
            .get(testValues.contractTestIds.passwordInputId).type(testValues.userCredentials.password)
            .get(testValues.contractTestIds.submitButton).click()
            cy.get('.button-close > :nth-child(1) > .icon' ,{timeout : 10000}).should('be.visible').click()
            cy.get(testValues.contractTestIds.menuBar).should('exist')
            .get(testValues.contractTestIds.contractId).click()
            .get(testValues.contractTestIds.createContractId,{timeout : 10000}).should('be.visible').click()
            .get(testValues.contractTestIds.createAFixedContractId).click()
        })
    })

    it('test the general info screen', () => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
            cy.get(testValues.contractTestIds.generalInfoH1).should('exist')
            .get(testValues.contractTestIds.inputContractName).type(contractName)
            .get(testValues.contractTestIds.submitGeneralInfo).should('have.attr', 'disabled', 'disabled')
            .get(testValues.contractTestIds.inputScopeOfWork).type(testValues.contractTestIds.loremImpsum)
            .get(testValues.contractTestIds.submitGeneralInfo).click({force: true})
        })
    })

    it('test the define rate part', () => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
            cy.get(testValues.defineRatePartIds.checkboxId).should('exist')
            .get(testValues.defineRatePartIds.rateId)
            .type(0).get(testValues.defineRatePartIds.nextButton).click().get(testValues.defineRatePartIds.validationTextOnTheRate)
            .should('have.text','Minimum rate is 0.01')
            .get(testValues.defineRatePartIds.rateId)
            .type(contractAgreedPrice)
            .get(testValues.defineRatePartIds.currencyId,{timeout:2000})
            .click({force:true}).type('gb').type('{enter}')
            .get(testValues.defineRatePartIds.paymentPeriodId,{timeout:2000})
            .click({force:true}).type('wee').type('{enter}')
            .get(testValues.defineRatePartIds.nextButton).click()
        })
    })
    
    it('test the define dates part', () => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
            cy.get(testValues.defineDatesPart.checkboxId).should('exist')
            .get(testValues.defineDatesPart.proDataId,{timeout:2000})
            .click().get(testValues.defineDatesPart.nextButton).click()
            .get(testValues.defineDatesPart.validationText,{timeout: 2000}).
            should('have.text', 'Amount is required')
            cy.get(testValues.defineDatesPart.fullAmountId)
            .click().get(testValues.defineDatesPart.rateAmounText,{timeout: 2000})
            .should('have.text', '£'+contractAgreedPrice)
            .get(testValues.defineDatesPart.nextButton).click()
        })
    })
    it('test the define extra part', () => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
            cy.get(testValues.defineExtrasPart.extraCheckbox).should('exist')
            .get(testValues.defineExtrasPart.especialClauseId)
            .click().get(testValues.defineExtrasPart.especialClausTextarea)
            .type(testValues.contractTestIds.loremImpsum)
            .get(testValues.defineExtrasPart.nextButton).click()
        })
    })
    
    it('test the define compilance part', () => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
            cy.get(testValues.defineCompilationPart.checkbox).should('exist')
            .get(testValues.defineCompilationPart.contractorCountryId,{timeout:2000})
            .click({force: true}).type('united states').type('{enter}')
            .get(testValues.defineCompilationPart.cotractorState, {timeout:2000})
            .click({force: true}).type('Colorado').type('{enter}')
            .get(testValues.defineCompilationPart.nextButton,{timeout:1000})
            .click()
        })
    })

   
    it('test the completition of the contract and the name of te contract', () => {
        cy.fixture('example.json').as('testValues')
        .get('@testValues').then((testValues)=> {
            cy.get(testValues.contractNameId, {timeout:3500}).should('have.text', contractName+' ')
            .get(testValues.contractTestIds.contractId).click()
        })
    })
})