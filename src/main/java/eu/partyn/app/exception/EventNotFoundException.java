package eu.partyn.app.exception;

public class EventNotFoundException extends RuntimeException{
    public EventNotFoundException(Integer id){
        super("Event not found for id: " + id);
    }

}
