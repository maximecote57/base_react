export function getDiffBetweenTwoDatesInMinutes (oldDate, newDate) {

    return Math.round((((newDate - oldDate) % 86400000) % 3600000) / 60000);

}