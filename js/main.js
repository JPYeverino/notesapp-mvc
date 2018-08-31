require(['Models/Note', 'Presenters/NotesPresenter','Views/NotesView'], function(Note, NotesPresenter, NotesView) {

   
    Note.init();
    NotesView.init();
    NotesPresenter.init();
    
    
    
});