package eu.partyn.app.repository;

import eu.partyn.app.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    public List<Event> findByDateTime(LocalDateTime dateTime);

    public List<Event> findByTicketPrice(Integer ticketPrice);

    public List<Event> findByTopPick(Boolean topPick);

    // TODO filtering by organizer
    //public List<Event> findByOrganizer();
}
