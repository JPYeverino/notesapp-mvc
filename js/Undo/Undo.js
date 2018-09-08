define(['Communication/Events'], function (Events) {

    var commandList = [];
    var currentCommand = -1;



    function init() {
        Events.on('setCommandNewNote', commandNewNote);
        Events.on('setCommandRemoveNote', commandRemoveNote);
        Events.on('setCommandReorderNote', commandReorderNote);
        Events.on('setCommandSaveNote', commandSaveNote);
        Events.on('undoReq', executeUndo);
    }

    function commandNewNote(data) {
        currentCommand++;
        commandList[currentCommand] = {
            action: 'newNote',
            undo: 'removeNoteView',
            noteData: {
                id: data.id,
                content: data.content,
                creationDate: data.creationDate,
                modifyDate: data.modifyDate
            }

        };
        if (commandList[currentCommand + 1]) {
            commandList.splice(currentCommand + 1);
        }
    }

    function commandRemoveNote(data) {
        currentCommand++;
        commandList[currentCommand] = {
            action: 'removeNote',
            undo: 'newNoteClick',
            noteData: {
                id: data.arr.id,
                content: data.arr.content,
                creationDate: data.arr.creationDate,
                modifyDate: data.arr.modifyDate,
                index: data.index
            }
        };
        if (commandList[currentCommand + 1]) {
            commandList.splice(currentCommand + 1);
        }
    }

    function commandReorderNote(data) {
        currentCommand++;
        commandList[currentCommand] = {
            action: 'reorderData',
            undo: 'reorder',
            noteData: {
                new: data.index.old,
                old: data.index.new,
                status: 'on'
            }
        };
        console.dir(commandList[currentCommand]);
        if (commandList[currentCommand + 1]) {
            commandList.splice(currentCommand + 1);
        }
    }
    
    function commandSaveNote(data) {
        currentCommand++;
        commandList[currentCommand] = {
            action: 'saveNote',
            undo: 'saveNoteView',
            noteData: {
                index: data.index,
                id: data.data.id,
                content: data.data.content,
                modifyDate: data.data.modifyDate
            }
        };

        if (commandList[currentCommand + 1]) {
            commandList.splice(currentCommand + 1);
        }
    }

    function executeUndo() {
        if (commandList[currentCommand]) {
            Events.emit(commandList[currentCommand].undo, commandList[currentCommand].noteData);
            currentCommand--;
        } else {
            console.dir('not undo available ' + currentCommand);
        }
    }

    return {
        init: init
    };
});