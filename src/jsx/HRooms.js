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
        this.saveRooms = this.saveRooms.bind(this);
    }

    saveRooms() {
        const { rooms } = this.props;
        localStorage.setItem('rooms', JSON.stringify(rooms));
    }

    render() {
        const { rooms } = this.props;
        return(
            <main>
                <form className="rooms-wrapper">
                    {
                        rooms.map((room, k) => {
                            return <HRoom ix={k} key={k} />
                        })
                    }
                </form>
                <button onClick={this.saveRooms}>Submit</button>
            </main>
        );
    }
}

export default connect(mapStateToProps, null)(HRooms);