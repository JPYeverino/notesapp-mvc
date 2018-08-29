define(['Views/NotesView'], function (NotesView) {

    function start() {
        var notes;
        if (localStorage.notes) {
            notes = JSON.parse(localStorage.notes);
            console.log("testing");
            NotesView.render(notes);
        } NotesView.render([]);
        
    }

    return {
        start: start
    }
});