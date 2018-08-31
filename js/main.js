require(['Models/Note', 'Presenters/NotesPresenter','Views/NotesView'], function(Note, NotesPresenter, NotesView) {

    NotesView.init();
    NotesPresenter.init();
    Note.init();
});