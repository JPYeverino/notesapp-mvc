require(['Models/Note', 'Controllers/NotesController'], function(Note, NotesController) {

    var notes = [new Note({
        id: '01',
        content: 'contentTest',
        creatDate: 'createDateTest',
        modifDate: 'modifDateTest'
    })];

    console.dir(notes);

    localStorage.notes = JSON.stringify(notes);

    NotesController.start();


});