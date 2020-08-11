const chalk = require('chalk');
if (process.env.environment === 'development') {
    require('dotenv').config({ path: '../.env'});
}

module.exports = client => {
    //Let us know the Bot is online
    console.log('INFO >> ' + chalk.green(`${client.user.username} is online!`));

    //Get bots start date in day, month, and year.
    let time = new Date();
    let year = time.getFullYear();
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = monthArray[time.getMonth()];
    let dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayName = dayArray[time.getDay()];
    let dayNumber = time.getDate();
    let am_pm = time.toLocaleString('en-US', { hour: '2-digit' , minute: '2-digit', hour12: true });

    console.log(`${dayName}, ${month} ${dayNumber}, ${year} ${am_pm}`);

    // Array of statuses
    let statuses = [
        "?help",
        `Over ${client.users.cache.size} users!`
    ];

    //Sets the status as well as tells us the starting status.
    setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: "WATCHING" })
            .catch(console.error);
    }, 5000);

    //Get Uptime and write to status.json
    setInterval(function () {
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString();
            const min = Math.floor((ms / (1000 * 60)) % 60).toString();
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`;
        }
        let uptime = duration(client.uptime);
        console.log(uptime);
    }, 30000);
};