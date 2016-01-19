$(document).ready(function(){
  fetchAllDays(0);
  var showWeek = 0;
  $('.change-week').on('click', function() {
    showWeek = showWeek + $(this).data('id');
    fetchAllDays(showWeek);
  });
  resetTimeslots();
  $('.add-timeslot').on('click', function() {
    addTimeslot();
  });
  $('.modal').delegate('.remove-timeslot', 'click', function(){
    removeTimeslot(this);
  });
  $('.close-modal').on('click', function() {
    resetTimeslots();
  });
  $('.submit-schedule').on('click', function() {
    createSchedule();
  });
});

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday"
];

function dateString (day) {
  var dd = day.getDate();
  if(dd<10) {
      dd='0'+dd;
  }
  var month = monthNames[day.getMonth()];
  var year = day.getFullYear();
  return month + ' ' + dd + ', ' + year;
}

function fetchAllDays(showWeek){
  $('.day-card').each(function (index, card) {
    // fetchData(card);
    buildCard(index, card, showWeek);
  });
}

function buildCard (index, card, showWeek) {
  var offset = index - 1 + 7 * showWeek;
  var day = new Date();
  day.setDate(day.getDate() + offset);
  var weekDay = weekDayNames[day.getDay()];
  $(card).html(
    '<div class="card card-content"><span class="center"><strong>' +
    weekDay +
    '</strong></span><br><span class="center">' +
    dateString(day) +
    '</span><hr>' +
    addTimes(index) +
    '</div>'
  );
}

function addTimeslot () {
  $('.timeslots').append(timeslotTemplate);
}

function removeTimeslot (element) {
  $(element).parent().parent().remove();
}

function resetTimeslots () {
  $('.timeslots').html(timeslotTemplate);
}

function createSchedule () {
  var title = $('.schedule-title').val();
  var startDate = $('.start-date').val();
  var endDate = $('.end-date').val();
  var errorsDiv = $( ".schedule-errors" );
  $.ajax({
    type: 'POST',
    url:  '/api/v1/schedules',
    data: {schedule: {title: title, start_date: startDate, end_date: endDate}},
    error: function(response) {
      errorsDiv.html('');
      $('#myModal').scrollTop(0);
      var errors = JSON.parse(response.responseText).errors;
      for(var key in errors) {
        errorsDiv.append('<li class="text-danger">' + key + " " + errors[key] + '</li>');
      }
    },
    success: function(response){
      createTimeslots(response.id, errorsDiv);
    }
  });
}

function createTimeslots (scheduleId, errorsDiv) {
  errorsDiv.html('');
  $('.timeslot').each(function (index, slot) {
    var date = $(slot).find('.timeslot-date').val();
    var startHour = $(slot).find('.start-hour1').val();
    var startMinute = $(slot).find('.start-minute1').val();
    var startAmPm = $(slot).find('.start-am-pm1').val();
    var endHour = $(slot).find('.end-hour1').val();
    var endMinute = $(slot).find('.end-minute1').val();
    var endAmPm = $(slot).find('.end-am-pm1').val();
    var localStartTime = new Date(date + "T" + startHour + ":" + startMinute + ":00");
    var localEndTime = new Date(date + "T" + endHour + ":" + endMinute + ":00");
    var startUTC = moment.utc(localStartTime).format();
    var endUTC = moment.utc(localEndTime).format();
    $.ajax({
      type: 'POST',
      url:  '/api/v1/timeslots',
      data: {timeslot: {date: date,
                        start_time: startUTC,
                        end_time: endUTC,
                        schedule_id: scheduleId}},
      error: function(response) {
        $('#myModal').scrollTop(0);
        var errors = JSON.parse(response.responseText).errors;
        for(var key in errors) {
          errorsDiv.append('<li class="text-danger">Timeslot ' +
                           (index + 1) +
                           ": " +
                           key +
                           " " +
                           errors[key] +
                           '</li>');
        }
        $.ajax({
          type: 'DELETE',
          url:  '/api/v1/schedules/' + scheduleId,
          data: {}
        });
      },
      success: function(response){
        errorsDiv.html('');
        $('.schedule-title').val('');
        $('.start-date').val('');
        $('.end-date').val('');
        resetTimeslots();
      }
    });
  });
}

var timeslotTemplate = '<div class="timeslot"><hr></hr>' +
  '<div class="col-md-12">' +
    '<button type="button" class="close remove-timeslot">&times;</button>' +
    '<h4>Date:</h4>' +
    '<input type="date" class="timeslot-date">' +
  '</div>' +
  '<div class="col-md-6">' +
    '<h4>Start Time</h4>' +
  '</div>' +
  '<div class="col-md-6">' +
    '<h4>End Time</h4>' +
  '</div>' +
  '<div class="col-md-2 form-group">' +
    '<label for="hour">Hour:</label>' +
    '<select class="form-control start-hour1">' +
      '<option>01</option>' +
      '<option>02</option>' +
      '<option>03</option>' +
      '<option>04</option>' +
      '<option>05</option>' +
      '<option>06</option>' +
      '<option>07</option>' +
      '<option>08</option>' +
      '<option>09</option>' +
      '<option>10</option>' +
      '<option>11</option>' +
      '<option>12</option>' +
    '</select>' +
  '</div>' +
  '<div class="col-md-2 form-group">' +
    '<label for="minute">Minute:</label>' +
    '<select class="form-control start-minute1">' +
      '<option>00</option>' +
      '<option>15</option>' +
      '<option>30</option>' +
      '<option>45</option>' +
    '</select>' +
  '</div>' +
  '<div class="col-md-2 form-group">' +
    '<label for="am-pm">AM/PM:</label>' +
    '<select class="form-control start-am-pm1">' +
      '<option>AM</option>' +
      '<option>PM</option>' +
    '</select>' +
  '</div>' +
  '<div class="col-md-2 form-group">' +
    '<label for="sel1">Hour:</label>' +
    '<select class="form-control end-hour1">' +
      '<option>01</option>' +
      '<option>02</option>' +
      '<option>03</option>' +
      '<option>04</option>' +
      '<option>05</option>' +
      '<option>06</option>' +
      '<option>07</option>' +
      '<option>08</option>' +
      '<option>09</option>' +
      '<option>10</option>' +
      '<option>11</option>' +
      '<option>12</option>' +
    '</select>' +
  '</div>' +
  '<div class="col-md-2 form-group">' +
    '<label for="sel1">Minute:</label>' +
    '<select class="form-control end-minute1">' +
      '<option>00</option>' +
      '<option>15</option>' +
      '<option>30</option>' +
      '<option>45</option>' +
    '</select>' +
  '</div>' +
  '<div class="col-md-2 form-group">' +
    '<label for="sel1">AM/PM:</label>' +
    '<select class="form-control end-am-pm1">' +
      '<option>AM</option>' +
      '<option>PM</option>' +
    '</select>' +
  '</div>' +
'</div>';

function addTimes (index) {
  return '<table class="table table-striped text-left" data-id="' +
  index +
  '"><tr><td class="AM12">12:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM1">1:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM2">2:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM3">3:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM4">4:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM5">5:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM6">6:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM7">7:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM8">8:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM9">9:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM10">10:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="AM11">11:00AM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM12">12:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM1">1:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM2">2:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM3">3:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM4">4:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM5">5:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM6">6:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM7">7:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM8">8:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM9">9:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM10">10:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '<tr><td class="PM11">11:00PM</td></tr><tr><td>:15</td></tr><tr><td>:30</td></tr><tr><td>:45</td></tr>' +
  '</table>';
}
