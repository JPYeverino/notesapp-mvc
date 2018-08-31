define(['Communication/Events', 'Views/NotesView'], function (Events, NotesView) {



    function init() {
        console.log("Presenter init");
        Events.on('renderInit', renderNotes);
        Events.on('newNoteClick', newNote);
        Events.on('saveNoteView', saveNote);
        Events.on('removeNoteView', removeNote);
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






    return {
        init: init
    }
});