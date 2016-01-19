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
    addStaticTimes(index) +
    '</div>'
  );
}
