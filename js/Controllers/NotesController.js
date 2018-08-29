define(['Views/NotesView', 'Communication/Events'], function (NotesView, Events) {

    function start() {
        var notes;
        if (localStorage.notes) {
            notes = JSON.parse(localStorage.notes);
            console.log("testing");
            Events.emit('start',notes);
        } Events.emit('start', []);
        
    }

    return {
        start: start
    }
});