"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: 
   Date:  

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

// Set the date to be displayed in the calendar
let thisDay = new Date("August 24, 2018");

// Write the calendar to the div with the id "calendar"
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// Definition of the createCalendar() function to generate the calendar table
function createCalendar(calDate) {
    let calendarHTML = "<table id='calendar_table'>";
    calendarHTML += calCaption (calDate);
    calendarHTML += calWeekdayRow();
    calendarHTML += calDays(calDate);
    calendarHTML += "</table>";
    return calendarHTML;
}

// Definition of the calCaption() function to write calendar caption
function calCaption(calDate) {
    // monthName array contains the list of month names
    let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // Determine the current month
    let thisMonth = calDate.getMonth();
    // Determine the current year
    let thisYear = calDate.getFullYear();
    //Create the caption
    return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
} // end of calCaption() function

// Definition of the calWeekdayRow() function to write a table row of weekday abbreviations
function calWeekdayRow() {
    // Array of weekday abbreviations
    let dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let rowHTML = "<tr>";
    // Loop through the dayName array and create <th> elements
    for(let i =0; i < dayName.length; i++) {
        rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
    }

    rowHTML += "</tr>";
    return rowHTML;
}

// Definition of the daysInMonth() function to calculate the number of days in the month
function daysInMonth(calDate) {
    // Array of days in each month 
    let dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Extract the four digit year and month values
    let thisYear = calDate.getFullYear();
    let thisMonth = calDate.getMonth();

    // Revise the days in February for leap years
    if(thisYear % 4=== 0) {
        if((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
            dayCount[1] = 29;
        }
    }

    // Return the number of days for the current month
    return dayCount[thisMonth];
} 

// Definition of the calDays() function to create table rows for each day in the month
function calDays(calDate) {
    // Determine the starting day of the month
    let day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    let weekDay = day.getDay();

    // Write blank cells in a row before the starting day of the month
    let htmlCode = "<tr>"
    for(let i = 0; i < weekDay; i++) {
      htmlCode += "<td></td>";  
    }

    // Write the cells for each day of the month
    let totalDays = daysInMonth(calDate)

    let highlightDay = calDate.getDate();

    for(let i = 1; i <= totalDays; i++) {
       day.setDate(i);
       weekDay = day.getDay();
       
       if(weekDay === 0) {
          htmlCode += "<tr>";  
       }

       if(i === highlightDay) {
        htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";          
       } else {
        htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";  
       }

       if(weekDay === 6) {
          htmlCode += "</tr>";  
       }
    } // end of for loop

    return htmlCode;
}