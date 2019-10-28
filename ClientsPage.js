flag = true

class ClientsPage {
    constructor(selenium) {
        this.selenium = selenium
    }
    //Validate the pop up that indicates success or error matches the operation 
    async _validatePopUp() {
        try {
            let popUp = await this.selenuim.getTextFromElement("xpath", '//*[@id="root"]/div/div[4]/div[5]')
            if (popUp === "SOME DETAILS ARE MISSING") {
                console.log(`${popUp}`)
            }
            if (popUp === "UPDATE SUCCESSFUL") {
                console.log(`${popUp}`)
            }
        } catch (error) {
            console.log(`Couldn\'t get the pop-up: ${error}`)
        }
    }

    //Open the webpage of 'Clients' 
    async navigateToClientsPage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
        await this.selenium.validURL("client")
    }

    //1 //Search by specific data in the search field and validate that the found item is what was searched
    async searchByAndValidate(searchBy, input, type) {
        try {
            await this.selenium.clearElementField("xpath", "//input[@type='text']")  // clear field 
            await this.selenium.write(searchBy, "className", "select-css")         // insert the parameter to search by
            await this.selenium.write(input, "xpath", "//input[@type='text']")      // insert the value of the chosen parameter 

            let clients = await this.selenium.findElementListBy("className", "clientDetails")
            let lastPage = await this.selenium.getTextFromElement("css", "div.page-numbers span:nth-child(4)")   // get the number of the last page

            // if the client doesn't exist - log a message that indicates that
            await this.selenium.driver.sleep(2000)
            let isExists = await this.selenium.isElementExists("css", 'tr.clientDetails th:nth-child(1)')       // check if the first client exists
            if (!isExists) {
                console.log(`The ${searchBy} is not found`)
            }

            // if there are one or more results- get all data about client(s) with the searched parameter (within all pages)                                    
            for (let c = 1; c <= lastPage; c++) {
                let firstPage = await this.selenium.getTextFromElement("css", "div.page-numbers span:nth-child(2)")  // get the number of the first page                            
                console.log(`Pages: ${firstPage}/${lastPage}\n`)

            for (let i of clients) {
            let isExists = await this.selenium.isElementExists("css", 'tr.clientDetails th:nth-child(1)', null, i)    // check if client exists each iteration
            if (isExists) {
            // check if the parameter that was searched is actually matches the resulted data, if so - log the data
                switch (searchBy) {
                    case "Name":
                        let firstName = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(1)', null, i)  // log the name
                        let lastName = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(2)', null, i)   // log the last name
                        let name = (`${firstName} ${lastName}`)                                                                     // log the full name
                        console.log(`The name of the clients is: ${name}`)
                        if (name !== input) {
                            flag = false
                        }
                    break;
                    case "Country":
                        let country = await this.selenium.getTextFromElement("css", "tr.clientDetails th:nth-child(3)", null, i)
                        console.log(`The country of the clients is: ${country}`)                                                // log the country
                        if (country !== input) {
                            flag = false
                        }
                    break;
                    case "Email":
                        let email = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(4)', null, i)
                        console.log(`The email of the clients is: ${email}`)                                                    // log the email
                        if (email !== input) {
                            flag = false
                        }
                    break;
                    case "Owner":
                        let owner = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(5)', null, i)
                        console.log(`The owner of the clients is: ${owner}`)                                                   // log the owner's name
                        if (owner !== input) {
                            flag = false
                        }
                    break;
                    case "Sold":
                        let sold = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(6)', null, i)
                        console.log(`Sold: ${sold}`)                                                                           // sold: log YES or NO
                        if (sold !== input) {
                            flag = false
                        }
                    break;
                    case "Email Type":
                        let emailType = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(8)', null, i)
                        console.log(`The email type of the clients is: ${emailType}`)                                           // log the email type
                        if (emailType !== input) {
                            flag = false
                        }
                    break;
                    default:
                        console.log(`Couldn't get the client's ${searchBy}`)
                    }

                    //for validation  return the searched parameter
                    if (type === "Sold") {
                        let sold = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(6)', null, i)
                        return sold
                    }
                    if (type === "Owner") {
                        let owner = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(5)', null, i)
                        return owner
                    }
                    if (type === "Email Type") {
                        let email = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(8)', null, i)
                        return email
                    }
                    if (type === "Name") {
                        let firstName = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(1)', null, i)
                        let lastName = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(2)', null, i)
                        let name = (`${firstName} ${lastName}`)
                        return name
                    }
                    if (type === "Country") {
                        let country = await this.selenium.getTextFromElement("css", "tr.clientDetails th:nth-child(3)", null, i)
                        return country
                    }
                    if (type === 'Email') {
                        let email = await this.selenium.getTextFromElement("css", 'tr.clientDetails th:nth-child(4)', null, i)
                        return email
                    }
                }
            }
            await this.selenium.clickElement("css", "img[name='next']")  // click on "next" page arrow
            // Validate the searched value is the same for all clients that were found
            if (flag = true) {
                 console.log(`THE ${searchBy} IS THE SAME FOR ALL CLIENTS`)
            }
            else {
                console.log(`THE ${searchBy} IS NOT THE SAME FOR ALL CLIENTS`)
            }
            }
        } catch (error) {
            console.log(`Couldn't search a client: ${error}`)
        }
        await this.selenium.driver.sleep(2000)
    }

    //2 //Delete or update a client and validate it has been deleted/ updated occordingly
    async deleteOrUpdateClient(deleteClient, updateClient, country, email) {
        try {
            await this.selenium.clickElement("xpath", '//*[@id="root"]/div/div[4]/table/tr[2]/th[4]')           // click on the first client
            if (deleteClient === "delete") {
                console.log('Going to DELETE a client')
                await this.selenium.clickElement("css", "input[value='Delete Client']")                     // click on delete button
                await this._validatePopUp()                                                                  // Validate the pop up (should be: UPDATE SUCCESSFUL)
                //Validate the client was deleted
                let isExists = await this.selenium.isElementExists("xpath", '//*[@id="root"]/div/div[4]/table/tr[2]/th[4]')    // check if the client is exists
                if (!isExists) {
                    console.log('Client was deleted successfully')
                }
                else {
                    console.log('Client wasn\'t deleted / there are more than one client')
                }
                return
            }
            if (updateClient === "update") {
                if (country) {
                    console.log('Going to update the client\'s COUNTRY')
                    await this.selenium.clearElementField("css", 'input[id="country"]')                        // clear the country field
                    await this.selenium.write(country, "id", "country")                                        // insert a new country
                    await this.selenium.clickElement("css", "input[value ='Update Client']")                   // click on update client
                    await this._validatePopUp()                                                                     // Validate the pop up (should be: UPDATE SUCCESSFUL)
                    await this.selenium.driver.sleep(1000)
                    await this.selenium.clearElementField("xpath", "//input[@type='text']")                    // Validate the pop up (should be: UPDATE SUCCESSFUL)
                }
                if (email) {
                    console.log('Going to update the client\'s EMAIL')
                    await this.selenium.clearElementField("css", "input[id='email']")                          // clear the email field
                    await this.selenium.write(email, "css", "input[id='email']")                               // insert a new email
                    await this.selenium.clickElement("css", "input[value ='Update Client']")                   // click on update client
                    await this._validatePopUp()                                                                     // Validate the pop up (should be: UPDATE SUCCESSFUL)
                    await this.selenium.driver.sleep(1000)
                    await this.selenium.clearElementField("xpath", "//input[@type='text']")
                }
            }
        } catch (error) {
            console.log(`Couldn't delete or update a client: ${error}`)
        }
        await this.selenium.driver.sleep(3000)
    }
}

module.exports = ClientsPage