define(['Communication/Events'], function (Events) {

    var newBtn = document.getElementById("newNote");
    var undoBtn = document.getElementById("undo");
    var appTemplate = document.querySelector("#templNotes").content;
    var appStage = document.querySelector("#notesBoard");
    var save;
    var searchVal = document.querySelector("#search");

    function init() {
        Events.on('render', render);
        Events.on('addNoteView', render);
        Events.on('renderResults', render);
        Events.on('removeFromUndo', removeFromUndo);



    }

    function render(parameters) {
        var notesDb = parameters;

        while (appStage.firstChild) {
            appStage.removeChild(appStage.firstChild);
        }
        
        if ((notesDb ? notesDb.length : 0) > 0) {
            for (var i = 0; i < notesDb.length; i++) {
                var clone = appTemplate.cloneNode(true);
                clone.querySelector(".invisible").id = notesDb[i].id;
                clone.querySelector(".input1").textContent = notesDb[i].content;
                clone.querySelector(".createD").textContent = "Created: " + notesDb[i].creationDate;
                clone.querySelector(".modifyD").textContent = "Modified: " + notesDb[i].modifyDate;
                appStage.appendChild(clone);
            }
        }
    }

    newBtn.addEventListener('click', newNotefn);

    function newNotefn() {

        var date = new Date();
        var id = date.getTime();
        var creationDate = new Date(id).toUTCString();
        var info = {
            id: id,
            creationDate: creationDate
        };
        Events.emit('newNoteClick', info);

    }

    undoBtn.addEventListener('click', undoFn);

    function undoFn() {
        Events.emit('undo');
    }

    function inputListening(e) {
        var actualNoteId = e.target.parentNode.parentNode.id;
        var actualNoteContent = e.target.textContent;

        if (!save) {
            save = setTimeout(function () {
                var date = new Date();
                var modifyDate = date.getTime();
                var info = {
                    id: actualNoteId,
                    content: actualNoteContent,
                    modifyDate: modifyDate
                }
                Events.emit('saveNoteView', info);
            }, 500);
        } else {
            clearTimeout(save);
            save = setTimeout(function () {
                var date = new Date();
                var d = date.getTime();
                var modifyDate = new Date(d).toUTCString();
                var info = {
                    id: actualNoteId,
                    content: actualNoteContent,
                    modifyDate: modifyDate
                }
                Events.emit('saveNoteView', info);
                e.target.parentNode.querySelector(".modifyD").textContent =
                    "Modified: " + modifyDate;
            }, 500);

        }
    }
    //Add the event listener for each input on the note content using event delegation.
    appStage.addEventListener("input", inputListening);

    //Callback function for the "remove newBtn" note from the DOM and from the DB
    function closeNoteBtn(e) {
        var actualNoteId = e.target.parentNode.parentNode.id;
        //Ensures that the element being clicked is the closing newBtn.
        if (e.target.className != "closebtn") {
            return;
        } else {
            Events.emit('removeNoteView', actualNoteId);
        }
    }
    
    function removeFromUndo (data) {
        Events.emit('removeNoteView', data);
    }

    //Add the envent listener for the closing newBtn using event delegation.
    appStage.addEventListener("click", closeNoteBtn);

    //Callback function for the search input.
    function searchNotes(e) {
        Events.emit('searchNotesView', e.target.value);
    }

    //Add the event listener for the search input.
    searchVal.addEventListener("input", searchNotes);

    var dragSrcEl = null;

    function dragStart(e) {

        dragSrcEl = e.target.parentNode.id;
    }

    appStage.addEventListener('dragstart', dragStart);

    //Function to the drag note event listener.
    function dragOver(e) {
        e.preventDefault();
        var actualNoteId;

        if (e.target.id === "" && e.target.parentNode.id == "") {
            actualNoteId = e.target.parentNode.parentNode.id;
        } else if (e.target.id === "" && e.target.parentNode.parentNode.id === "notesBoard") {
            actualNoteId = e.target.parentNode.id;
        } else if (e.target.parentNode.id === "notesBoard" && e.target.parentNode.parentNode.id === "wrapper") {
            actualNoteId = e.target.id
        } else return;
    }

    appStage.addEventListener("dragover", dragOver);

    function dragEnter(e) {
        e.preventDefault();
        var actualNoteId;

        if (e.target.id === "" && e.target.parentNode.id == "") {
            actualNoteId = e.target.parentNode.parentNode.id;
        } else if (e.target.id === "" && e.target.parentNode.parentNode.id === "notesBoard") {
            actualNoteId = e.target.parentNode.id;
        } else if (e.target.parentNode.id === "notesBoard" && e.target.parentNode.parentNode.id === "wrapper") {
            actualNoteId = e.target.id
        } else return;
    }

    appStage.addEventListener("dragenter", dragEnter);

    function dropNote(e) {
        e.preventDefault();
        var actualNoteId;

        if (e.target.id === "" && e.target.parentNode.id == "") {
            actualNoteId = e.target.parentNode.parentNode.id;
        } else if (e.target.id === "" && e.target.parentNode.parentNode.id === "notesBoard") {
            actualNoteId = e.target.parentNode.id;
        } else if (e.target.parentNode.id === "notesBoard" && e.target.parentNode.parentNode.id === "wrapper") {
            actualNoteId = e.target.id
        } else return;

        if(actualNoteId != dragSrcEl) {
            var info = {
                old: actualNoteId,
                new: dragSrcEl
            };
            Events.emit('reorder', info);
        } 
        
    }

    appStage.addEventListener("drop", dropNote);


    return {
        init: init,
    };

});