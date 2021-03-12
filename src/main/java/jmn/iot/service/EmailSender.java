package jmn.iot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSender {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailSender(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    void sendEmail(){

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("jeannot@ssquared.dev");

        msg.setSubject("ATTENTION!!! HOME ALARM");
        msg.setText("Hi Jeannot. \n\nYour home alarm just went off, may you please check or contact the right people.");

        javaMailSender.send(msg);
    }
}
