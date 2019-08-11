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
            alert = alertOn? <div class="alert">✔ Your rooms have been booked!</div> : '';
        return(
            <main>
                <form className="rooms-wrapper">
                    {
                        rooms.map((room, k) => {
                            return <HRoom ix={k} key={k} />
                        })
                    }
                </form>
                {alert}
                <button onClick={this.saveRooms}>Submit</button>
            </main>
        );
    }
}

export default connect(mapStateToProps, null)(HRooms);