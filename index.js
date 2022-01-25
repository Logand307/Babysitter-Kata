//inquirer NPM package allowing for user input collection via command line
const inquirer = require("inquirer");

//moment.js NPM package allowing for 24 time conversion and final calculations
const moment = require("moment");

//empty array for name
const firstName = [];

function babySitter() {
    return inquirer
        .prompt([
            //choices will display 12 hour time period to user, but ultimately reflect value for 24 hour time period via object creation in moment.js. UTC is applicable in this application.
            {
                type: "input",
                name: "name",
                message: "What is your first name?"
            },
            {
                type: "list",
                name: "startTime",
                message: "What time did you start working?",
                choices: [{ name: "5:00 PM", value: 17 }, { name: "6:00 PM", value: 18 }, { name: "7:00 PM", value: 19 }, { name: "8:00 PM", value: 20 }, { name: "9:00 PM", value: 21 }, { name: "10:00 PM", value: 22 }, { name: "11:00 PM", value: 23 }, { name: "12:00 AM", value: 0 }, { name: "1:00 AM", value: 1 }, { name: "2:00 AM", value: 2 }, { name: "3:00 AM", value: 3 }, { name: "4:00 AM", value: 4}]
            },
            {
                type: "list",
                name: "bedTime",
                message: "what time did the kids go to bed?",
                choices: [{ name: "5:00 PM", value: 17 }, { name: "6:00 PM", value: 18 }, { name: "7:00 PM", value: 19 }, { name: "8:00 PM", value: 20 }, { name: "9:00 PM", value: 21 }, { name: "10:00 PM", value: 22 }, { name: "11:00 PM", value: 23 }, { name: "12:00 AM", value: 0 }, { name: "1:00 AM", value: 1 }, { name: "2:00 AM", value: 2 }, { name: "3:00 AM", value: 3 }, { name: "4:00 AM", value: 4}]
            },
            {
                type: "list",
                name: "endTime",
                message: "What time did you finish babysitting?",
                choices: [{ name: "5:00 PM", value: 17 }, { name: "6:00 PM", value: 18 }, { name: "7:00 PM", value: 19 }, { name: "8:00 PM", value: 20 }, { name: "9:00 PM", value: 21 }, { name: "10:00 PM", value: 22 }, { name: "11:00 PM", value: 23 }, { name: "12:00 AM", value: 0 }, { name: "1:00 AM", value: 1 }, { name: "2:00 AM", value: 2 }, { name: "3:00 AM", value: 3 }, { name: "4:00 AM", value: 4}]
            }
        ]).then((answers) => {
            //pushes name collection into empty firstName
            firstName.push(answers.name);

            //moment.js functions to convert user input and establish startTime, bedTime and endTime
            var startTime = moment().hour(answers.startTime);
            var bedTime = moment().hour(answers.bedTime);
            var endTime = moment().hour(answers.endTime);
            

            //exception handling
            if (startTime > endTime) {
                endTime.add(1, "days");
            }
            if (bedTime < startTime) {
                console.log("Bed time cannot be earlier than start time.")
                return
            }
            if (bedTime.hour() < 17) {
                console.log("Bed time can only be after 5pm and before midnight.")
                return
            }
            if (startTime.hour() <= 16) {
                console.log("Start time can only be after 5pm.")
                return
            }

            //start time calculation (start time to bedtime)
            let startAmount = bedTime.diff(startTime, 'hours') * 12
            console.log('Your total wages from your start time to bed time are: $' + startAmount);

            //mid time calculation (from bed time to midnight)
            let midAmount = moment().add(1, "day").hour(0).diff(bedTime, 'hours') * 8
            console.log('Your total wages from bed time to midnight are: $' + midAmount);

            //end time calculation (midnight to end time)
            let endAmount = endTime.diff(moment().add(1, "day").hour(-1), 'hours') * 16
            console.log('Your total wages for midnight to your end time are $' + endAmount);

            //final nightly wage calculation, adding values above together
            let nightWage = (startAmount + midAmount + endAmount);
            console.log(firstName + ', your total wages for the evening are: $' + nightWage);
        }

        )
};
//function call to initialize application
babySitter();

//export for Jest tests
module.exports = babySitter;