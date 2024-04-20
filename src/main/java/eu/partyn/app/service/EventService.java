package eu.partyn.app.service;

import eu.partyn.app.exception.EventNotFoundException;
import eu.partyn.app.model.Event;
import eu.partyn.app.repository.EventRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class EventService {
    private final EventRepository eventRepository;



    // Gets all the events that have been posted
    public List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

    // Gets an event by a specific ID
    public Optional<Event> getEventById(Integer id){
        return eventRepository.findById(id);
    }


    // Posts an event
    @Transactional
    public Event postEvent(Event event){
        return eventRepository.save(event);
    }

    // Deletes an event by a specific ID
    @Transactional
    public void deleteEvent(Integer id){
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
        eventRepository.delete(event);
    }

    @Transactional
    public Event updateEvent(Event event) {
        Event existingEvent = eventRepository.findById(event.getId())
                .orElseThrow(() -> new EventNotFoundException(event.getId()));


        existingEvent.setName((event.getName()));
        existingEvent.setDescription(event.getDescription());
        existingEvent.setDateTime(event.getDateTime());
        existingEvent.setTicketPrice(event.getTicketPrice());
        existingEvent.setTopPick(event.getTopPick());

        return eventRepository.save(event);


    }


}
