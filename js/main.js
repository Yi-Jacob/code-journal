/* global data */
/* exported data */
localStorage.clear();
var $photoUrl = document.querySelector('.photo-url');
var $image = document.querySelector('.image');
var $entryForm = document.querySelector('.form');
var $view = document.querySelectorAll('.view');
var $entryLink = document.querySelector('.entry-link');
var $newLink = document.querySelector('.new-link');
var $noEntry = document.querySelector('.no-entries');

$photoUrl.addEventListener('input', handleInput);
$entryForm.addEventListener('submit', handleSubmit);
$newLink.addEventListener('click', dataView);
$entryLink.addEventListener('click', dataView);
window.addEventListener('DOMContentLoaded', handleLoad);

var list = document.querySelector('ul');

function handleLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var render = renderJournal(data.entries[i]);
    list.appendChild(render);
    viewSwap(data.view);
  } if (data.entries.length === 0) {
    $noEntry.className = '';
  } else {
    $noEntry.className = 'hidden';
  }
}

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
  list.prepend(renderJournal(newObj));
  viewSwap('entries');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

function renderJournal(entry) {
  var $initialRow = document.createElement('div');
  $initialRow.className = 'row';

  var $imageColumn = document.createElement('div');
  $initialRow.appendChild($imageColumn);
  $imageColumn.setAttribute('class', 'column-half');

  var $entryImage = document.createElement('img');
  $imageColumn.appendChild($entryImage);
  $entryImage.setAttribute('src', entry.photoURL);
  $entryImage.setAttribute('class', 'margin-bottom');

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
      $view[i].className = 'view';
      var currentView = $view[i].dataset.view;
      data.view = currentView;
    } else {
      $view[i].className = 'view hidden';
    }
  }
  if (data.view === 'entry-form') {
    $noEntry.className = 'hidden';
  } else if (data.entries.length === 0 && data.view === 'entries') {
    $noEntry.className = '';
  }
}

function dataView(event) {
  var $dataView = event.target.getAttribute('data-view');
  if (event.target.nodeName === 'A' && $dataView !== '') {
    viewSwap($dataView);
  }
}
