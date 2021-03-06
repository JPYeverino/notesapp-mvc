define(['Communication/Events'], function (Events) {

    var notesData;
    var JSONreadyNotes;
    if (localStorage.notes) {
        notesData = JSON.parse(localStorage.getItem('notes'));
    } else { notesData = []; }

    function init() {
        if (localStorage.notes) {
            JSONreadyNotes = JSON.parse(localStorage.getItem('notes'));
            if (JSONreadyNotes.length > 0) {
                Events.emit('update', JSONreadyNotes);
            }
        }

        Events.on('createNoteReq', newNote);
        Events.on('saveNoteReq', saveNote);
        Events.on('removeNoteReq', removeNote);
        Events.on('searchNoteReq', searchNote);
        Events.on('reorderReq', reorderData);
    }

    function newNote(data) {
        var noteData = {};

        noteData.id = data.id;
        noteData.content = data.content || "";
        noteData.creationDate = data.creationDate;
        noteData.modifyDate = data.modifyDate || "";

        if (localStorage.getItem('notes') != null) {

            notesData = JSON.parse(localStorage.getItem('notes'));
            if (!data.hasOwnProperty('index')) {
                notesData.push(noteData);
            } else {
                notesData.splice(data.index, 0, noteData);
            }
            JSONreadyNotes = JSON.stringify(notesData);
            localStorage.setItem("notes", JSONreadyNotes);
            Events.emit('update', notesData);
            if (!data.hasOwnProperty('index')) {
                Events.emit('commandNewNote', noteData);
            }

        } else {
            notesData = [];
            notesData.push(noteData);
            JSONreadyNotes = JSON.stringify(notesData);
            localStorage.setItem("notes", JSONreadyNotes);
            Events.emit('update', notesData);
            if (!data.index) {
                Events.emit('commandNewNote', noteData);
            }
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
        var index = data.index ? data.index : findNote(data.id);
        if (index >= 0) {
            if (!data.index) {
                var info = {
                    index: index,
                    data: notesData[index]
                };
                Events.emit("commandSaveNote", info);
            }
            notesData = JSON.parse(localStorage.getItem('notes'));
            notesData[index].content = data.content;
            notesData[index].modifyDate = data.modifyDate;
            JSONreadyNotes = JSON.stringify(notesData);
            localStorage.setItem("notes", JSONreadyNotes);
            Events.emit('update', notesData);
        } else console.log("not found");
    }

    function removeNote(data) {
        index = data.id ? findNote(data.id) : findNote(data);
        if (index >= 0) {
            if (!data.id) {
                Events.emit('commandRemoveNote', { arr: notesData[index], index: index });
                notesData.splice(index, 1);
                JSONreadyNotes = JSON.stringify(notesData);
                localStorage.setItem("notes", JSONreadyNotes);
                Events.emit('update', notesData);
            } else {
                notesData.splice(index, 1);
                JSONreadyNotes = JSON.stringify(notesData);
                localStorage.setItem("notes", JSONreadyNotes);
                Events.emit('update', notesData);
            }
        } else console.log("not found to remove");
    }
    function searchNote(data) {
        var notesResults = JSON.parse(localStorage.getItem('notes'))
            .filter(function (note) {
                var regex = new RegExp(data, 'gi');
                return note.content.match(regex);
            });

        Events.emit('update', notesResults);
    }

    function reorderData(data) {
        var oldIndex = data.status ? data.old : findNote(data.old);
        var newIndex = data.status ? data.new : findNote(data.new);

        if (!data.hasOwnProperty('status')) {
            var info = {
                new: newIndex,
                old: oldIndex
            }
            Events.emit('commandReorderData', { index: info, status: '' });
        }

        notesData.splice(oldIndex, 0, notesData.splice(newIndex, 1)[0]);
        JSONreadyNotes = JSON.stringify(notesData);
        localStorage.setItem("notes", JSONreadyNotes);

        Events.emit('update', notesData);
    }

    return {
        newNote: newNote,
        init: init
    };
});