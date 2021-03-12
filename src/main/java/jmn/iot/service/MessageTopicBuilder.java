package jmn.iot.service;

import jmn.iot.model.Device;
import org.springframework.stereotype.Component;

@Component
public class MessageTopicBuilder {

    public String build(Device deviceToControl) {
        String topic = "";
        topic += deviceToControl.getRoomId().toUpperCase().replace("-", "_");
        topic += "_";
        topic += deviceToControl.getName().toUpperCase();

        return topic;
    }
}
