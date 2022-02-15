/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
var $photo = document.querySelector('.photo');

$photoUrl.addEventListener('input', getURL);

function getURL(event) {
  $photo.setAttribute('src', event.target.value);
}
