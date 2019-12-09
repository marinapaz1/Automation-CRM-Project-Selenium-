class HomePage{
    constructor(selenium){
        this.selenium = selenium
    }
    async navigateToHomePage(){
        await this.selenium.getURL("https://lh-crm.herokuapp.com/")
        await this.selenium.validURL("https://lh-crm.herokuapp.com/")
    }

    async clickOnClients () {
        await this.selenium.clickElement("xpath", "//input[@value='Clients']")
        await this.selenium.validURL("client")
        await this.selenium.driver.sleep(1000) // wait until the data loads on the page
    }

    async clickOnActions () {
        await this.selenium.clickElement("xpath", "//input[@value='Actions']")
        await this.selenium.validURL("actions")
        await this.selenium.driver.sleep(1000) // wait until the data loads on the page
    }

    async clickOnAnalytics () {
        await this.selenium.clickElement("xpath", "//input[@value='Analytics']")
        await this.selenium.validURL("analytics")
        await this.selenium.driver.sleep(1000) // wait until the data loads on the page
    }

    async close() {
        await this.selenium.close()
    }
}

module.exports = HomePage