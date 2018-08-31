define(['Communication/Events'], function (Events) {

    var button = document.getElementById("controls");
    var appTemplate = document.querySelector("#templNotes").content;
    var appStage = document.querySelector("#notesBoard");
    var save;

    function init() {
        Events.on('render', render);
        Events.on('createNoteReq', addNote);
        console.log("View init");

    }

    function render(parameters) {
        console.dir(parameters)
        var notesDb = parameters;
        var count = 0;

        if ((notesDb ? notesDb.length : 0) > 0) {
            for (var i = 0; i < notesDb.length; i++) {
                var clone = appTemplate.cloneNode(true);
                clone.querySelector(".note").id = notesDb[i].id;
                clone.querySelector(".input1").textContent = notesDb[i].content;
                clone.querySelector(".createD").textContent = "Created: " + notesDb[i].creationDate;
                clone.querySelector(".modifyD").textContent = "Modified: " + notesDb[i].modifyDate;
                appStage.appendChild(clone);
            }
        }
    }

    button.addEventListener('click', newNotefn);

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

    function addNote(data) {

        var clone = appTemplate.cloneNode(true);
        clone.querySelector(".note").id = data.id;
        clone.querySelector(".createD").textContent = "Created: " + data.creationDate;
        clone.querySelector(".modifyD").textContent = "Modified: "
        appStage.appendChild(clone);
    }

    function inputListening(e) {
        var actualNoteId = e.target.parentNode.id;
        var actualNoteContent = e.target.textContent;

        if(!save) {
            save = setTimeout(function () {
                console.log(save);
                var date = new Date();
                var modifyDate = date.getTime();
                var info = {
                    id: actualNoteId,
                    content: actualNoteContent,
                    modifyDate: modifyDate
                }
                Events.emit('saveNoteView', info);
                e.target.parentNode.querySelector(".modifyD").textContent =
                    "Saved: " + modifyDate;
            }, 1000);
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
            }, 1000);

        }
    }
    //Add the event listener for each input on the note content using event delegation.
    appStage.addEventListener("input", inputListening);

    //Callback function for the "remove button" note from the DOM and from the DB
    function closeNoteBtn(e) {
        var actualNoteId = e.target.parentNode.id;
        //Ensures that the element being clicked is the closing button.
        if (e.target.className != "closebtn") {
            return;
        } else {
            Events.emit('removeNoteView', actualNoteId);
            appStage.removeChild(e.target.parentNode);
        }
    }

    //Add the envent listener for the closing button using event delegation.
    appStage.addEventListener("click", closeNoteBtn);

    return {
        init: init,
        render: render,
        addNote: addNote
    };

});