const logger = require('./logger')
class ActionsPage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToActionsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/actions")
        await this.selenium.validURL("actions")
    }

    //Validate the pop up that indicates success or error matches the operation 
    async _validatePopUp() {
        try {
            let popUp = await this.selenium.getTextFromElement("xpath", `//div[contains(@class,'pop-up')]/div`)
            if (popUp === "SOME DETAILS ARE MISSING") {
                logger.info(`${popUp}`)
            }
            else if (popUp === "UPDATE SUCCESSFUL") {
                logger.info(`${popUp}`)
            }
        } catch (error) {
            logger.error(`Couldn't get the pop-up: ${error}`)
        }
    }

    //1  Add a new client and check the pop up is successful
    async addNewClient(firstName, lastName, country, owner, email) {
        try {
            await this.selenium.write(firstName, "id", "firstName")                 // insert first name
            await this.selenium.write(lastName, "id", "lastName")                   // insert last name
            await this.selenium.write(country, "id", "country")                     // insert country
            await this.selenium.write(owner, "css", 'input[id="owner"]')            // insert owner
            await this.selenium.write(email, "id", "email")                         // insert email
            await this.selenium.clickElement("className", "add-client-btn")         // click on 'Add' button
            await this._validatePopUp()
        } catch (error) {
            console.log(`Couldn't add a new client: ${error}`)
            logger.error(`Couldn't add a new client: ${error}`)
        }
    }

    //2 Update the client's details 
    async updateClient(client, newOwner, changeEmailType, sold) {
        try {
            // insert client's name
            await this.selenium.write(client, "css", "input[list='names']")           
            await this.selenium.driver.sleep(1000)

            // update client's owner 
            if (newOwner) {
                console.log(`Going to update the owner`)
                logger.info(`Going to update the owner`)
                await this.selenium.write(newOwner, "css", "input[list='owner']")     // insert owner's name
                await this.selenium.driver.sleep(1000)
                await this.selenium.clickElement("css", "input[value='Transfer']")    // click on 'Transfer'
                await this._validatePopUp()                                           // validate the pop up
            }
            // update client's email type
            if (changeEmailType) {
                console.log(`Going to update the email type`)
                logger.info(`Going to update the email type`)
                await this.selenium.write(changeEmailType, "css", "input[list='emailType']")   // insert email type (any)
                await this.selenium.driver.sleep(1000)
                await this.selenium.clickElement("css", "input[value='Send']")                 // click on 'Send'
                await this._validatePopUp()                                                    // validate the pop up
            }
            //update decleare as 'Sold'
            if (sold) {
                console.log(`Going to declear as Sold`)
                logger.info(`Going to declear as Sold`)
                await this.selenium.driver.sleep(1000)
                await this.selenium.clickElement("css", "input[value='Sold']")                // click on 'Sold'   
                await this._validatePopUp()                                                   // validate the pop up
            }
        } catch(error) {
            console.log(`Couldn't update the client ${client}: ${error}`)
            logger.error(`Couldn't update the client ${client}: ${error}`)
        }
    }
}

module.exports = ActionsPage
