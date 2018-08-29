define(function () {

    function render(parameters) {
        var appTemplate = document.querySelector("#templNotes").content;
        var appStage = document.querySelector("#notesBoard");

        var notesDb = parameters;

        if (notesDb.length > 0) {
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

    return {render: render};
});