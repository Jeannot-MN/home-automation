package jmn.iot.api;

import jmn.iot.model.Device;
import jmn.iot.repository.DeviceRepository;
import jmn.iot.service.MQTTService;
import jmn.iot.service.MessageTopicBuilder;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/devices")
public class DeviceController {

    private final DeviceRepository deviceRepository;
    private final MQTTService mqttService;
    private final MessageTopicBuilder messageTopicBuilder;

    @Autowired
    public DeviceController(DeviceRepository deviceRepository, MQTTService mqttService, MessageTopicBuilder messageTopicBuilder) {
        this.deviceRepository = deviceRepository;
        this.mqttService = mqttService;
        this.messageTopicBuilder = messageTopicBuilder;
    }

    @GetMapping
    public ResponseEntity<List<Device>> getDevices() {
        return ResponseEntity.ok((List<Device>) deviceRepository.findAll());
    }

    @PostMapping(value = "/{deviceId}/toggle")
    public ResponseEntity<List<Device>> toggleDevice(@PathVariable(name = "deviceId") Long deviceId) throws MqttException {

        Device device = deviceRepository.findById(deviceId).orElseThrow(() -> new RuntimeException(
                String.format("No device with ID <%s> was found", deviceId)));

        mqttService.publish(messageTopicBuilder.build(device), String.format("Toggle %s in %s", device.getName()
                , device.getRoomId()), 0, false);

        device.setState(device.getState() == 0 ? 1 : 0);

        System.out.println(messageTopicBuilder.build(device));
        deviceRepository.save(device);

        return ResponseEntity.ok(deviceRepository.findByRoomId(device.getRoomId()));
    }
}
