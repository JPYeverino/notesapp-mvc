define(['Communication/Events'], function (Events) {

    var notesData;
    var JSONreadyNotes;
    if(localStorage.notes) {
        notesData = JSON.parse(localStorage.getItem('notes'));
    } else { notesData = []; }

    function init() {
        if (localStorage.notes) {
            JSONreadyNotes = JSON.parse(localStorage.getItem('notes'));
            if (JSONreadyNotes.length > 0) {
                Events.emit('renderInit', JSONreadyNotes);
            }
        }

        Events.on('createNoteReq', newNote);
        Events.on('saveNoteReq', saveNote);
        Events.on('removeNoteReq', removeNote);
        Events.on('searchNoteReq', searchNote);
    }

    function newNote(data) {

        var noteData = {};

        noteData.id = data.id;
        noteData.content = "";
        noteData.creationDate = data.creationDate;
        noteData.modifyDate = "";

        if (localStorage.getItem('notes') != null) {

            notesData = JSON.parse(localStorage.getItem('notes'));
            notesData.push(noteData);
            JSONreadyNotes = JSON.stringify(notesData);
            localStorage.setItem("notes", JSONreadyNotes);
            Events.emit('renderNew', noteData);
        } else {
            notesData = [];
            notesData.push(noteData);
            JSONreadyNotes = JSON.stringify(notesData);
            localStorage.setItem("notes", JSONreadyNotes);
            Events.emit('renderNew', noteData);
        }
        
    }

    var findNote = function (id) {
        for (var i = 0; i < notesData.length; i++) {
            if (notesData[i].id.toString() === id.toString()) {
                return i;
            }
        }
        return -1;
    };

    function saveNote(data) {
        var index = findNote(data.id);
        if (index >= 0) {
            notesData = JSON.parse(localStorage.getItem('notes'));
            notesData[index].content = data.content;
            notesData[index].modifyDate = data.modifyDate;
            JSONreadyNotes = JSON.stringify(notesData);
            localStorage.setItem("notes", JSONreadyNotes);
        } else console.log("not found");
    }

    function removeNote(data) {
        index = findNote(data);
        if (index >= 0) {
            notesData.splice(index, 1);
            JSONreadyNotes = JSON.stringify(notesData);
            localStorage.setItem("notes", JSONreadyNotes);
        } else console.log("not found to remove");
    }

    function searchNote(data) {
        notesData = JSON.parse(localStorage.getItem('notes'))
                    .filter(function(note){
                        var regex = new RegExp(data, 'gi');
                        return note.content.match(regex);
                    });
        Events.emit('renderSearch', notesData);
        

    }

    

    return {
        newNote: newNote,
        init: init
    };
});