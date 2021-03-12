package jmn.iot.repository;

import jmn.iot.model.Device;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Long> {

    List<Device> findByRoomId(String roomId);
}
