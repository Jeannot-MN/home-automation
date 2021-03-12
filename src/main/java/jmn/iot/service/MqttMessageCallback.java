package jmn.iot.service;

import jmn.iot.model.Sensor;
import jmn.iot.model.SensorReading;
import jmn.iot.repository.SensorReadingRepository;
import jmn.iot.repository.SensorRepository;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MqttMessageCallback implements MqttCallback {

    private final SensorRepository sensorRepository;
    private final SensorReadingRepository sensorReadingRepository;
    private final EmailSender emailSender;

    @Autowired
    public MqttMessageCallback(SensorRepository sensorRepository, SensorReadingRepository sensorReadingRepository, EmailSender emailSender) {
        this.sensorRepository = sensorRepository;
        this.sensorReadingRepository = sensorReadingRepository;
        this.emailSender = emailSender;
    }

    @Override
    public void connectionLost(Throwable throwable) {
        System.out.println("Connection MOs to MQTT broker lost!");
    }

    @Override
    public void messageArrived(String topic, MqttMessage mqttMessage) throws Exception {
        System.out.println("Message received: " + topic + " " + new String(mqttMessage.getPayload()));

        switch (topic) {
            case "HOUSE_TEMPERATURE":
                Sensor temperatureSensor = sensorRepository.findByName("Temperature Sensor");
                SensorReading reading = new SensorReading();
                reading.setDate(LocalDateTime.now());
                reading.setSensorId(temperatureSensor.getPrimaryId());
                reading.setReading(Double.valueOf(new String(mqttMessage.getPayload())));
                sensorReadingRepository.save(reading);
                break;

            case "HOUSE_HUMIDITY":
                Sensor humiditySensor = sensorRepository.findByName("Humidity Sensor");
                SensorReading humidityReading = new SensorReading();
                humidityReading.setDate(LocalDateTime.now());
                humidityReading.setSensorId(humiditySensor.getPrimaryId());
                humidityReading.setReading(Double.valueOf(new String(mqttMessage.getPayload())));
                sensorReadingRepository.save(humidityReading);
                break;

            case "HOUSE_ALARM":
                System.out.println("SENDING EMAIL TO USER NOW");
                emailSender.sendEmail();
                break;

        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
        // not used in this example
    }
}
