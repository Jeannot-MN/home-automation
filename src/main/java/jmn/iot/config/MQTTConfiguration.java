package jmn.iot.config;

import jmn.iot.model.Topic;
import jmn.iot.service.MqttMessageCallback;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MQTTConfiguration {

    @Autowired
    MqttMessageCallback mqttMessageCallback;

    @Bean
    @ConfigurationProperties(prefix = "mqtt")
    public MqttConnectOptions mqttConnectOptions() {
        return new MqttConnectOptions();
    }

    @Bean
    public IMqttClient mqttClient(@Value("${mqtt.clientId}") String clientId,
                                  @Value("${mqtt.hostname}") String hostname, @Value("${mqtt.port}") int port) throws MqttException, MqttException {

        IMqttClient mqttClient = new MqttClient("tcp://" + hostname + ":" + port, clientId);

        mqttClient.connect(mqttConnectOptions());
        mqttClient.subscribe(Topic.HOUSE_HUMIDITY.name(), 0);
        mqttClient.subscribe(Topic.HOUSE_TEMPERATURE.name(), 0);
        mqttClient.subscribe("HOUSE_ALARM", 0);
        mqttClient.setCallback(mqttMessageCallback);

        return mqttClient;
    }
}
