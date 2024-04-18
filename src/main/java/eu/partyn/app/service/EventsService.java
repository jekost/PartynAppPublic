package eu.partyn.app.service;

import eu.partyn.app.model.Event;
import eu.partyn.app.repository.EventsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@AllArgsConstructor
@Service
public class EventsService {
    private final EventsRepository eventsRepository;



    // List all the events available
    public List<Event> findAll(){
        return eventsRepository.findAll();
    }


}
