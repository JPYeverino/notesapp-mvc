define(['Communication/Events'], function (Events) {

    var appTemplate = document.querySelector("#templNotes").content;
    var appStage = document.querySelector("#notesBoard");

    Events.on('start', render);


    function render(parameters) {

        var notesDb = parameters;       

        if ((notesDb ? notesDb.length:0) > 0) {
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
});