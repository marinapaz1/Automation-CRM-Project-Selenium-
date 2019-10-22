const BasePage = require("./BasePage")
const HomePage= require("./HomePage")
const AnalyticsPage = require("./AnalyticsPageNew")
const ClientsPage = require("./ClientsPage")
const ActionsPage = require("./ActionsPage")


class TestAnalytics {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.homePage = new HomePage(this.testSelenium)
        this.analyticsPage = new AnalyticsPage(this.testSelenium)
        this.clientsPage = new ClientsPage(this.testSelenium)
        this.actionsPage = new ActionsPage(this.testSelenium)
    }

    async employeeSales(countrySales, firstName, lastName, country, owner, email, client, newOwner=null, changeEmailType= null, sold) {
        console.log(`Check for number of sales of Janice Alvarado in ${countrySales}, change the sales number by adding a client in Greece\nfor Janice Alvarado and update it to declare as sold, then validate the number of sales increased by 1`)
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnAnalytics()
        let salesBefore = await this.analyticsPage.validateEmployeeSales(countrySales)
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient(firstName, lastName, country, owner, email)
        await this.actionsPage.updateClient(client, newOwner, changeEmailType, sold)
        await this.analyticsPage.navigateToAnalyticsPage()
        let salesAfter = await this.analyticsPage.validateEmployeeSales(countrySales)
            if(salesAfter = (salesBefore + 1)) {
                console.log(`VALIDATION SECCEEDED: THE 'EMPLOYEE SALES' NUMBER OF JANICE ALVARADO IN ${countrySales} INCREASED BY 1`)
            }
            else { 
                console.log(`VALIDATION FAILED: THE 'EMPLOYEE SALES' NUMBER OF JANICE ALVARADO IN ${countrySales} DIDNT'T INCREASE BY 1. Make sure to verify 3 Pre-Requisites:\nClient's country is ${countrySales};\nClient's owner is Janice Alvarado;\nClient's 'Sold' is 'NO'`)
            }
        await this.testSelenium.close()
    }

    async emailsSent(searchBy, input, type, deleteClient, updateClient= null, country= null, email= null) {
        console.log(`Check for number of Email Sent, delete a client that has an email type, and validate the number of Email Sent decreased by 1`)
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnAnalytics() 
        let emailsSentBefore = await this.analyticsPage.validateEmailsSent()
        await this.clientsPage.navigateToClientsPage()
        await this.clientsPage.searchByAndValidate(searchBy, input, type)
        await this.clientsPage.deleteOrUpdateClient(deleteClient, updateClient, country, email)
        await this.analyticsPage.navigateToAnalyticsPage()
        let emailsSentAfter = await this.analyticsPage.validateEmailsSent()
            if(emailsSentAfter = (emailsSentBefore - 1)){
                console.log(`VALIDATION SECCEEDED: THE 'EMAILS SENT' NUMBER DECREASED BY 1`)
            }
            else {
                console.log(`VALIDATION FAILED: THE 'EMAILS SENT' NUMBER DIDN'T DECREASED BY 1. Make sure to verify Pre-Requisite: Existing client's email type`) 
            }
        await this.testSelenium.close()
    }

    async topEmployee(topEmployee, firstName, lastName, country, owner, email, client, newOwner = null, changeEmailType = null, sold){
        console.log(`Check for number of sales on Top Employee, add a client to that employee, update that client and declare as 'Sold',
        and validate the number of sales increased by 1`)
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnAnalytics()
        let salesBefore = await this.analyticsPage.validateTopEmployee(topEmployee)
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.addNewClient(firstName, lastName, country, owner, email)
        await this.actionsPage.updateClient(client, newOwner, changeEmailType, sold)
        await this.analyticsPage.navigateToAnalyticsPage()
        let salesAfter = await this.analyticsPage.validateTopEmployee(topEmployee)
            if (salesAfter = (salesBefore + 1)){
                console.log(`VALIDATION SECCEEDED: THE NUMBER OF SALES ON TOP EMPLOYEE OF ${topEmployee} INCREASED BY 1`)
            }
            else{
                console.log(`VALIDATION FAILED: THE NUMBER OF SALES ON TOP EMPLOYEE OF ${topEmployee} DIDN'T INCREASE BY 1. Make sure you add the client with the correct employee`)
            }
        await this.testSelenium.close()

    }

}

const testAnalytics = new TestAnalytics()

//1 //validate number of employees sales in Greece, update Janice Alvarado's client's 'Sold' to YES, and validate number changed
testAnalytics.employeeSales('Greece', 'Jasmin', 'BurgerKing', 'Greece', 'Janice Alvarado', 'Jasmin@TheGreat.com', 'Jasmin BurgerKing', null, null, 'sold')


//2 //validate number of Email Sent, delete a client that has an email type and validate the number of Email Sent changed
// testAnalytics.emailsSent("Email Type", "B", "Email Type", "delete")


/*3 //check for number of sales on Top Employee, add a client to that employee, update client and declare as 'Sold',
    and validate the number of sales */
let topEmployee = ["Janice Alvarado", "Barton Ramirez", "Martin Massey"]
//Check Janice
// testAnalytics.topEmployee(topEmployee[0], 'Joshua', 'BurgerKing', 'Croatia', 'Janice Alvarado', 'Joshua@TheMighty.com', 'Joshua BurgerKing', null, null, 'sold')

//Check Barton
// testAnalytics.topEmployee(topEmployee[1], 'Jasmina', 'BurgerKinga', 'Croatia', 'Barton Ramirez', 'Jasmina@TheMighty.com', 'Jasmina BurgerKinga', null, null, 'sold')

//Check Martin
// testAnalytics.topEmployee(topEmployee[2], 'JoshuaJr', 'BurgerKing', 'Croatia', 'Martin Massey', 'JoshuaJr@TheMighty.com', 'JoshuaJr BurgerKing', null, null, 'sold')
