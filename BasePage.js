const SelenuimInfra = require("./SeleniumInfra")

class BasePage {
    constructor(){
        // gets the driver and all functionality of the seleniumInfra class
        this.selenium = new SelenuimInfra()
    }
}

module.exports = BasePage