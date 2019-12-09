
const {Builder, By, Key , until} = require('selenium-webdriver');
const logger = require("./logger")
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

class SelenuimInfra{
    constructor(){
        this.driver = new Builder().forBrowser('chrome').build();
    }

    async getURL(URL){ // Open browser
        await this.driver.get(URL)
        await this.driver.manage().window().maximize()
    }   

    async close(){ // Close browser
        setTimeout(()=>{
            this.driver.quit()
        }, 1000)
    }

    async validURL(pageName){ // Compare convert and wanted URL
        if(await this.driver.wait(until.urlContains(pageName), 1000)){
            console.log("This Is The Right URL")
        }
        else{
            console.log("This Is Wrong URL")
        }
    }

// Click on element
    async clickElement(locatorType = "id" , locatorValue = " " , element = null , fromElement = null) {
        try {
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await this.driver.sleep(2000)
            await element.click()
            await this.driver.sleep(3000)
            console.log(`Clicked on element with ${locatorType} = ${locatorValue}`)
        }
        catch (error) {
            console.error(`Got error while trying to click on element with ${locatorType} = ${locatorValue} + ${error}`)
            logger.debug(`Got error while trying to click on element with ${locatorType} = ${locatorValue} + ${error}`)
        }
    }


// Send Keys To Element
    async write(data , locatorType , locatorValue , element , fromElement){
        try {
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await element.sendKeys(data)
            console.log(`Send Keys to element with ${locatorType} = ${locatorValue} `)
        }
        catch (error) {
            console.error(`Got error while trying to send keys to element with ${locatorType} = ${locatorValue}`)
            logger.debug(`Got error while trying to send keys to element with ${locatorType} = ${locatorValue}`)
        }
    }

// Get text from element
    async getTextFromElement(locatorType , locatorValue , element = null , fromElement = null){
        try {
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            console.log(`Get text from element with ${locatorType} = ${locatorValue} `)
            return element.getText()
        }
        catch (error) {
            console.error(`Got error while trying to get text from element with ${locatorType} = ${locatorValue}`)
            logger.debug(`Got error while trying to get text from element with ${locatorType} = ${locatorValue}`)
            return ""
        }
    }

// Clear element field
    async clearElementField(locatorType , locatorValue , element , fromElement){
        try {
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await element.clear()
            console.log(`Clear text from element with ${locatorType} = ${locatorValue} `)
        }
        catch (error) {
            console.error(`Got error while trying to Clear text from element with ${locatorType} = ${locatorValue}`)
            logger.debug(`Got error while trying to Clear text from element with ${locatorType} = ${locatorValue}`)
        }
    }

// Check if element exists
async isElementExists(locatorType , locatorValue, element , fromElement){
    try {
        if(!element){
            if(fromElement){
                element = await fromElement.findElement(By[locatorType](locatorValue))
            }
            else{
                element = await this.driver.findElement(By[locatorType](locatorValue))
            }
            return true
        }
    }
    catch{
        logger.debug(`Couldn't determine if element is exist + ${error}`)
        return false
    }
}


// Find and return element by type and value
    async findElementBy(locatorType , locatorValue , fromElement = null){
        let element
        try{
            if(fromElement){
                element = await fromElement.findElement(By[locatorType](locatorValue))
            }
            else{
                element = await this.driver.findElement(By[locatorType](locatorValue))
            }
            console.log(`Find element with ${locatorType} = ${locatorValue} `)
        }
        catch{
            console.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
            logger.debug(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
        }

    }

// Find all the elements with the same type and value and return array(list)
    async findElementListBy(locatorType , locatorValue , fromElement = null){
        let element
        try{
            if(fromElement){
                element = await fromElement.findElements(By[locatorType](locatorValue))
            }
            else{
                element = await this.driver.findElements(By[locatorType](locatorValue))
            }
            return element
        }
        catch{
            console.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
            logger.debug(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
        }

    }

}

module.exports = SelenuimInfra