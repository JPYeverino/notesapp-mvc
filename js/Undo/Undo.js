define(['Communication/Events'], function (Events) {

    var commandList = [];
    var currentCommand = -1;



    function init() {
        Events.on('setCommandNewNote', commandNewNote);
        Events.on('setCommandRemoveNote', commandRemoveNote);
        Events.on('undoReq', executeUndo);
        // Events.on('saveNoteReq', commandSaveNote);
        // Events.on('removeNoteReq', commandRemoveNote);
        // Events.on('reorderReq', commandReorderData);
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
        console.log('commandRemoveNote')
        console.log(currentCommand);
        console.dir(commandList);

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