import React, { Component } from 'react';
import { connect } from 'react-redux';
import HRoom from './HRoom';
import '../scss/rooms.scss';

const mapStateToProps = state => {
    return { 
        rooms: state.rooms
    };
}

export class HRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertOn: false
        };
        this.saveRooms = this.saveRooms.bind(this);
    }

    saveRooms() {
        const { rooms } = this.props;
        let { alertOn } = this.state;
        localStorage.setItem('rooms', JSON.stringify(rooms));
        this.setState({ alertOn: true });
    }

    render() {
        
        const { rooms } = this.props,
            { alertOn } = this.state,
            alert = alertOn? <p class="alert">✔ Your rooms have been booked!</p> : '';
        return(
            <main className="rooms-wrapper" id="form_rooms">
                {
                    rooms.map((room, k) => {
                        return <HRoom ix={k} key={k} />
                    })
                }
                <section className="callToAction">
                    {alert}
                    <button onClick={this.saveRooms}>Submit</button>
                </section>
            </main>
        );
    }
}

export default connect(mapStateToProps, null)(HRooms);