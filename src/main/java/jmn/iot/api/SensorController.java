package jmn.iot.api;

import jmn.iot.model.Sensor;
import jmn.iot.model.SensorReading;
import jmn.iot.repository.SensorReadingRepository;
import jmn.iot.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = "/api/sensors")
public class SensorController {

    private final SensorRepository sensorRepository;

    private final SensorReadingRepository sensorReadingRepository;

    @Autowired
    public SensorController(SensorRepository sensorRepository, SensorReadingRepository sensorReadingRepository) {
        this.sensorRepository = sensorRepository;
        this.sensorReadingRepository = sensorReadingRepository;
    }

    @GetMapping
    public ResponseEntity<List<Sensor>> getSensors() {

        return ResponseEntity.ok((List<Sensor>) sensorRepository.findAll());
    }


    @GetMapping(value = "/{sensorId}/readings")
    public ResponseEntity<List<SensorReading>> getReadings(@PathVariable Long sensorId, @Param("limit") Integer limit) {

        List<SensorReading> dataUnmodifiable = sensorReadingRepository.findBySensorId(PageRequest.of(0, limit, Sort.by("date").descending()), sensorId).getContent();
        List<SensorReading> data = new ArrayList<>(dataUnmodifiable);
        //NOTE: Reverse to get the latest data at the end of the list (to avoid chart reversal)
        Collections.reverse(data);
        return ResponseEntity.ok(data);
    }
}
