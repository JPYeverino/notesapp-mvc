define(['Communication/Events', 'Views/NotesView'], function (Events, NotesView) {



    function init() {
        Events.on('update', renderNotes);
        Events.on('newNoteClick', newNote);
        Events.on('saveNoteView', saveNote);
        Events.on('removeNoteView', removeNote);
        Events.on('searchNotesView', searchNote);
        Events.on('reorder', reorder);
        Events.on('commandNewNote', commandNewNote); // Get info from newNote to send command pattern
        Events.on('commandRemoveNote', commandRemoveNote); // Get info from removeNote to send command pattern
        Events.on('commandReorderData', commandReorderNote); // Get info from dragAndDrop
        Events.on('commandSaveNote', commandSaveNote); // Get info from Save
        Events.on('undo', undoFn);
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
    
    function reorder (data) {
        Events.emit('reorderReq', data);
    }

    function commandNewNote (data) {
        Events.emit('setCommandNewNote', data);
    }

    function undoFn () {
        Events.emit('undoReq');
    }

    function commandRemoveNote (data) {
        Events.emit('setCommandRemoveNote', data);
    }
    function commandReorderNote (data) {
        Events.emit('setCommandReorderNote', data);
    }
    
    function commandSaveNote (data) {
        Events.emit('setCommandSaveNote', data);
    }

    return {
        init: init
    }
});