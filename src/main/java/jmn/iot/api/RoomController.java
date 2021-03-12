package jmn.iot.api;

import jmn.iot.model.Device;
import jmn.iot.model.Room;
import jmn.iot.model.Sensor;
import jmn.iot.repository.DeviceRepository;
import jmn.iot.repository.RoomRepository;
import jmn.iot.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/rooms")
public class RoomController {

    private final RoomRepository roomRepository;

    private final DeviceRepository deviceRepository;

    private final SensorRepository sensorRepository;

    @Autowired
    public RoomController(RoomRepository roomRepository, DeviceRepository deviceRepository, SensorRepository sensorRepository) {
        this.roomRepository = roomRepository;
        this.deviceRepository = deviceRepository;
        this.sensorRepository = sensorRepository;
    }

    @GetMapping
    public ResponseEntity<List<Room>> getRooms() {
        return ResponseEntity.ok((List<Room>) roomRepository.findAll());
    }

    @GetMapping(value = "/{roomId}/devices")
    public ResponseEntity<List<Device>> getRoomDevices(@PathVariable String roomId) {
        return ResponseEntity.ok(deviceRepository.findByRoomId(roomId));
    }

    @GetMapping(value = "/{roomId}/sensors")
    public ResponseEntity<List<Sensor>> getRoomSensors(@PathVariable String roomId) {
        return ResponseEntity.ok(sensorRepository.findByRoomId(roomId));
    }
}
