/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
var $image = document.querySelector('.image');
var $entryForm = document.querySelector('.form');
var $view = document.querySelector('.view');
var $entryLink = document.querySelector('.entry-link');
var $newLink = document.querySelector('.new-link');
var $noEntry = document.querySelector('.no-entries');

window.addEventListener('DOMContentLoaded', renderEntry);
$entryForm.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleLoad);
$entryLink.addEventListener('click', viewSwap);
$newLink.addEventListener('click', viewSwap);
$noEntry.addEventListener('click', dataView);

var $ul = document.querySelector('ul');

function handleLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var render = renderEntry(data.entries[i]);
    $ul.appendChild(render);
  }
  if (data.entries.length === 0) {
    $noEntry.className = '';
  } else {
    $noEntry.className = 'hidden';
  }
}

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
  $ul.prepend(renderEntry(newObj));
  viewSwap('entry-form');

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  if (data.entries.length === 0) {
    $noEntry.className = '';
  } else {
    $noEntry.className = 'hidden';
  }
}

function renderEntry(entry) {
  var $initialRow = document.createElement('div');
  $initialRow.className = 'row';

  var $imageColumn = document.createElement('div');
  $initialRow.appendChild($imageColumn);
  $imageColumn.setAttribute('class', 'column-half');

  var $entryImage = document.createElement('img');
  $imageColumn.appendChild($entryImage);
  $entryImage.setAttribute('src', entry.imageURL);

  var $textColumn = document.createElement('div');
  $initialRow.appendChild($textColumn);
  $textColumn.setAttribute('class', 'column-half');

  var $rowTitle = document.createElement('div');
  $textColumn.appendChild($rowTitle);
  $rowTitle.setAttribute('class', 'row');

  var $title = document.createElement('h2');
  var $titleText = document.createTextNode(entry.title);
  $title.appendChild($titleText);
  $rowTitle.appendChild($title);

  var $rowText = document.createElement('div');
  $textColumn.appendChild($rowText);
  $rowText.setAttribute('class', 'row');

  var $notes = document.createElement('p');
  var $notesText = document.createTextNode(entry.notes);
  $notes.appendChild($notesText);
  $rowText.appendChild($notes);
  $notes.setAttribute('class', 'margin-bottom');

  return $initialRow;
}

function viewSwap(string) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].dataset.view === string) {
      $view[i].className = 'view hidden';
    } else {
      $view[i].className = 'view';
    }
  }
}

function dataView(event) {
  var $dataView = event.target.getAttribute('data-view');
  if (event.target.nodeName === 'A' && $dataView !== '') {
    viewSwap($dataView);
  }
}
