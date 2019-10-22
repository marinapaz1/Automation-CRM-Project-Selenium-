const BasePage = require("./BasePage")
const HomePage = require("./HomePage")
const ActionsPage = require("./ActionsPage")
const ClientsPage = require("./ClientsPage")


class TestActions {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.homePage = new HomePage(this.testSelenium)
        this.actionsPage = new ActionsPage(this.testSelenium)
        this.clientsPage = new ClientsPage(this.testSelenium)
    }

    //Add a new client, check the pop up is successful and validate client exists 
    async addNewClientAndValidate(firstName, lastName, country, owner, email, searchBy, input, type){
    console.log("Add a new client, check if pop-up indicates success and validate that the client was actually added")
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnActions()   
        await this.actionsPage.addNewClient(firstName, lastName, country, owner, email)
        await this.clientsPage.navigateToClientsPage() 
        let name = await this.clientsPage.searchByAndValidate(searchBy, input, type)
            if(input === name) {
                console.log(`THE CLIENT ${input} WAS ADDED SUCCESSFULY`)
            }
            else {
                console.log(`FAILED TO ADD THE CLIENT: ${input}`)
            }
        await this.testSelenium.close()
        }

    // Add new client and validate the pop up is accordingly to the operation (successfull or missing data)
    async addNewClient(firstName=null, lastName=null, country=null, owner=null, email=null) {
        console.log("Add a new client and validate the pop up accordingly to the operation")
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnActions()
        await this.actionsPage.addNewClient(firstName, lastName, country, owner, email)
        await this.testSelenium.close()
        }


    // Update client: new owner, or email type, or declare as 'Sold' and validate the update was made
    async updateClient(searchBy, input, type, client, newOwner=null, changeEmailType=null, sold=null){
        console.log("Update a new owner, or email type, or declare as 'Sold' and validate the update was made")
        await this.homePage.navigateToHomePage()
        await this.homePage.clickOnClients()
        let typeBefore =await this.clientsPage.searchByAndValidate(searchBy, input, type)
            // console.log(`${type}: ${typeBefore}`)
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.updateClient(client, newOwner, changeEmailType, sold)
        await this.clientsPage.navigateToClientsPage() 
        let typeAfter = await this.clientsPage.searchByAndValidate(searchBy, input, type)
            // console.log(`${type}: ${typeAfter}`)

                if(typeBefore !== typeAfter){
                    console.log(`THE ${type} WAS UPDATED. IT WAS: ${typeBefore} AND AFTER THE UPDATE IT IS: ${typeAfter}`)
                }
                else {
                    console.log(`The ${type} WASN'T UPDATED`)
                }
        await this.testSelenium.close()
    }
}



const testActions = new TestActions()

//1 //Add a new client, validate pop-up and validate that the client was actually added
testActions.addNewClientAndValidate("Josh", "Burger", "Greece", "Janice Alvarado", "JoshBurger@gmail.com", "Name", "Josh Burger", "Name")
// testActions.addNewClientAndValidate("Jasmin", "BurgerKing", "USA", "Janice Alvarado", "Jasmin@TheGreat.com", "Name", "Jasmin BurgerKing", "Name")


//2 //Negative test -Add a new client with partial data and validate the pop-up 
// testActions.addNewClient("Alexander", "Berington", "Croatia")                                   


//3 //Update a client and validate the update was made
// testActions.updateClient('Name', 'Josh Burger', 'Owner', 'Josh Burger', 'Barton Ramirez', null, null)     // update the owner
// testActions.updateClient('Name', 'Josh Burger', 'Email Type', 'Josh Burger', null, 'C', null)                  // update the email type
// testActions.updateClient('Name', 'Josh Burger', 'Sold', 'Josh Burger', null, null, 'sold')               // update declare as sold 





