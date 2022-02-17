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
var $list = document.querySelector('ul');
var $title = document.querySelector('.title-input');
var $notes = document.querySelector('.notes-input');
var $header = document.querySelector('.entries-header');

$photoUrl.addEventListener('input', handleInput);
$entryForm.addEventListener('submit', handleSubmit);
$newLink.addEventListener('click', viewData);
$entryLink.addEventListener('click', viewData);
$list.addEventListener('click', editEntry);
window.addEventListener('DOMContentLoaded', handleLoad);

function handleLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var render = renderJournal(data.entries[i]);
    $list.appendChild(render);
  } if (data.entries.length !== 0) {
    $noEntry.className = 'hidden';
  } else {
    $noEntry.className = '';
  }
  swapView(data.view);
}

function handleInput(event) {
  $image.src = event.target.value;
}

function handleSubmit(event) {
  event.preventDefault();
  var listElement = document.querySelectorAll('li');
  if (data.editing === null) {
    var newObj = {
      title: $entryForm.elements.title.value,
      photoURL: $entryForm.elements.photourl.value,
      notes: $entryForm.elements.notes.value
    };
    newObj.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObj);
    $list.prepend(renderJournal(newObj));
  } else {
    for (var i = 0; i < listElement.length; i++) {
      var objUpdate = {
        title: $entryForm.elements.title.value,
        imageURL: $entryForm.elements.photourl.value,
        notes: $entryForm.elements.notes.value,
        entryId: data.editing.entryId
      };
      listElement.replaceWith(renderJournal(objUpdate));
    }
  }
  swapView('entries');
  $image.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
}

function renderJournal(entry) {
  var listItem = document.createElement('li');
  listItem.setAttribute('data-entry-id', entry.entryId);

  var $initialDiv = document.createElement('div');
  listItem.appendChild($initialDiv);
  $initialDiv.className = 'row';

  var imgColumn = document.createElement('div');
  $initialDiv.appendChild(imgColumn);
  imgColumn.className = 'column-half';

  var newImg = document.createElement('img');
  imgColumn.appendChild(newImg);
  newImg.src = entry.photoURL;
  newImg.className = 'margin-bottom';

  var textColumn = document.createElement('div');
  $initialDiv.appendChild(textColumn);
  textColumn.className = 'column-half';

  var titleDiv = document.createElement('div');
  textColumn.appendChild(titleDiv);
  titleDiv.className = 'row alignment';

  var hTwo = document.createElement('h2');
  hTwo.textContent = entry.title;
  titleDiv.appendChild(hTwo);

  var editPen = document.createElement('i');
  editPen.className = 'fas fa-pen pen';
  titleDiv.appendChild(editPen);
  editPen.setAttribute('data-view', 'entries');
  editPen.setAttribute('data-entry-id', entry.entryId);

  var notesDiv = document.createElement('div');
  textColumn.appendChild(notesDiv);
  notesDiv.className = 'row';

  var notes = document.createElement('p');
  notes.textContent = entry.notes;
  notesDiv.appendChild(notes);
  notes.className = 'margin-bottom';

  return listItem;
}

function swapView(string) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].dataset.view === string) {
      var currentView = $view[i].dataset.view;
      $view[i].className = 'view';
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
  $header.textContent = 'New Entry';
  data.editing = null;
  $image.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
}

function viewData(event) {
  var $dataView = event.target.getAttribute('data-view');
  if (event.target.nodeName === 'A' && $dataView !== '') {
    swapView($dataView);
  }
}

function editEntry(event) {
  var $dataView = event.target.getAttribute('data-view');
  $header.textContent = 'Edit Entry';

  if (event.target.nodeName === 'I' && $dataView !== '') {
    swapView($dataView);
  }

  var targetEntryId = event.target.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(targetEntryId)) {
      data.editing = data.entries[i];
      var currentView = $view[i].dataset.view;
      data.view = currentView;
    }
  }
  $title.value = data.editing.title;
  $image.value = data.editing.imageURL;
  $notes.value = data.editing.notes;
  $image.src = data.editing.imageURL;
}
