/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var oldData = localStorage.getItem('code-journal');

window.addEventListener('beforeunload', storeData);
function storeData(event) {
  var dataJSON = JSON.stringify(data.entries);
  localStorage.setItem('code-journal', dataJSON);
}

if (oldData !== null) {
  data.entries = JSON.parse(oldData);
}
