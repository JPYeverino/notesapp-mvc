define(['Communication/Events','Views/NotesView'], function (Events, NotesView) {

    

    function init() {
        Events.on('renderInit', renderNotes);
        Events.on('newNoteClick', newNote);
    }

    function renderNotes (data) {
        Events.emit('render', data);
    }

    function newNote(data) {
        Events.emit('createNoteReq', data);
    }






    return {
        init: init
    }
});