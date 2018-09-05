define(['Communication/Events', 'Views/NotesView'], function (Events, NotesView) {



    function init() {
        Events.on('renderInit', renderNotes);
        Events.on('renderSearch', renderSearch);
        Events.on('newNoteClick', newNote);
        Events.on('saveNoteView', saveNote);
        Events.on('removeNoteView', removeNote);
        Events.on('searchNotesView', searchNote);
        Events.on('reorder', reorder);
    }

    function renderNotes(data) {
        Events.emit('render', data);
    }

    function newNote(data) {
        Events.emit('createNoteReq', data);
    }

    function saveNote(data) {
        Events.emit('saveNoteReq', data);
    }

    function removeNote(data) {
        Events.emit('removeNoteReq', data);
    }

    function searchNote(data) {
        Events.emit('searchNoteReq', data);
    }

    function renderSearch (data) {
        Events.emit('renderResults', data);
    }

    function reorder (data) {
        Events.emit('reorderReq', data);
    }






    return {
        init: init
    }
});