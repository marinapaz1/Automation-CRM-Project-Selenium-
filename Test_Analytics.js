const BasePage = require("./BasePage")
const HomePage = require("./HomePage")
const AnalyticsPage = require("./AnalyticsPage")
const ClientsPage = require("./ClientsPage")
const ActionsPage = require("./ActionsPage")
const logger = require('./logger')

class TestAnalytics {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.homePage = new HomePage(this.testSelenium)
        this.analyticsPage = new AnalyticsPage(this.testSelenium)
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.actionsPage = new ActionsPage(this.testSelenium)
    }

    async employeeSales(countrySales, employeeName, firstName, lastName, country, owner, email, client, newOwner = null, changeEmailType = null, sold) {
        console.log(`Check for number of sales of the employee ${employeeName} in ${countrySales}, change the sales number by adding a client in ${countrySales}\nfor ${employeeName} and update it to declare as sold, then validate the number of sales increased by 1`)
        logger.info(`Check for number of sales of the employee ${employeeName} in ${countrySales}, change the sales number by adding a client in ${countrySales}\nfor ${employeeName} and update it to declare as sold, then validate the number of sales increased by 1`)
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnPage('analytics')
        let salesBefore = await this.analyticsPage.validateEmployeeSales(countrySales, employeeName)
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient(firstName, lastName, country, owner, email)
        await this.actionsPage.updateClient(client, newOwner, changeEmailType, sold)
        await this.analyticsPage.navigateToAnalyticsPage()
        let salesAfter = await this.analyticsPage.validateEmployeeSales(countrySales, employeeName)
        if (salesAfter == (salesBefore + 1)) {
            console.log(`Validation SECCEEDED: The 'Employee Sales' number of ${employeeName} in ${countrySales} increased by 1`)
            logger.info(`Validation SECCEEDED: The 'Employee Sales' number of ${employeeName} in ${countrySales} increased by 1`)
        }
        else {
            console.log(`Validation FAILED: The 'Employee Sales' number of ${employeeName} in ${countrySales} didn't increase by 1. Make sure to verify 3 Pre-Requisites:\nClient's country is ${countrySales};\nClient's owner is Janice Alvarado;\nClient's 'Sold' is 'NO'`)
            logger.info(`Validation FAILED: The 'Employee Sales' number of ${employeeName} in ${countrySales} didn't increase by  1. Make sure to verify 3 Pre-Requisites:\nClient's country is ${countrySales};\nClient's owner is Janice Alvarado;\nClient's 'Sold' is 'NO'`)
        }
    }

    async emailsSent(searchBy, input, type, deleteClient, updateClient = null, country = null, email = null) {
        console.log(`Check for number of Email Sent, delete a client that has an email type, and validate the number of Email Sent decreased by 1`)
        logger.info(`Check for number of Email Sent, delete a client that has an email type, and validate the number of Email Sent decreased by 1`)
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnPage('analytics')
        let emailsSentBefore = await this.analyticsPage.validateEmailsSent()
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.searchByAndValidate(searchBy, input, type)
        await this.clientsPage.deleteOrUpdateClient(deleteClient, updateClient, country, email)
        await this.analyticsPage.navigateToAnalyticsPage()
        let emailsSentAfter = await this.analyticsPage.validateEmailsSent()
        if (emailsSentAfter == (emailsSentBefore - 1)) {
            console.log(`Validation SECCEEDED: The 'Email Sent' number decreased by 1`)
            logger.info(`Validation SECCEEDED: The 'Email Sent' number decreased by 1`)
        }
        else {
            console.log(`Validation FAILED: The 'Email Sent' number didn't decreased by 1. Make sure to verify Pre-Requisite: Existing client's email type`)
            logger.info(`Validation FAILED: THE 'Email Sent' number didn't decreased by 1. Make sure to verify Pre-Requisite: Existing client's email type`)
        }
    }

    async topEmployee(topEmployee, firstName, lastName, country, owner, email, client, newOwner = null, changeEmailType = null, sold) {
        console.log(`Check for number of sales on Top Employee, add a client to that employee, update that client and declare as 'Sold',
        and validate the number of sales increased by 1`)
        logger.info(`Check for number of sales on Top Employee, add a client to that employee, update that client and declare as 'Sold',
        and validate the number of sales increased by 1`)
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnPage('analytics')
        let salesBefore = await this.analyticsPage.validateTopEmployee(topEmployee)
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient(firstName, lastName, country, owner, email)
        await this.actionsPage.updateClient(client, newOwner, changeEmailType, sold)
        await this.analyticsPage.navigateToAnalyticsPage()
        let salesAfter = await this.analyticsPage.validateTopEmployee(topEmployee)
        if (salesAfter === (salesBefore + 1)) {
            console.log(`Validation SECCEEDED: The number of sales on top employee of ${topEmployee} increased by 1`)
            logger.info(`Validation SECCEEDED: The number of sales on top employee of ${topEmployee} increased by 1`)
        }
        else {
            console.log(`Validation FAILED: The number of sales on top employee of ${topEmployee} didn't increase by 1. Make sure you add the client with the correct employee / the client has 'NO' in 'Sold'`)
            logger.info(`Validation FAILED: The number of sales on top employee of ${topEmployee} didn't increase by 1. Make sure you add the client with the correct employee / the client has 'NO' in 'Sold'`)
        }
    }
}

const testAnalytics = new TestAnalytics()

async function test() {
    //1 //validate number of employees sales in Greece, update Janice Alvarado's client's 'Sold' to YES, and validate number changed
    await testAnalytics.employeeSales('Greece', 'Janice', 'Jasmin', 'BurgerKing', 'Greece', 'Janice Alvarado', 'Jasmin@TheGreat.com', 'Jasmin BurgerKing', null, null, 'sold')

    //2 //validate number of Email Sent, delete a client that has an email type and validate the number of Email Sent changed
    await testAnalytics.emailsSent("Email Type", "B", "Email Type", "delete")

    /*3 //check for number of sales on Top Employee, add a client to that employee, update client and declare as 'Sold',
        and validate the number of sales */
    let topEmployee = {
        JaniceAlvarado: 1,
        MartinMassey: 2,
        EmilyDurham: 3
    }
    // //Check Janice
    await testAnalytics.topEmployee(topEmployee.JaniceAlvarado, 'David', 'King', 'Croatia', 'Janice Alvarado', 'David@TheMighty.com', 'David King', null, null, 'sold')

    // //Check Martin
    await testAnalytics.topEmployee(topEmployee.MartinMassey, 'Burla', 'Lewise', 'Croatia', 'Martin Massey', 'BurlaL@TheMighty.com', 'Burla Lewise', null, null, 'sold')

    // //Check Emily
    await testAnalytics.topEmployee(topEmployee.EmilyDurham, 'Marika', 'Jonhanson', 'Croatia', 'Emily Durham', 'MarikaJ@TheMighty.com', 'Marika Jonhanson', null, null, 'sold')
    await testAnalytics.homePage.close()
}
test()