import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    fetchRoomDevices,
    fetchRoomSensors,
    toggleDeviceSwitch,
    updateDeviceControlValue
} from "./../../../store/devices/devices.actions";
import Device from "../../../components/Device/Device.jsx";
import {NavLink} from "react-router-dom";
import classes from "./RoomDevices.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import Sensor from "../../../components/Sensor/Sensor.jsx";

export class RoomDevices extends Component {
    static propTypes = {
        fetchRoomDevices: PropTypes.func,
        fetchRoomSensors: PropTypes.func
    };

    state = {
        mountFailed: false
    };

    componentDidMount() {
        if (
            !!this.props.match &&
            !!this.props.match.params &&
            !!this.props.match.params.id &&
            !!this.props.fetchRoomDevices &&
            !!this.props.fetchRoomSensors
        ) {
            const roomId = this.props.match.params.id;
            this.props.fetchRoomDevices(roomId);
            this.props.fetchRoomSensors(roomId);
        }
    }

    /**
     * This for toggling the main switch of the device
     */
    toggleDeviceSwitch = deviceId => {
        this.props.toggleDeviceSwitch(deviceId);
        // window.location.reload(false);
    };

    /**
     * Evenet handler when a device control value changed
     */
    onControlValueChangedHandler = (deviceId, controlId, newValue) => {
        this.props.updateDeviceControlValue({deviceId, controlId, newValue});
    };

    is_empty = (obj) => {
        for (var i in obj) {
            if (obj.hasOwnProperty(i))
                return false;
        }
        return true;
    }

    render() {

        return (
            <Fragment>
                <NavLink to="/" className={classes.BackLink}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    <span>Back to Rooms</span>
                </NavLink>
                <div className={classes.RoomDevices}>
                    {this.is_empty(this.props.devices) ? null : this.props.devices.map(device => {
                        return (
                            <div key={device.primaryId} className={classes.Column}>
                                <Device
                                    deviceId={device.primaryId}
                                    device={device}
                                    onToggleDeviceSwitch={() => this.toggleDeviceSwitch(device.primaryId)}
                                    onControlValueChanged={this.onControlValueChangedHandler}
                                />
                            </div>
                        );
                    })}
                    {this.is_empty(this.props.sensors) ? null : this.props.sensors.map(sensor => {
                        return (
                            <div
                                key={sensor.primaryId}
                                className={classes.Column}
                                onClick={() => this.props.history.push(`/sensor/${sensor.primaryId}`)}
                            >
                                <Sensor
                                    sensor={sensor}
                                />
                            </div>
                        );
                    })}

                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return ({
        devices: state.devices.devices,
        sensors: state.devices.sensors
    });
}

const mapDispatchToProps = {
    fetchRoomDevices,
    fetchRoomSensors,
    toggleDeviceSwitch,
    updateDeviceControlValue
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomDevices);
