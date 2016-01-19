var scheduleData;

function loadScheduleData () {
  $.ajax({
    type: 'GET',
    url:  '/api/v1/schedules',
    success: function(data){
      scheduleData = data;
      addSchedules();
    }
  });
}

function addSchedules () {
  for (i = 0; i < scheduleData.length; i++) {$('.schedule-list').append(
    '<h1>' + scheduleData[i].title + '</h1>' +
    '<a href="/scheduling/' + scheduleData[i].id +'">Link</a>' +
    '<div class="schedule' +
    scheduleData[i].id +
    '"></div>');
  }
}
