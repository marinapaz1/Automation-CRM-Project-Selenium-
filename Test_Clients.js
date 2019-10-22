const BasePage = require("./BasePage")
const HomePage = require("./HomePage")
const ClientsPage = require("./ClientsPage")


class TestClients {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.homePage = new HomePage(this.testSelenium)
        this.clientsPage = new ClientsPage(this.testSelenium)
    } 

    //Search client's data by one of the parameters that is optional in the search field and validate that the result matches the search
    async searchAndValidate(searchBy, input, type){
        console.log('Search a client and validate that the result matches the searched data')
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnClients()
        await this.clientsPage.searchByAndValidate (searchBy, input, type)
        await this.testSelenium.close()
    }



    // Delete or update a client and validate it actually was deleted/ updated accordingly
    async updateClient(searchBy, input, type, deleteClient=null, updateClient=null, country=null, email=null) {
        console.log('Update a client and validate it actually was updated successfuly')
        await this.homePage.navigateToHomePage() 
        await this.homePage.clickOnClients()
        let typeBefore = await this.clientsPage.searchByAndValidate(searchBy, input, type)
            // console.log(`${type}: ${typeBefore}`)
        await this.clientsPage.deleteOrUpdateClient(deleteClient, updateClient, country, email)
        let typeAfter = await this.clientsPage.searchByAndValidate(searchBy, input, type)
            // console.log(`${type}: ${typeAfter}`)
                if(typeBefore !== typeAfter) {
                    console.log(`THE ${type} WAS UPDATED SUCCESSFULY. IT WAS: ${typeBefore} AND AFTER UPDATE IT IS: ${typeAfter}`)
                }
                else{
                    console.log(`THE ${type} WASN'T UPDATED SUCCESSFULY`)
                }
        await this.testSelenium.close()
    }            

    async deletClient(searchBy, input, type, deleteClient=null, updateClient=null, country=null, email=null){
        console.log('Delete a client and validate it actually was deleted successfuly')
        await this.homePage.navigateToHomePage() 
        await this.homePage.clickOnClients()
        await this.clientsPage.searchByAndValidate(searchBy, input, type)
        await this.clientsPage.deleteOrUpdateClient(deleteClient, updateClient, country, email)
        await this.testSelenium.close()
    }
}


const testClients = new TestClients()

//1 // 'Search a client and validate that the result matches the searched data
testClients.searchAndValidate("Country", "Croatia", null)


//2 //Update a client and validate it actually was updated successfuly
let updateClient = "update"
// testClients.updateClient("Name", "Jasmin BurgerKing", 'Country', null, updateClient, "Greece", null)                   // update the Country
// testClients.updateClient("Name", "Jasmin BurgerKing", 'Email', null, updateClient, null , 'Jasmin@TheGreatest.com')    // update the Email


//3 //Delete a client and validate it actually was deleted successfuly
let deleteClient = "delete"
// testClients.deletClient("Name", "Jasmin BurgerKing", null, deleteClient)                                  





