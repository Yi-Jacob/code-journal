/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
var $image = document.querySelector('.image');
var $entryForm = document.querySelector('.form');

$photoUrl.addEventListener('input', handleInput);
$entryForm.addEventListener('submit', handleSubmit);

function handleInput(event) {
  $image.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var newObj = {
    title: $entryForm.elements.title.value,
    photoURL: $entryForm.elements.photourl.value,
    notes: $entryForm.elements.notes.value
  };
  newObj.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newObj);

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

/*
function renderJournal(event) {
  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');

  var imageColumn = document.createElement('div');
  imageColumn.setAttribute('class', 'column-half');
  divRow.appendChild(imageColumn);

  var image = document.createElement('img');
  image.setAttribute('src', data.entries[i].photoURL);
  imageColumn.appendChild(image);

  var headingColumn = document.createElement('div');
  headingColumn.setAttribute('class', 'column-half');
  image.appendChild(headingColumn);

  var hThree = document.createElement('h3');
  hThree.textContent = data.entries[i].title;
  headingColumn.appendChild(hThree);

  var notes = document.createElement('p');
  notes.textContent = data.entries[i].notes;
  headingColumn.appendChild(notes);

  return divRow;
}
*/

function renderJournal(event) {
  var $initialRow = document.createElement('div');
  $initialRow.className = 'row';

  var $imageColumn = document.createElement('div');
  $initialRow.appendChild($imageColumn);
  $imageColumn.setAttribute('class', 'column-half');

  var $entryImage = document.createElement('img');
  $imageColumn.appendChild($entryImage);
  $entryImage.setAttribute('src', data.entries[i].photoURL);

  var $textColumn = document.createElement('div');
  $initialRow.appendChild($textColumn);
  $textColumn.setAttribute('class', 'column-half');

  var $rowTitle = document.createElement('div');
  $textColumn.appendChild($rowTitle);
  $rowTitle.setAttribute('class', 'row');

  var $title = document.createElement('h2');
  var $titleText = document.createTextNode(data.entries[i].title);
  $title.appendChild($titleText);
  $rowTitle.appendChild($title);

  var $rowText = document.createElement('div');
  $textColumn.appendChild($rowText);
  $rowText.setAttribute('class', 'row');

  var $notes = document.createElement('p');
  var $notesText = document.createTextNode(data.entries[i].notes);
  $notes.appendChild($notesText);
  $rowText.appendChild($notes);

  return $initialRow;
}

window.addEventListener('DOMContentLoaded', renderJournal);

var list = document.querySelector('ul');

for (var i = 0; i < data.length; i++) {
  var journal = renderJournal(data.entries[i]);
  list.appendChild(journal);
}
