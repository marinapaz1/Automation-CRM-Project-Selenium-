const logger = require("./logger")

class AnalyticsPage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToAnalyticsPage(){
        await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
        await this.selenium.validURL("analytics")
        await this.selenium.driver.sleep(3000)     // wait until the data loads on the page    
    }

//1 //Check for number of sales of an employee in chosen country
    async validateEmployeeSales(countrySales, employeeName) {
        //Check for the number of sales in some country in Employee Sales field
        try {
            await this.selenium.write(countrySales, "xpath", `//div[contains(@class,'employees-sales-by-country-chart')]//ancestor::select[contains(@class,'select-css')]`)    // insert country name in the Employee Sales search field
            await this.selenium.driver.sleep(2000)      // wait until the data loads on the page

            // get the text of number of sales of that employee in chosen country
            let employeeSales = await this.selenium.getTextFromElement("xpath", `//*[contains(@class,'recharts-pie-label-text')]//*[contains(text(),'${employeeName}')]`) 
            let employeeSalesArr = employeeSales.split(" ")

            // Transfert the text to number for validation purposes
            let salesText = employeeSalesArr[2]
            let numOfSales = parseInt(salesText, 10)                                                                        // change the text of the number to integer
            let theEmployee = (`${employeeSalesArr[0]} ${employeeSalesArr[1]}`)
            console.log(`The number of sales in ${countrySales} of ${theEmployee} ${numOfSales}`)
            logger.info(`The number of sales in ${countrySales} of ${theEmployee} ${numOfSales}`)
            return numOfSales
        } catch (error) {
            console.error(`Couldn't get the number of sales in Employee Sales field: ${error}`)
            logger.error(`Couldn't get the number of sales in Employee Sales field: ${error}`)
        }
            await this.selenium.driver.sleep(2000)                                                                  
    }

    // 2// Get the number of email sent
    async validateEmailsSent(){
    //Check for the number of Emails Sent 
        try {
            let emailsSent = await this.selenium.getTextFromElement("css", `div.badges div.badge:nth-child(2) div.badge-val`)
            await this.selenium.driver.sleep(2000) 
            
            // Transfert the text to number 
            let numEmailsSent = parseInt(emailsSent, 10)            // change the text of the number to integer (for validation purposes)
            console.log(`The number of Emails Sent is: ${numEmailsSent}`)
            logger.info(`The number of Emails Sent is: ${numEmailsSent}`)
            return numEmailsSent
        } catch (error) {
            console.error(`Couldn't get the number of Email Sent: ${error}`)
            logger.error(`Couldn't get the number of Email Sent: ${error}`)
        }
            await this.selenium.driver.sleep(3000)                                                                  
    }

    // change the text (sales: num) to integer from function validateTopEmployee() below and return number
    async _strToInt(topEmployeeName, topEmployee) {
        let salesArr = topEmployeeName.split(" ")
        let sales = salesArr[0]
        let num = salesArr[2]
        let number = parseInt(num, 10)
        console.log(`${topEmployee}: ${sales} ${number}`)
        logger.info(`${topEmployee}: ${sales} ${number}`)
        return number 
    }

    //3 // Get the number of sales of Top Employee
    async validateTopEmployee(topEmployee) {
        switch (topEmployee) {
            case "Janice Alvarado":
                await this.selenium.clickElement('css', `g.recharts-layer.recharts-bar g.recharts-layer.recharts-bar-rectangle:nth-child(1) path`)
        break;
            case "Martin Massey":
                await this.selenium.clickElement("css", `g.recharts-layer.recharts-bar g.recharts-layer.recharts-bar-rectangle:nth-child(2) path`) 
        break;
            case "Emily Durham":
                await this.selenium.clickElement("css", `g.recharts-layer.recharts-bar g.recharts-layer.recharts-bar-rectangle:nth-child(3) path`)
        break;
        default:
            console.log(`Couldn't get the sales of ${topEmployee}`)
            }
        let topEmployeeName = await this.selenium.getTextFromElement("css", "ul.recharts-tooltip-item-list li.recharts-tooltip-item")
        await this.selenium.driver.sleep(2000)
        let int = await this._strToInt(topEmployeeName, topEmployee)
        return int   
    }
}
module.exports = AnalyticsPage
