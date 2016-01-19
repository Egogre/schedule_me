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

function removeTimeslot (element) {
  $(element).parent().parent().remove();
}
