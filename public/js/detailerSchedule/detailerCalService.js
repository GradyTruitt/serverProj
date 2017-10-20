angular.module('detailApp').service('detailerCalService', function($http, $compile){

//Initial Date Variables
var d = new Date();
var today = d.getDate();
var thisYear = d.getFullYear();
var thisMonth = d.getMonth();
var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];

this.dateInfo = function(today, thisYear, thisMonth) {    
    this.dateInformation = {
        day: parseInt(today),
        month: month_name[thisMonth],
        year: thisYear
    };
};

//Change Selected Day & Month
this.selectDate = function(event, arr){
    var day = event.srcElement.attributes.id.value.substring(3);
    var thisDay = new Date().getMonth();
    var month = d.getMonth();
    var year = d.getFullYear();
    d.setFullYear(year, month, 1);

    if (d.getMonth() !== thisDay) {
        today = day;
    }
    if (d.getMonth() === thisDay) {
        today = day;
    }
    this.selected = " " + today + ", ";
    thisYear = d.getFullYear();
    thisMonth = d.getMonth();
    this.dateInfo(today, thisYear, thisMonth);
    document.getElementById('schedule-dates').innerHTML = '';
    // if (today !== new Date().getDate()) {
    //     console.log(today, new Date().getDate());
    //     var buttons = document.getElementsByClassName('mark-complete-btn');
    //     for (var i = 0; i < buttons.length; i++) {
    //         buttons[i].style.display = "none";
    //     }
    // }
    // if (today == new Date().getDate()) {
    //     var buttons2 = document.getElementsByClassName('mark-complete-btn');
    //     for (var x = 0; x < buttons2.length; x++) {
    //         buttons2[x].style.display = "block";
    //     }
    // }
    this.loadCal(arr);
};

//Change Month Forward
this.setDate = function(arr){
    var thisDay = new Date().getMonth();
    var month = d.getMonth();
    var year = d.getFullYear();
    d.setFullYear(year, month+=1);

    if (d.getMonth() !== thisDay) {
        today = "";
    }
    if (d.getMonth() === thisDay) {
        today = new Date().getDate();
    }

    thisYear = d.getFullYear();
    thisMonth = d.getMonth();
    document.getElementById('schedule-dates').innerHTML = '';
    this.loadCal(arr);
};


//Change Month Backward
this.setDateBack = function(arr){
    var thisDay = new Date().getMonth();
    var month = d.getMonth();
    var year = d.getFullYear();
    d.setFullYear(year, month-=1);

    if (d.getMonth() !== thisDay) {
        today = "";
    }
    if (d.getMonth() === thisDay) {
        today = new Date().getDate();
    }

    thisYear = d.getFullYear();
    thisMonth = d.getMonth();
    document.getElementById('schedule-dates').innerHTML = '';
    this.loadCal(arr);
};


//Load Calendar On Screen
this.loadCal = function(appts){
    var month = d.getMonth();
    var year = d.getFullYear();
    var first_date = month_name[month] + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0, 3);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);
    var days = new Date(year, month+1, 0).getDate();
    var calendar = get_calendar(day_no, days, appts);
    document.getElementById("schedule-month-year").innerHTML = month_name[month]+" "+year;
    document.getElementById("schedule-dates").appendChild(calendar);
};

function get_calendar(day_no, days, appts){
    var table = document.createElement('table');
    table.setAttribute('class','schedule-table');
    var tr = document.createElement('tr');
    tr.setAttribute('class','schedule-days-row');

    //Row For The Day Letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        td.setAttribute("id", "day-letter");
        td.setAttribute("class", "schedule-day-letter");
        tr.appendChild(td);
    }
    table.appendChild(tr);

    
    //Create 2nd row
    tr = document.createElement('tr');
    tr.setAttribute('class',"schedule-row");
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.setAttribute('class',"empty-day");
        td.innerHTML = "";
        tr.appendChild(td);
    }
    

    //Start Counting Days
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        td.setAttribute('class','schedule-day-cell');
        td.innerHTML = count;
        td.setAttribute("id", "day"+count);
        tr.appendChild(td);
        if (td.innerHTML === today.toString()) {
            td.style.color = 'white';
                td.style.fontSize = '16pt';
                td.style.fontWeight = "600";
                td.style.borderColor = '#000620';
                td.style.backgroundColor = "#000620";
        }
        count++;
    }
    table.appendChild(tr);
    
    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        tr.setAttribute('class','schedule-row');
        for(var c=0; c<=6; c++){


            //If Last Day Is In  Last Position
            if (count === days && c === 6) {
                var td = document.createElement('td');
                td.setAttribute('class','schedule-day-cell');
                td.innerHTML = count;
                td.setAttribute("id", "day"+count);
                count++;
                tr.appendChild(td);
                table.appendChild(tr);

                //Add Appointments To Calendar
                var day = td.innerHTML;

                for (var i = 0; i < appts.length; i++) {
                    if(appts[i].appointmentdate.day.toString() === day && month_name.indexOf(appts[i].appointmentdate.month) === thisMonth && appts[i].appointmentdate.year === thisYear) {
                        var newApp = document.createElement('div');
                        newApp.setAttribute("class", "appointment");
                        newApp.setAttribute("id", "appointment"+day);
                        if(day <= 9) {
                            newApp.style.marginLeft = "0";
                        }
                        if (day === today){
                            newApp.style.marginLeft = "-10px";
                            newApp.setAttribute("class", "selected-appt");
                        }
                        if (day === today && day <= 9){
                            newApp.style.marginLeft = "-18px";
                            newApp.setAttribute("class", "selected-appt2");
                        }
                        td.appendChild(newApp);
                    }
                }

                //Change Style of Today's Date
                if (td.innerHTML === today.toString()) {
                    td.style.color = 'white';
                    td.style.fontSize = '16pt';
                    td.style.fontWeight = "600";
                    td.style.borderColor = '#000620';
                    td.style.backgroundColor = "#000620";
                }
                return table;
            }


            //Fill Extra Cells With Blank
            if (count > days) {
                var tde = document.createElement("td");
                tde.setAttribute('class','empty-day');
                tde.innerHTML = "";
                tr.appendChild(tde);
            }


            //Next Row
            if(count > days && c >= 6){
                table.appendChild(tr);
                return table;
            }


            //Add Days To Calendar
            if (count <= days) {
            var td = document.createElement('td');
            td.setAttribute('class','schedule-day-cell');
            td.innerHTML = count;
            td.setAttribute("id", "day"+count);
            count++;
            tr.appendChild(td);
            }

            //Change Style of Today's Date
            if (td.innerHTML === today.toString()) {
                td.setAttribute("id", "day_today_schedule");
                td.style.color = 'white';
                td.style.fontSize = '16pt';
                td.style.fontWeight = "600";
                td.style.borderColor = '#000620';
                td.style.backgroundColor = "#000620";
            }

            //Add Appointments to Calendar
            var day = td.innerHTML;
            for (var i = 0; i < appts.length; i++) {
                if(appts[i].appointmentdate.day.toString() === day && month_name.indexOf(appts[i].appointmentdate.month) === thisMonth && appts[i].appointmentdate.year === thisYear) {
                    var newApp = document.createElement('div');
                    newApp.setAttribute("class", "appointment");
                    newApp.setAttribute("id", "appointment"+day);
                    if(day <= 9) {
                        newApp.style.marginLeft = "0";
                    }
                    if (day == today){
                        newApp.style.marginLeft = "-10px";
                        newApp.setAttribute("class", "selected-appt");
                    }
                    if (day == today && day <= 9){
                        newApp.style.marginLeft = "-18px";
                        newApp.setAttribute("class", "selected-appt2");
                    }
                    td.appendChild(newApp);
                }
            }
        }
        table.appendChild(tr);
    }

    return table;
}

});