const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');
    this.date = new Date()
    this.time=this.date.getHours() +"-"+ this.date.getMinutes()+"-"+ this.date.getSeconds()
    this.env = process.env.NODE_ENV || 'development';
    this.logDir = 'C:/BOOTCAMP/Automation_CRM_Project';


// Create the log directory if it does not exist
if (!fs.existsSync(this.logDir)) {
  fs.mkdirSync(this.logDir);
}
const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: 'silly',
  filename: `${this.logDir}/log/logs.log`,
  datePattern: 'YYYY-MM-DD'
});

this.logger = createLogger({
  // change level if in dev environment versus production
  level: this.env === 'development' ? 'verbose' : 'info',
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `[${info.label}]: ${info.timestamp} - ${info.level}: ${info.message}`)
  ),
  transports: [
    dailyRotateFileTransport
  ]
});

module.exports = this.logger;

