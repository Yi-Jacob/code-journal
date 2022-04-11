/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('entry-list');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

function handleUnload(e) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('entry-list', entriesJSON);
}

window.addEventListener('beforeunload', handleUnload);
