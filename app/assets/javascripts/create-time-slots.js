function createTimeslots (scheduleId, errorsDiv) {
  errorsDiv.html('');
  $('.timeslot').each(function (index, slot) {
    var date = $(slot).find('.timeslot-date').val();
    var startUTC = connectDateTimes(date, slot, "start");
    var endUTC = connectDateTimes(date, slot, "end");
    $.ajax({
      type: 'POST',
      url:  '/api/v1/timeslots',
      data: {timeslot: {date: date,
                        start_time: startUTC,
                        end_time: endUTC,
                        schedule_id: scheduleId}},
      error: function(response) {
        timeslotCreationErrors(errorsDiv, response);
        rollbackScheduleCreation(scheduleId);
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

function timeslotCreationErrors (errorsDiv, response) {
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
}

function rollbackScheduleCreation () {
  $.ajax({
    type: 'DELETE',
    url:  '/api/v1/schedules/' + scheduleId,
    data: {}
  });
}

function connectDateTimes(date, slot, startOrEnd) {
  var Hour = $(slot).find('.' + startOrEnd + '-hour1').val();
  var Minute = $(slot).find('.' + startOrEnd + '-minute1').val();
  var AmPm = $(slot).find('.' + startOrEnd + '-am-pm1').val();
  if (AmPm === "PM") {
    Hour = parseInt(Hour) + 12;
  }
  return new Date(date + "T" + Hour + ":" + Minute + ":00");
}
