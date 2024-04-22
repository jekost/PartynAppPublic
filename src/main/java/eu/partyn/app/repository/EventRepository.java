package eu.partyn.app.repository;

import eu.partyn.app.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


/**
 * Repository for CRUD operations on Event entities with custom finder methods.
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    public List<Event> findByDateTime(LocalDateTime dateTime);

    public List<Event> findByTicketPrice(Integer ticketPrice);

    public List<Event> findByTopPick(Boolean topPick);

    List<Event> findByNameIgnoreCase(String name);

    // TODO filtering by organizer
    //public List<Event> findByOrganizer();
}
