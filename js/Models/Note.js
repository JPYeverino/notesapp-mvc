define(['Communication/Events'], function(Events) {

    function Note(args) {
        
        this.id = args.id;
        this.content = args.content;
        this.creatDate = args.creatDate;
        this.modifDate = args.modifDate;
    }
    
    return Note;
});