import {
  FETCH_DEVICES_START,
  FETCH_DEVICES_SUCCESS,
  FETCH_DEVICES_FAILED,
  FETCH_SENSORS_START,
  FETCH_SENSORS_SUCCESS,
  FETCH_SENSORS_FAILED,
  FETCH_SENSOR_READINGS_START,
  FETCH_SENSOR_READINGS_SUCCESS,
  FETCH_SENSOR_READINGS_FAILED,
  TOGGLE_DEVICE_SWITCH_START,
  TOGGLE_DEVICE_SWITCH_SUCCESS,
  TOGGLE_DEVICE_SWITCH_FAILED,
  UPDATE_DEVICE_CONTROL_VALUE_START,
  UPDATE_DEVICE_CONTROL_VALUE_SUCCESS,
  UPDATE_DEVICE_CONTROL_VALUE_FAILED
} from "./devices.actiontypes";
import {
  getRoomDevicesApi,
  getRoomSensorsApi,
    getSensorReadings,
  toggleDeviceSwitchApi,
  updateDeviceControlValueApi
} from "../../utils/api/devices.api";
import { showErrorModal } from "../ui/ui.actions";

/** Fetching Room Devices Actions */
export const fetchRoomDevices = roomId => dispatch => {
  dispatch(fetchRoomDevicesStart());

  getRoomDevicesApi(roomId)
    .then(response => dispatch(fetchRoomDevicesSuccess(response.data)))
    .catch(error => {
      // This to mock an error response
      const errorResponse = {
        message: "Error while getting the devices data"
      };

      dispatch(fetchRoomDevicesFailed(errorResponse));
      dispatch(showErrorModal(errorResponse))
    });
};

export const fetchRoomSensors = roomId => dispatch => {

  dispatch(fetchRoomSensorsStart());

  getRoomSensorsApi(roomId)
    .then(response => dispatch(fetchRoomSensorsSuccess(response.data)))
    .catch(error => {
      // This to mock an error response
      const errorResponse = {
        message: "Error while getting the sensors data"
      };

      dispatch(fetchRoomSensorsFailed(errorResponse));
      dispatch(showErrorModal(errorResponse))
    });
}

export const fetchSensorReadings = sensorId => dispatch => {

  dispatch(fetchSensorReadingsStart());

  getSensorReadings(sensorId)
      .then(response => dispatch(fetchSensorReadingsSuccess(response.data)))
      .catch(error => {
        // This to mock an error response
        const errorResponse = {
          message: "Error while getting the sensor readings data"
        };

        dispatch(fetchSensorReadingsFailed(errorResponse));
        dispatch(showErrorModal(errorResponse))
      });
}

export const fetchRoomDevicesStart = () => ({
  type: FETCH_DEVICES_START
});

export const fetchRoomDevicesSuccess = devices => ({
  type: FETCH_DEVICES_SUCCESS,
  payload: {
    devices: devices
  }
});

export const fetchRoomDevicesFailed = error => ({
  type: FETCH_DEVICES_FAILED,
  payload: {
    error
  }
});

export const fetchRoomSensorsStart = () => ({
  type: FETCH_SENSORS_START
});

export const fetchRoomSensorsSuccess = sensors => ({
  type: FETCH_SENSORS_SUCCESS,
  payload: {
    sensors: sensors
  }
});

export const fetchRoomSensorsFailed = error => ({
  type: FETCH_SENSORS_FAILED,
  payload: {
    error
  }
});

export const fetchSensorReadingsStart = () => ({
  type: FETCH_SENSOR_READINGS_START
});

export const fetchSensorReadingsSuccess = readings => ({
  type: FETCH_SENSOR_READINGS_SUCCESS,
  payload: {
    readings: readings
  }
});

export const fetchSensorReadingsFailed = error => ({
  type: FETCH_SENSOR_READINGS_FAILED,
  payload: {
    error
  }
});

/** Device Switch Toggle Actions */
// Once the client press a switch  from the client application by sending an id in the request
export const toggleDeviceSwitch = deviceId => dispatch => {
  dispatch(toggleDeviceSwitchStart());

  toggleDeviceSwitchApi(deviceId)
    .then(response => dispatch(toggleDeviceSwitchSuccess(response.data)))
    .catch(error => {

      // This to mock an error response
      const errorResponse = {
        message: "Error while toggle the device switch"
      };

      dispatch(toggleDeviceSwitchFailed(errorResponse));
      dispatch(showErrorModal(errorResponse))
    });
};

export const toggleDeviceSwitchStart = () => ({
  type: TOGGLE_DEVICE_SWITCH_START
});

export const toggleDeviceSwitchSuccess = devices => {

  console.log(devices);
  console.log("-----------------------");
  return ({
    type: TOGGLE_DEVICE_SWITCH_SUCCESS,
    payload: devices
  });
}

export const toggleDeviceSwitchFailed = error => ({
  type: TOGGLE_DEVICE_SWITCH_FAILED,
  payload: {
    error
  }
});

/** Updating Control Value Handler */
export const updateDeviceControlValue = controlData => dispatch => {

  const payload = {
    deviceId: controlData.deviceId,
    controlId: controlData.controlId,
    newValue: controlData.newValue
  };

  dispatch(updateDeviceControlValueStart());

  updateDeviceControlValueApi(payload)
    .then(response => dispatch(updateDeviceControlSuccess(response.data.control)))
    .catch(error => {
      // This to mock an error response
      const errorResponse = {
        message: "Error while updating the device value"
      };

      dispatch(updateDeviceControlValueFailed(errorResponse));
      dispatch(showErrorModal(errorResponse))
    });
};

export const updateDeviceControlValueStart = () => ({
  type: UPDATE_DEVICE_CONTROL_VALUE_START
});

export const updateDeviceControlSuccess = control => ({
  type: UPDATE_DEVICE_CONTROL_VALUE_SUCCESS,
  payload: {
    ...control
  }
});

export const updateDeviceControlValueFailed = error => ({
  type: UPDATE_DEVICE_CONTROL_VALUE_FAILED,
  payload: {
    error
  }
});
