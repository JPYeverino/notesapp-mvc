define(['Communication/Events', 'Views/NotesView'], function (Events, NotesView) {



    function init() {
        Events.on('renderInit', renderNotes);
        Events.on('renderNew', addNoteView);
        Events.on('renderSearch', renderSearch);
        Events.on('newNoteClick', newNote);
        Events.on('saveNoteView', saveNote);
        Events.on('removeNoteView', removeNote);
        Events.on('searchNotesView', searchNote);
        Events.on('reorder', reorder);
        Events.on('commandNewNote', commandNewNote); // Get info from newNote to send command pattern
        Events.on('commandRemoveNote', commandRemoveNote); // Get info from removeNote to send command pattern
        Events.on('undo', undoFn);
        Events.on('undoNewNote', undoNewNote);

        
    }

    function renderNotes(data) {
        Events.emit('render', data);
    }

    function newNote(data) {
        Events.emit('createNoteReq', data);
    }

    function addNoteView(data){
        Events.emit('addNoteView', data);
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

    function commandNewNote (data) {
        Events.emit('setCommandNewNote', data);
    }

    function undoFn () {
        Events.emit('undoReq');
    }

    function undoNewNote (data) {
        Events.emit("removeNoteReq",data.id);
    }

    function commandRemoveNote (data) {
        Events.emit('setCommandRemoveNote', data);
    }

    return {
        init: init
    }
});