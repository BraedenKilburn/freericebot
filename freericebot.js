/**
 * FreeRiceBot Javascript Function
 * Author: Nathan Tsai & Braeden Kilburn
 * Last Updated: Apr 2022
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * FreeRiceBot function to automatically answer freerice.com questions until:
 *      a specified amount of hours has passed or
 *      a specified amount of rice was earned,
 * but not both.
 * 
 * Currently only works for Multiplication Table category of questions.
 */
function freericebot() {

    // one liner for multiplication table answer
    // $(("div[data-target=a" + eval($("div[class=card-title]").textContent.replace(" x ", "*")).toString())).click()

    // all possible answers
    // document.querySelectorAll("div.card-button")
    FRBthis = this;

    this.run = async function(riceWanted=30) {
        this.riceWanted = riceWanted; // amount of rice wanted (default 30 grains)

        this.riceDonated = parseInt(document.querySelector("div[class=rice-counter__value] span").textContent.replace(",", ""));
        this.goal = this.riceDonated + this.riceWanted; // total rice desired
        this.category = document.querySelector("div[class=rice-counter__category-text]").textContent;

        console.log("have: " + this.riceDonated + "\n");
        console.log("want: " + this.goal + "\n");

        // Print estimated time to run for the desired amount of rice
        minTime = this.getEstimatedTime(riceWanted * 6); // Min of 6 seconds per question
        maxTime = this.getEstimatedTime(riceWanted * 8); // Max of 8 seconds per question

        console.log(`This will take between ${minTime[0] != 0 ? minTime[0] + " minutes " + 
                                            (minTime[1] != 00 ? " and " + minTime[1] + " seconds " : "") :
                                            (minTime[1] != 00 ? minTime[1] + " seconds " : " 0 seconds ")}to ${
                                            maxTime[0] != 0 ? maxTime[0] + " minutes " +
                                            (maxTime[1] != 00 ? " and " + maxTime[1] + " seconds " : "") :
                                            (minTime[1] != 00 ? minTime[1] + " seconds " : " 0 seconds ")}to complete`);

        // run bot with 6-8 second intervals until max rice reached
        while(true) {
            ret = FRBthis.getRice();
            if (ret != 0) {
                break;
            }
            delay = 6000 + Math.random() * 2000;
            await sleep(delay);
        }
    }

    this.getRice = function() {
        this.riceDonated = parseInt(document.querySelector("div[class=rice-counter__value] span").textContent.replace(",", ""));
        console.log("earned: " + this.riceDonated + " / " + this.goal + "\n");
        if (this.riceDonated >= this.goal) {
            console.log("stopping bot");
            return 1;
        }

        question = document.getElementsByClassName("card-title")[0].textContent;

        answer = 0;
        if (this.category == "Multiplication Table") {
            question = question.replace("x", "*");
            answer = eval(question);
        }
        // TODO: handle fraction questions and fraction eval to answer string to target button
        else if (this.category == "Basic Math (Pre-Algebra)") {
            
            // Handle rounding questions
            if (question.includes("rounded")) {
                question = question.replace(" rounded =", "");
                answer = Math.round(parseInt(question));
            }
            // Handle multiplication questions
            else if (question.includes("x")) {
                question = question.replace("x", "*");
                question = question.replace(" =", "");
                answer = eval(question);
            }
            // Handle fraction questions
            else if (question.includes("")) {
            }
            // Handle other operation questions
            else {
                question = question.replace(" =", "");
                answer = eval(question);
            }
        }

        // Find target button element
        button = [...document.querySelectorAll("div.card-button")].filter(div => div.innerText == (answer).toString())[0]
        button.click();
        return 0;
    }

    // Returns the estimated amount of time to run the program (format: M:SS)
    this.getEstimatedTime = s => {
        time = (s-(s%=60))/60+(9<s?':':':0')+s
        return time.split(":");
    }
}

var bot = new freericebot();
bot.run(/* Insert amount of rice to donate */);
