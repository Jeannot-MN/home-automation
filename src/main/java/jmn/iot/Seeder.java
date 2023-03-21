package jmn.iot;

import jmn.iot.model.Device;
import jmn.iot.model.Room;
import jmn.iot.model.Sensor;
import jmn.iot.model.SensorReading;
import jmn.iot.repository.RoomRepository;
import jmn.iot.repository.SensorReadingRepository;
import jmn.iot.service.MQTTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Component
public class Seeder implements CommandLineRunner {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private SensorReadingRepository sensorReadingRepository;

    @Autowired
    private MQTTService mqttService;

    @Override
    public void run(String... args) throws Exception {

        Random rand = new Random();

        if (((List<Room>) roomRepository.findAll()).isEmpty()) {
            Room livingRoom = new Room();
            livingRoom.setPrimaryId("living-room");
            livingRoom.setName("Living Room");
            livingRoom.setIcon("couch");

            Set<Device> livingRoomDevices = new HashSet<Device>();
            livingRoomDevices.add(new Device("Light", 0));
            livingRoomDevices.add(new Device("Fan", 0));

            Set<Sensor> livingRoomSensors = new HashSet<>();
            livingRoomSensors.add(new Sensor(1L, "Temperature Sensor"));
            livingRoomSensors.add(new Sensor(2L, "Humidity Sensor"));

            if(sensorReadingRepository.findAll().isEmpty()){
                for (int sensorId = 1; sensorId <=2 ; sensorId++) {
                    for (int r = 0; r < 100; r++) {
                        SensorReading reading = new SensorReading();
                        reading.setDate(LocalDateTime.now().minusMinutes(r));
                        reading.setSensorId((long) sensorId);
                        reading.setReading((double) (45 + rand.nextInt(5)));
                        sensorReadingRepository.save(reading);
                    }
                }
            }

            livingRoom.setDevices(livingRoomDevices);
            livingRoom.setSensors(livingRoomSensors);

            roomRepository.save(livingRoom);


            Room bedRoom = new Room();
            bedRoom.setPrimaryId("bedroom");
            bedRoom.setName("Bed Room");
            bedRoom.setIcon("bed");

            Set<Device> bedRoomDevices = new HashSet<Device>();
            bedRoomDevices.add(new Device("Light", 0));
            bedRoomDevices.add(new Device("Fan", 0));
            bedRoomDevices.add(new Device("Alarm", 0));

            bedRoom.setDevices(bedRoomDevices);

            roomRepository.save(bedRoom);
        }
    }
}
