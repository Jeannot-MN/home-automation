package jmn.iot.repository;

import jmn.iot.model.Sensor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorRepository extends CrudRepository<Sensor, Long> {

    List<Sensor> findByRoomId(String roomId);

    Sensor findByName(String name);
}
