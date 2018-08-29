require(['Models/Note', 'Controllers/NotesController'], function(Note, NotesController) {

    var notes = [
        new Note({
            id: '01',
            content: 'contentTest',
            creatDate: 'createDateTest',
            modifDate: 'modifDateTest'
        }),
        new Note({
            id: '01',
            content: 'contentTest2',
            creatDate: 'createDateTest2',
            modifDate: 'modifDateTest2'
        })];

    console.dir(notes);

    localStorage.notes = JSON.stringify(notes);

    NotesController.start();


});