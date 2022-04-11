/* global data */
/* exported data */

var $photoInput = document.getElementById('photo-input');
var $image = document.querySelector('img');
var $createForm = document.querySelector('#create-form');
var $view = document.querySelectorAll('.view');
var $entriesLink = document.querySelector('#entries-link');
var $newLink = document.querySelector('#new-link');
var $noEntry = document.querySelector('#no-entry');
var $ul = document.querySelector('ul');
var $titleInput = document.getElementById('title-input');
var $notesInput = document.getElementById('notes-input');
var $headerText = document.getElementById('header-text');
var $delete = document.getElementById('delete-entry');
var $modal = document.querySelector('.modal-overlay');
var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');

$photoInput.addEventListener('input', handleInput);
$createForm.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleLoad);
$entriesLink.addEventListener('click', dataView);
$newLink.addEventListener('click', dataView);
$ul.addEventListener('click', editEntry);
$delete.addEventListener('click', handleDelete);
$cancel.addEventListener('click', handleCancel);
$confirm.addEventListener('click', handleConfirmData);

function handleConfirmData(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1);
    }
  }
  var $liList = document.querySelectorAll('li');
  for (i = 0; i < $liList.length; i++) {
    if (parseInt($liList[i].getAttribute('data-entry-id')) === data.editing.entryId) {
      $liList[i].remove();
      viewSwap('entries');
      $modal.className = 'modal-overlay hidden';
    }
  }
}

function handleCancel(event) {
  $modal.className = 'modal-overlay hidden';
}

function handleDelete(event) {
  $modal.className = 'modal-overlay';
}

function editEntry(event) {
  var $dataView = event.target.getAttribute('data-view');
  $headerText.textContent = 'Edit Entry';

  if (event.target.nodeName === 'I' && $dataView !== '') {
    viewSwap($dataView);

    var targetEntryId = event.target.getAttribute('data-entry-id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(targetEntryId)) {
        data.editing = data.entries[i];
        var currentView = $view[i].dataset.view;
        data.view = currentView;
      }
    }
    $titleInput.value = data.editing.title;
    $photoInput.value = data.editing.imageURL;
    $notesInput.value = data.editing.notes;
    $image.src = data.editing.imageURL;
  }
  $delete.className = 'delete-button';
}

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
  viewSwap(data.view);
}

function handleInput(event) {
  $image.src = event.target.value;
}

function handleSubmit(event) {
  event.preventDefault();
  var $liList = document.querySelectorAll('li');
  if (data.editing === null) {
    var newObj = {
      title: $createForm.elements.title.value,
      imageURL: $createForm.elements.photourl.value,
      notes: $createForm.elements.notes.value
    };
    newObj.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newObj);
    $ul.prepend(renderEntry(newObj));
    data.editing = null;
  } else {
    for (var i = 0; i < $liList.length; i++) {
      if (parseInt($liList[i].getAttribute('data-entry-id')) === data.editing.entryId) {
        var updateObj = {
          title: $createForm.elements.title.value,
          imageURL: $createForm.elements.photourl.value,
          notes: $createForm.elements.notes.value,
          entryId: data.editing.entryId
        };
        $liList[i].replaceWith(renderEntry(updateObj));
      }
    }
  }
  viewSwap('entries');
  $image.src = 'images/placeholder-image-square.jpg';
  $createForm.reset();
  $delete.className = 'delete-button invisible';
}

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

  var $initialRow = document.createElement('div');
  $li.appendChild($initialRow);
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
  $rowTitle.className = 'row justify-between';

  var $title = document.createElement('h2');
  var $titleText = document.createTextNode(entry.title);
  $title.appendChild($titleText);
  $rowTitle.appendChild($title);

  var $edit = document.createElement('i');
  $rowTitle.appendChild($edit);
  $edit.setAttribute('class', 'fas fa-pen edit-icon');
  $edit.setAttribute('data-view', 'entry-form');
  $edit.setAttribute('data-entry-id', entry.entryId);

  var $rowText = document.createElement('div');
  $textColumn.appendChild($rowText);
  $rowText.setAttribute('class', 'row');

  var $notes = document.createElement('p');
  var $notesText = document.createTextNode(entry.notes);
  $notes.appendChild($notesText);
  $rowText.appendChild($notes);
  $notes.setAttribute('class', 'margin-bottom');
  return $li;
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
  $headerText.textContent = 'New Entry';
  data.editing = null;
  $image.src = 'images/placeholder-image-square.jpg';
  $createForm.reset();
  $delete.className = 'delete-button invisible';
}
