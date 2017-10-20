angular.module('detailApp').service('dateSelectionService', function(){


//Initial Date Variables
var d = new Date();
var today = d.getDate();
var thisYear = d.getFullYear();
var thisMonth = d.getMonth();
var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];


this.selected = " " + today + ", ";
// this.dateInformation = '';

this.defaultDate = {
    day: today,
    month: month_name[thisMonth],
    year: thisYear
};

this.dateInfo = function(today, thisYear, thisMonth) {    
    this.dateInformation = {
        day: parseInt(today),
        month: month_name[thisMonth],
        year: thisYear
    };
};

//Change Selected Day & Month
this.selectDate = function(event){
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
    document.getElementById('cal-table1').innerHTML = '';
    this.loadCal();
};

//Change Month Forward
this.setDate = function(){
    this.selected = " ";
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
    document.getElementById('cal-table1').innerHTML = '';
    this.loadCal();
};


//Change Month Backward
this.setDateBack = function(){
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
    document.getElementById('cal-table1').innerHTML = '';
    this.loadCal();
};


//Load Calendar On Screen
this.loadCal = function(){
    // var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = d.getMonth();
    var year = d.getFullYear();
    var first_date = month_name[month] + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0, 3);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);
    var days = new Date(year, month+1, 0).getDate();
    var calendar = this.get_calendar(day_no, days);
    document.getElementById("calendar-month-year").innerHTML = month_name[month]+this.selected + year;
    document.getElementById("cal-table1").appendChild(calendar);
};

this.get_calendar = function(day_no, days){
    var table = document.createElement('table');
    table.setAttribute('class','calendar-table');
    var tr = document.createElement('tr');
    tr.setAttribute('class','calendar-tr');

    //Row For The Day Letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.setAttribute('class','calendar-td');
        td.innerHTML = "SMTWTFS"[c];
        td.setAttribute("id", "day-letter");
        td.setAttribute("class", "day-letter");
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //Create 2nd row
    tr = document.createElement('tr');
    tr.setAttribute('class','calendar-tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.setAttribute('class','calendar-td');
        td.setAttribute('class','empty');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    

    //Start Counting Days
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        td.setAttribute('class','calendar-td');
        td.innerHTML = count;
        td.setAttribute("id", "day"+count);
        count++;
        td.setAttribute('onclick', "selectDate(event)");
        tr.appendChild(td);
        if (td.innerHTML === today.toString()) {
            td.style.color = 'white';
            td.style.fontSize = '16pt';
            td.style.fontWeight = "600";
            td.style.borderColor = '#5F7584';
            td.style.backgroundColor = "#5F7584";
        }
    }
    table.appendChild(tr);
    
    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        tr.setAttribute('class','calendar-tr');
        for(var c=0; c<=6; c++){

            //If Last Day Is In  Last Position
            if (count === days && c === 6) {
                var td = document.createElement('td');
                td.setAttribute('class','calendar-td');
                td.innerHTML = count;
                td.setAttribute("id", "day"+count);
                count++;
                td.setAttribute('onclick', "selectDate(event)");
                tr.appendChild(td);
                table.appendChild(tr);

                //Change Style of Today's Date
                if (td.innerHTML === today.toString()) {
                    td.setAttribute("id", "day_today");
                    td.setAttribute('onclick', "selectDate(event)");
                    td.style.color = 'white';
                    td.style.fontSize = '16pt';
                    td.style.fontWeight = "600";
                    td.style.borderColor = '#5F7584';
                    td.style.backgroundColor = "#5F7584";
                }
                return table;
            }


            //Fill Extra Cells With Blank
            if (count > days) {
                var tde = document.createElement("td");
                tde.setAttribute('class', 'empty');
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
            td.setAttribute('class','calendar-td');
            td.innerHTML = count;
            td.setAttribute("id", "day"+count);
            count++;
            td.setAttribute('onclick', "selectDate(event)");
            tr.appendChild(td);
            }

            //Change Style of Today's Date
            if (td.innerHTML === today.toString()) {
                td.setAttribute("id", "day_today");
                td.setAttribute('onclick', "selectDate(event)");
                td.style.color = 'white';
                td.style.fontSize = '16pt';
                td.style.fontWeight = "600";
                td.style.borderColor = '#5F7584';
                td.style.backgroundColor = "#5F7584";
            }
        }
        table.appendChild(tr);
    }
    return table;

};

this.loadCal();

this.showCal = function() {
    document.getElementById('downarrow4').style.display = 'none';
    document.getElementById('cal-table1').style.display = 'block';
    document.getElementById('uparrow4').style.display = 'block';
    document.getElementById('uparrow4').style.margin = '0 auto';
    document.getElementById('cal-arrow-left').style.display = 'block';
    document.getElementById('cal-arrow-right').style.display = 'block';
    document.getElementById('calendar-month-year').style.paddingTop = '5px';
    document.getElementById('calendar-container').style.paddingBottom = '5%';

};

this.hideCal = function() {
    document.getElementById('downarrow4').style.display = 'block';
    document.getElementById('cal-table1').style.display = 'none';
    document.getElementById('uparrow4').style.display = 'none';
    document.getElementById('cal-arrow-left').style.display = 'none';
    document.getElementById('cal-arrow-right').style.display = 'none';
    document.getElementById('calendar-month-year').style.paddingTop = '0';
    document.getElementById('calendar-container').style.paddingBottom = '0';

};

});