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
      scheduleCreationErrors(errorsDiv, response);
    },
    success: function(response){
      createTimeslots(response.id, errorsDiv);
    }
  });
}

function scheduleCreationErrors (errorsDiv, response) {
  errorsDiv.html('');
  $('#myModal').scrollTop(0);
  var errors = JSON.parse(response.responseText).errors;
  for(var key in errors) {
    errorsDiv.append('<li class="text-danger">' + key + " " + errors[key] + '</li>');
  }
}
