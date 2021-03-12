import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRooms } from "./../../store/rooms/rooms.actions";
import Room from "../../components/Rooms/Room";

import classes from "./RoomsDashboard.module.scss";

export class RoomsDashboard extends Component {
  static propTypes = {
    fetchRooms: PropTypes.func,
    rooms: PropTypes.any
  };

  componentDidMount() {
    if (this.props.fetchRooms) {
      this.props.fetchRooms();
    }
  }

  onClickRoomHandler = roomId => {
    // Go to room page
    this.props.history.push(`/room/${roomId}`);
  };

  render() {
    if (!this.props.rooms.length) return null;

    return (
      <div className={classes.Row}>
        {
          this.props.rooms.map(room => {
            return (
              <div
                data-test={`room-card-${room.primaryId}`}
                key={room.primaryId}
                className={classes.Column}
                onClick={() => this.onClickRoomHandler(room.primaryId)}
              >
                <Room
                  id={room.primaryId}
                  name={room.name}
                  icon={room.icon}
                  devicesCount={room.devices.length}
                  sensorsCount={room.sensors.length}
                />
              </div>
            )
          }
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

const mapDispatchToProps = {
  fetchRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomsDashboard);
