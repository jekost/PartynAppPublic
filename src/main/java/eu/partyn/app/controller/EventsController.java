package eu.partyn.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/events")
public class EventsController {

    @GetMapping
    public String getAllEvents(){
        return "List of events";
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
