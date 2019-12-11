class HomePage{
    constructor(selenium){
        this.selenium = selenium;
    }
    async navigateToHomePage(){
        await this.selenium.getURL("https://lh-crm.herokuapp.com/")
        await this.selenium.validURL("https://lh-crm.herokuapp.com/")
    }

    async clickOnPage (pageName) {
        pageName = pageName.charAt(0).toUpperCase() + pageName.substring(1).toLowerCase()
        let urlContains = pageName.charAt(0).toLowerCase() + pageName.substring(1).toLowerCase().slice(0, -1)
        await this.selenium.clickElement("xpath", `//input[@value='${pageName}']`)
        await this.selenium.validURL(urlContains)
    }
    
    async close() {
        await this.selenium.close()
    }
}

module.exports = HomePage