/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import './Event.css';

class Event extends Component {
    render() {
        return (
            <div>
                <h1 className="Event">Event</h1>
                <div className="Event_box">
                    <div className="Eb1">
                        <img src = "#" className="event1"></img>
                    </div>
                    <div className="Eb2">
                        <img src = "#" className="event2"></img>
                        <img src = "#" className="event3"></img>
                    </div>
                    <div className="Eb3">
                        <img src = "#" className="event4"></img>
                        <img src = "#" className="event5"></img>
                    </div>                   
                </div>
            </div>
        )
    }
}

export default Event;