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

function resetTimeslots () {
  $('.timeslots').html(timeslotTemplate);
}
