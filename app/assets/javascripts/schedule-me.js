$(document).ready(function(){
  loadScheduleData();
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
    if (startAmPm === "PM") {
      startHour = parseInt(startHour) + 12;
    }
    var endHour = $(slot).find('.end-hour1').val();
    var endMinute = $(slot).find('.end-minute1').val();
    var endAmPm = $(slot).find('.end-am-pm1').val();
    if (endAmPm === "PM") {
      endHour = parseInt(endHour) + 12;
    }
    var startUTC = new Date(date + "T" + startHour + ":" + startMinute + ":00");
    var endUTC = new Date(date + "T" + endHour + ":" + endMinute + ":00");
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
