$(document).ready(function(){
  fetchScheduleTimeslotData();
});

function fetchScheduleTimeslotData () {
  $('.schedule-timeslot').each(function (index, element) {
    $.ajax({
      type: 'GET',
      url:  '/api/v1/timeslots/' + $(element).data('id'),
      success: function(scheduleData){
        placeTimes(element, scheduleData);
      }
    });
  });
}

function placeTimes (timeslotDiv, scheduleData) {
  var startDateString = moment(scheduleData.start_time).local().format();
  var endDateString = moment(scheduleData.end_time).local().format();
  $(timeslotDiv).html('<h1>' +
  startDateString +
  ' - ' +
  endDateString +
  '</h1>');
}
