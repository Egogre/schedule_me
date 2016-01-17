$(document).ready(function(){
  fetchAllDays(0);
  var showWeek = 0;
  $('.change-week').on('click', function() {
    showWeek = showWeek + $(this).data('id');
    fetchAllDays(showWeek);
  });
  // showRecentSyncs()
  // showTableSyncs()
  // toggleCards()
  // refreshCards()
  // $('.client-modal2').hide();
  // setInterval(fetchAllSyncs, 10000);
  // setInterval(showRecentSyncs, 10000);
  // setInterval(showTableSyncs, 10000);
  // $('.modal-trigger').leanModal({
  //     dismissible: true,
  //   }
  // );
});

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday"
];

var today = new Date();
var dd = today.getDate();
if(dd<10) {
    dd='0'+dd;
}
var month = monthNames[today.getMonth()];
var year = today.getFullYear();
var weekDay = weekDayNames[today.getDay()];

function dateString (index, showWeek) {
  var offset = index - 1;
  var dd = today.getDate() + offset;
  if(dd<10) {
      dd='0'+dd;
  }
  return month + ' ' + (dd + showWeek * 7) + ', ' + year;
}

function fetchAllDays(showWeek){
  $('.day-card').each(function (index, card) {
    // fetchData(card);
    buildCard(index, card, showWeek);
  });
}

function buildCard (index, card, showWeek) {
  $(card).html(
    '<div class="card card-content"><span class="center"><strong>' +
    weekDayNames[(today.getDay() + index - 1) % 7] +
    '</strong></span><br><span class="center">' +
    dateString(index, showWeek) +
    '</span><hr>' +
    addTimes(index) +
    '</div>'
  );
}

function addTimes (index) {
  return '<table class="table text-left" data-id="' +
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
