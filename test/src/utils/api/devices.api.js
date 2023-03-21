import axios from "./axios";

export const getRoomDevicesApi = roomId => {
  return axios.get(`/rooms/${roomId}/devices`);
};

export const getRoomSensorsApi = roomId => {
  return axios.get(`/rooms/${roomId}/sensors`);
}

export const getSensorReadings = sensorId =>{
  return axios.get(`/sensors/${sensorId}/readings?limit=50`);
}

export const toggleDeviceSwitchApi = deviceId => {
  
  return axios.post(`/devices/${deviceId}/toggle`);
};

export const updateDeviceControlValueApi = payload => {
  // This would be a PATCH request for an actual server
  const response = {
    data: {
      control: payload
    }
  };
  return new Promise((resolve, reject) => resolve(response));
};
