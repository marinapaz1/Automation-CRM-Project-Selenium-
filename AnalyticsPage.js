class AnalyticsPage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToAnalyticsPage(){
        await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
        await this.selenium.validURL("analytics")
        await this.selenium.driver.sleep(3000)                                                                   // wait 3 sec. until the data loads on the page
    }

//1 //Check for number of sales in Greece of the employee named: Janice Alvarado
    async validateEmployeeSales(countrySales) {
        //Check for the number of sales in Greece in Employee Sales field
        try {
            await this.selenium.write(countrySales, "xpath", '//*[@id="root"]/div/div[4]/div[2]/div[4]/div[1]/select')    // insert country name in the Employee Sales search field
            await this.selenium.driver.sleep(3000)                                                                        // wait 3 sec. until the data loads on the page

            // get the text of number of sales of Janis Alvarado in Greece
            let employeeSales = await this.selenium.getTextFromElement("css", 'g.recharts-layer.recharts-pie-labels > g:nth-child(4) > text > tspan') 
            let employeeSalesArr = employeeSales.split(" ")

            // Transfert the text to number 
            let salesText = employeeSalesArr[2]
            let numOfSales = parseInt(salesText, 10)                                                                        // change the text of the number to integer
            let janiceAlvarado = (`${employeeSalesArr[0]} ${employeeSalesArr[1]}`)
            console.log(`The number of sales in ${countrySales} of ${janiceAlvarado} ${numOfSales}`)
            return numOfSales
        } catch (error) {
            console.error(`Couldn't get the number of sales in Employee Sales field: ${error}`)
        }
            await this.selenium.driver.sleep(3000)                                                                  
    }

    // 2// Get the number of email sent
    async validateEmailsSent(){
    //Check for the number of Emails Sent 
        try {
            let emailsSent = await this.selenium.getTextFromElement("xpath", '//*[@id="root"]/div/div[4]/div[1]/div[2]/div[1]')
            await this.selenium.driver.sleep(3000) 
            
            // Transfert the text to number 
            let numEmailsSent = parseInt(emailsSent, 10)                                                // change the text of the number to integer
            console.log(`The number of Emails Sent is: ${numEmailsSent}`)
            return numEmailsSent
        } catch (error) {
            console.error(`Couldn't get the number of Email Sent: ${error}`)
        }
            await this.selenium.driver.sleep(3000)                                                                  
    }

    // change the text (sales: num) from function validateTopEmployee() to integer and return number
    async _strToInt(topEmployeeName, topEmployee) {
        let salesArr = topEmployeeName.split(" ")
        let sales = salesArr[0]
        let num = salesArr[2]
        let number = parseInt(num, 10)
        console.log(`${topEmployee}: ${sales} ${number}`)
        return number 
    }

    //3 // Get the number of sales of Top Employee
    async validateTopEmployee(topEmployee) {
        //Janice Alvarado                                                                    
        if (topEmployee === "Janice Alvarado") {
            //click to show tooltip and get the text
            await this.selenium.clickElement("css", 'g.recharts-layer.recharts-bar > g > g > g:nth-child(1) > path')
            let topEmployeeName = await this.selenium.getTextFromElement("css", "ul.recharts-tooltip-item-list li.recharts-tooltip-item")
            let int = await this._strToInt(topEmployeeName, topEmployee)
            return int  
        }
        //Barton Ramirez
        if (topEmployee === "Barton Ramirez") {
        //click to show tooltip and get the text
            await this.selenium.clickElement("css", 'g.recharts-layer.recharts-bar > g > g > g:nth-child(3) > path')
            let topEmployeeName = await this.selenium.getTextFromElement("css", "ul.recharts-tooltip-item-list li.recharts-tooltip-item")
            // change the text (sales: num) to integer
            let int = await this._strToInt(topEmployeeName, topEmployee)
            return int  
        }
        //Martin Massey
        if (topEmployee === "Martin Massey") {
            //click to show tooltip and get the text
            await this.selenium.clickElement("css", 'g.recharts-layer.recharts-bar > g > g > g:nth-child(2) > path')
            let topEmployeeName = await this.selenium.getTextFromElement("css", "ul.recharts-tooltip-item-list li.recharts-tooltip-item")
            let int = await this._strToInt(topEmployeeName, topEmployee)
            return int 
        }  
        await this.selenium.driver.sleep(3000)                                                                  
    }

}
module.exports = AnalyticsPage
