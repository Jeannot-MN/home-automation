package jmn.iot.service;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MQTTService {

    private final IMqttClient mqttClient;

    @Autowired
    public MQTTService(IMqttClient mqttClient) {
        this.mqttClient = mqttClient;
    }

    public void publish(final String topic, final String payload, int qos, boolean retained)
            throws MqttPersistenceException, MqttException {
        MqttMessage mqttMessage = new MqttMessage();
        mqttMessage.setPayload(payload.getBytes());
        mqttMessage.setQos(qos);
        mqttMessage.setRetained(retained);

        mqttClient.publish(topic, mqttMessage);
    }

    public void subscribe(final String topic) throws MqttException, InterruptedException {
        System.out.println("Messages received: " + topic);

        mqttClient.subscribeWithResponse(topic, (tpic, msg) -> {
            System.out.println(msg.getId() + " -> " + new String(msg.getPayload()));
        });
    }
}
