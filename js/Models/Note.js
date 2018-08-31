define(['Communication/Events'], function(Events) {

    var notesContainer;
    var JSONreadyNotes;

    function init() {
        
        if(localStorage.notes) {
            JSONreadyNotes = JSON.parse(localStorage.notes);
            if(JSONreadyNotes.length > 0) {
                Events.emit('renderInit', JSONreadyNotes);
            } 
        }

        Events.on('createNoteReq', newNote);
    }
    
    function newNote(data) {
        
        var noteData = {};

        noteData.id = data.id;
        noteData.content = "";
        noteData.creatDate = data.creationDate;
        noteData.modifDate = "";
    
        notesContainer = JSON.parse(localStorage.getItem('notes'));
        notesContainer.push(noteData);
        JSONreadyNotes = JSON.stringify(notesContainer);
        localStorage.setItem("notes", JSONreadyNotes);
        Events.emit('renderNew', noteData);
    }

    function notesSuscribe() {

    }

    function saveNote() {

    }

    function removeNote() {

    }

    function getNote() {

    }
    
    return {
        newNote: newNote,
        init: init
    };
});