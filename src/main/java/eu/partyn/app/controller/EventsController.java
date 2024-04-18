package eu.partyn.app.controller;

import eu.partyn.app.dto.EventDto;
import eu.partyn.app.mapper.EventMapper;
import eu.partyn.app.model.Event;
import eu.partyn.app.service.EventsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/events")
@AllArgsConstructor
public class EventsController {
    private final EventsService eventsService;
    private final EventMapper eventMapper;

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents(){
        List<Event> events = eventsService.findAll();
        List<EventDto> eventDtos = events.stream()
                .map(eventMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(eventDtos);
    }

    @GetMapping("/{id}")
    public String getSpecificEvent(){
        return "A specific event object";
    }

    @PostMapping
    public String postEvent(){
        return "posted event";
    }




}
