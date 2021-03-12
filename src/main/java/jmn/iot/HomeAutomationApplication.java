package jmn.iot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HomeAutomationApplication {

   /* @Autowired
    private MessagingService messagingService;

    @Autowired
    private ConfigurableApplicationContext context;*/

    public static void main(String[] args) {
        SpringApplication.run(HomeAutomationApplication.class, args);
    }

    /*@Override
    public void run(String... args) throws Exception {
        final String topic = "test";

        messagingService.subscribe(topic);

        messagingService.publish(topic, "Hello Jeannot", 0, true);

//        context.close();
    }*/
}
