define(['Communication/Events'], function (Events) {

    var button = document.getElementById("controls");
    var appTemplate = document.querySelector("#templNotes").content;
    var appStage = document.querySelector("#notesBoard");

    function init() {
        Events.on('render', render);
        Events.on('createNoteReq', addNote);

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
                clone.querySelector(".createD").textContent = "Created: " + notesDb[i].creatDate;
                clone.querySelector(".modifyD").textContent = "Modified: " + notesDb[i].modifDate;
                appStage.appendChild(clone);
            }
        }
    }

    function addNote(data) {

        var clone = appTemplate.cloneNode(true);
        clone.querySelector(".note").id = data.id;
        clone.querySelector(".createD").textContent = "Created: " + data.creationDate;
        clone.querySelector(".modifyD").textContent = "Modified: "
        appStage.appendChild(clone);
    }

    button.addEventListener('click', function () {
        var date = new Date();
        var id = date.getTime();
        var creationDate = new Date(id).toUTCString();
        var info = {
            id: id,
            creationDate: creationDate
        };
        Events.emit('newNoteClick', info);

    });

    // function inputListening(e) {
    //     var actualNoteId = e.target.parentNode.id;
    //     var actualNoteContent = e.target.textContent;

    //     var save;

    //     if (save) {
    //         clearTimeout(save);
    //         console.log("cancel save");
    //         save = setTimeout(function () {
    //             var date = new Date();
    //             var d = date.getTime();
    //             var modifyDate = new Date(d).toUTCString();
    //             Events.emit(actualNoteId, actualNoteContent, modifyDate);
    //             e.target.parentNode.querySelector(".modifyD").textContent =
    //                 "Modified: " + modifyDate;
    //         }, 1000);
    //     } else {
    //         save = setTimeout(function () {
    //             var date = new Date();
    //             var modifyDate = date.getTime();
    //             board.saveNote(actualNoteId, actualNoteContent, modifyDate);
    //             e.target.parentNode.querySelector(".modifyD").textContent =
    //                 "Saved: " + modifyDate;
    //         }, 1000);
    //     }
    // }
    // //Add the event listener for each input on the note content using event delegation.
    // boardDiv.addEventListener("input", inputListening);

    return {
        init: init,
        render: render,
        addNote: addNote
    };
});