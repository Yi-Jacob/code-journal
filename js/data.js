/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('entry-list');

if (previousData !== null) {
  data = JSON.parse(previousData);
}

function handleUnload(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('entry-list', entriesJSON);
}

window.addEventListener('beforeunload', handleUnload);
