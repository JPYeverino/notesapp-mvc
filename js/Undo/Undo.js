define(['Communication/Events'], function (Events) {

    var commandList = [];
    var currentCommand = -1;



    function init() {
        Events.on('createNoteReq', commandNewNote);
        Events.on('undoReq', executeUndo);
        // Events.on('saveNoteReq', commandSaveNote);
        // Events.on('removeNoteReq', commandRemoveNote);
        // Events.on('reorderReq', commandReorderData);
    }

    function commandNewNote(data) {
        currentCommand++;
        commandList[currentCommand] = {
            action: 'createNote',
            undo: 'removeNoteViewUndo',
            id: data.id
        };
        if(commandList[currentCommand + 1]) {
            commandList.splice(currentCommand + 1);
        }
        console.dir(commandList);
    }

    function executeUndo() {
        if (commandList[currentCommand]) {
            console.dir(commandList[currentCommand]);
            Events.emit(commandList[currentCommand].undo, commandList[currentCommand].id);
            currentCommand--;
        } else {
            console.dir('not undo availabe');
        }
    }



    return {
        init: init
    };
});