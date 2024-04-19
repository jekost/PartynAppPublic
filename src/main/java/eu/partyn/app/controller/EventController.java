package eu.partyn.app.controller;

import eu.partyn.app.dto.EventDto;
import eu.partyn.app.mapper.EventMapper;
import eu.partyn.app.model.Event;
import eu.partyn.app.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/events")
@AllArgsConstructor
public class EventController {
    private final EventService eventService;
    private final EventMapper eventMapper;

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents(){
        List<Event> events = eventService.getAllEvents();
        List<EventDto> eventDtos = events.stream()
                .map(eventMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(eventDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getSpecificEvent(@PathVariable Integer id){
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping
    public ResponseEntity<EventDto> postEvent(@RequestBody EventDto eventDto){
        Event event = eventMapper.toEntity(eventDto);
        event = eventService.postEvent(event);
        return ResponseEntity.ok(eventMapper.toDto(event));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id){
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }




}
