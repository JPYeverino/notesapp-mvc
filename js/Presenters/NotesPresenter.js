define(['Communication/Events', 'Views/NotesView'], function (Events, NotesView) {



    function init() {
        Events.on('renderInit', renderNotes);
        Events.on('renderSearch', renderSearch);
        Events.on('newNoteClick', newNote);
        Events.on('saveNoteView', saveNote);
        Events.on('removeNoteView', removeNote);
        Events.on('getRemoveData', removeNoteUndo);
        Events.on('searchNotesView', searchNote);
        Events.on('reorder', reorder);
        //02. Get the undo button instruction.
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
        Events.emit('removeNoteDataUndo',data);
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
    //03. Send undo signal
    function undoFn () {
        console.info("3rd step completed");
        Events.emit('undoReq');
    }

    function removeNoteUndo (data) {
        console.log("Presenter got instruction remove note");
        Events.emit("removeFromUndo",data);
    }

    return {
        init: init
    }
});