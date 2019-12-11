const BasePage = require("./BasePage")
const HomePage = require("./HomePage")
const ClientsPage = require("./ClientsPage")
const logger = require('./logger')

class TestClients {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.homePage = new HomePage(this.testSelenium)
        this.clientsPage = new ClientsPage(this.testSelenium)
    }

    //Search client's data by one of the parameters that is optional in the search field and validate that the result matches the search
    async searchAndValidate(searchBy, input, type) {
        console.log('Test: Going to search a client and validate that the result matches the searched data')
        logger.info('Test: Going to search a client and validate that the result matches the searched data')
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnPage('clients')
        await this.clientsPage.searchByAndValidate(searchBy, input, type)
    }

    // Delete or update a client and validate it actually was deleted/ updated accordingly
    async updateClient(searchBy, input, type, deleteClient = null, updateClient = null, country = null, email = null) {
        console.log('Test: Going to update a client and validate it actually was updated successfuly')
        logger.info('Test: Going to update a client and validate it actually was updated successfuly')
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnPage('clients')
        let typeBefore = await this.clientsPage.searchByAndValidate(searchBy, input, type)
        await this.clientsPage.deleteOrUpdateClient(deleteClient, updateClient, country, email)
        let typeAfter = await this.clientsPage.searchByAndValidate(searchBy, input, type)
        if (typeBefore !== typeAfter) {
            console.log(`The ${type} was updated SUCCESSFULY. It was: ${typeBefore} and after the update it is: ${typeAfter}`)
            logger.info(`The ${type} was updated SUCCESSFULY. It was: ${typeBefore} and after the update it is: ${typeAfter}`)
        }
        else {
            console.log(`The ${type} FAILED on update. Make sure the country name that is updated is different then existing country name`)
            logger.info(`The ${type} FAILED on update. Make sure the country name that is updated is different then existing country name`)
        }
    }

    async deletClient(searchBy, input, type, deleteClient = null, updateClient = null, country = null, email = null) {
        console.log('Test: Going to delete a client and validate it actually was deleted successfuly')
        logger.info('Test: Going to delete a client and validate it actually was deleted successfuly')
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnPage('clients')
        await this.clientsPage.searchByAndValidate(searchBy, input, type)
        await this.clientsPage.deleteOrUpdateClient(deleteClient, updateClient, country, email)
    }
}
const testClients = new TestClients()

async function test(){
//1 // 'Search a client and validate that the result matches the searched data
await testClients.searchAndValidate("Name", "Jasmin BurgerKing", null)

//2 //Update a client and validate it actually was updated successfuly
let updateClient = "update"
await testClients.updateClient("Name", "Jasmin BurgerKing", 'Country', null, updateClient, "Austria", null)                   // update the Country
await testClients.updateClient("Name", "Jasmin BurgerKing", 'Email', null, updateClient, null , 'Jasmin@TheGreatest.com')    // update the Email

//3 //Delete a client and validate it actually was deleted successfuly
let deleteClient = "delete"
await testClients.deletClient("Name", "Jasmin BurgerKing", null, deleteClient)
await testClients.homePage.close()
}
test()


