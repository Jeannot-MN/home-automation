package jmn.iot.repository;

import jmn.iot.model.SensorReading;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorReadingRepository extends CrudRepository<SensorReading, Long> {

    Page<SensorReading> findBySensorId(Pageable pageRequest, Long sensorId);

    List<SensorReading> findAll();
}
