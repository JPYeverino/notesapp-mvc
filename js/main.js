require(['Models/Note', 'Presenters/NotesPresenter','Views/NotesView', 'Undo/Undo'], function(Note, NotesPresenter, NotesView, Undo) {

    NotesView.init();
    NotesPresenter.init();
    Note.init();
    Undo.init();
});