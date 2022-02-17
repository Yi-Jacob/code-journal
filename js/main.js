/* global data */
/* exported data */

localStorage.clear();
var $photoUrl = document.querySelector('.photo-url');
var $image = document.querySelector('img');
var $entryForm = document.querySelector('.form');
var $view = document.querySelectorAll('.view');
var $entriesLink = document.querySelector('.entry-link');
var $newLink = document.querySelector('.new-link');
var $noEntry = document.querySelector('.no-entries');
var $list = document.querySelector('ul');
var $title = document.querySelector('.title-input');
var $notes = document.querySelector('.notes-input');
var $header = document.querySelector('.entries-header');

$photoUrl.addEventListener('input', handleInput);
$entryForm.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleLoad);
$entriesLink.addEventListener('click', viewData);
$newLink.addEventListener('click', viewData);
$list.addEventListener('click', editEntry);

function handleLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var render = renderJournal(data.entries[i]);
    $list.appendChild(render);
  }
  if (data.entries.length === 0) {
    $noEntry.className = '';
  } else {
    $noEntry.className = 'hidden';
  }
  swapView(data.view);
}

function handleInput(event) {
  $image.src = event.target.value;
}

function handleSubmit(event) {
  event.preventDefault();
  var listItem = document.querySelectorAll('li');
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
    data.editing = null;
  } else {
    for (var i = 0; i < listItem.length; i++) {
      if (parseInt(listItem[i].getAttribute('data-entry-id')) === data.editing.entryId) {
        var updateObj = {
          title: $entryForm.elements.title.value,
          photoURL: $entryForm.elements.photourl.value,
          notes: $entryForm.elements.notes.value,
          entryId: data.editing.entryId
        };
        listItem[i].replaceWith(renderJournal(updateObj));
      }
    }
  }
  swapView('entries');
  $image.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
}

function renderJournal(entry) {
  var listElement = document.createElement('li');
  listElement.setAttribute('data-entry-id', entry.entryId);

  var initialDiv = document.createElement('div');
  listElement.appendChild(initialDiv);
  initialDiv.className = 'row';

  var imgColumn = document.createElement('div');
  initialDiv.appendChild(imgColumn);
  imgColumn.className = 'column-half';

  var newImg = document.createElement('img');
  imgColumn.appendChild(newImg);
  newImg.className = 'margin-bottom';
  newImg.src = entry.photoURL;

  var textColumn = document.createElement('div');
  initialDiv.appendChild(textColumn);
  textColumn.className = 'column-half';

  var divTitle = document.createElement('div');
  textColumn.appendChild(divTitle);
  divTitle.className = 'row alignment';

  var hTwo = document.createElement('h2');
  hTwo.textContent = entry.title;
  divTitle.appendChild(hTwo);

  var editPen = document.createElement('i');
  divTitle.appendChild(editPen);
  editPen.className = 'fas fa-pen pen';
  editPen.setAttribute('data-view', 'entry-form');
  editPen.setAttribute('data-entry-id', entry.entryId);

  var divNotes = document.createElement('div');
  textColumn.appendChild(divNotes);
  divNotes.className = 'row';

  var notes = document.createElement('p');
  notes.textContent = entry.notes;
  divNotes.appendChild(notes);
  notes.className = 'margin-bottom';

  return listElement;
}

function swapView(string) {
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
function viewData(event) {
  var $dataView = event.target.getAttribute('data-view');
  if (event.target.nodeName === 'A' && $dataView !== '') {
    swapView($dataView);
  }
  $header.textContent = 'New Entry';
  data.editing = null;
  $image.src = 'images/placeholder-image-square.jpg';
  $entryForm.reset();
}

function editEntry(event) {
  var $dataView = event.target.getAttribute('data-view');
  $header.textContent = 'Edit Entry';

  if (event.target.nodeName === 'I' && $dataView !== '') {
    swapView($dataView);
    var targetId = event.target.getAttribute('data-entry-id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(targetId)) {
        data.editing = data.entries[i];
        var currentView = $view[i].dataset.view;
        data.view = currentView;
      }
    }
    $title.value = data.editing.title;
    $photoUrl.value = data.editing.photoURL;
    $notes.value = data.editing.notes;
    $image.src = data.editing.photoURL;
  }
}
