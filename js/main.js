/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
$photoUrl.addEventListener('input', getURL);

var $form = document.querySelector('form');
$form.addEventListener('submit', formData);

var $inputs = document.querySelector('form').elements;
var $photo = document.querySelector('.photo');

function getURL(event) {
  $photo.setAttribute('src', event.target.value);
}

function formData(event) {
  event.preventDefault();
  var obj = {};
  for (var i = 0; i < $inputs.length; i++) {
    obj[$inputs[i].name] = $inputs[i].value;
  }
  obj.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(obj);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
