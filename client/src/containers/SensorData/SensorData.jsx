import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchSensorReadings,} from "../../store/devices/devices.actions";
import {NavLink} from "react-router-dom";
import classes from "../RoomsDashboard/RoomDevices/RoomDevices.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

export class SensorData extends Component {
    static propTypes = {
        fetchSensorReadings: PropTypes.func
    };

    state = {
        mountFailed: false
    };

    componentDidMount() {
        const sensorId = window.location.pathname.split('/').at(-1);
        this.props.fetchSensorReadings(sensorId);
    }

    is_empty = (obj) => {
        for (var i in obj) {
            if (obj.hasOwnProperty(i))
                return false;
        }
        return true;
    }

    render() {

        const LineChart = this.is_empty(this.props.readings) ? null : (
            <div
                style={{
                    marginTop: '20px',
                    height: '300px',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Line
                    data={{
                        labels: this.props.readings.map(reading => {

                            return `${reading.date[3]}:${reading.date[4]}:${reading.date[5]}`;
                        }),
                        datasets: [
                            {
                                label: `${window.location.pathname.split('/').at(-1) === '1'? "Temperature in Celsius": "Humidity %"}`,
                                data: this.props.readings.map(reading => reading.reading),
                                borderColor: '#ff0000',
                                pointBorderColor: '#ff0000',
                                pointBackgroundColor: '#ff0000',
                                pointHoverBackgroundColor: '#80b6f4',
                                pointHoverBorderColor: '#80b6f4',
                                pointBorderWidth: 1,
                                pointHoverRadius: 10,
                                pointHoverBorderWidth: 1,
                                pointRadius: 2,
                                fill: false,
                                borderWidth: 1,
                                lineTension: 1,
                            }
                        ]
                    }}
                    /*options={{
                        responsive: true,
                        title: {
                            display: true,
                            text: `${window.location.pathname.split('/').at(-1) === '1'? "Temperature Sensor": "Humidity Sensor"}`,
                        },
                        maintainAspectRatio: false,
                        bezierCurve: false,
                        legend: {
                            display: true
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 45,
                                        minRotation: 45,
                                    },
                                },
                            ],
                        }
                    }}*/
                />
            </div>
        )

        return (
            <Fragment>
                <NavLink to="/" className={classes.BackLink}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    <span>Back to Rooms</span>
                </NavLink>
                <div>
                    {LineChart}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return ({
        readings: state.devices.readings,
    });
}

const mapDispatchToProps = {
    fetchSensorReadings
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SensorData);
