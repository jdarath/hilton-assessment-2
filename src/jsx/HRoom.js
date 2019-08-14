import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TOGGLE_ROOM } from './common/action-types';
import HGuests from './HGuests';

const mapStateToProps = state => {
    return { 
        rooms: state.rooms
    };
}
const mapDispatchToProps = dispatch => {
    return {
        toggleRoom: (ix) => dispatch({ type: TOGGLE_ROOM, roomIx: ix })
    }
}

export class HRoom extends Component {
    constructor(props) {
        super(props);
        this.toggleActive = this.toggleActive.bind(this);
    }

    toggleActive() {
        const { ix } = this.props;
        this.props.toggleRoom(ix);
    }

    render() {
        const { ix, rooms } = this.props,
            adults = [1, 2],
            children = [0, 1, 2],
            chBx = (ix==0)? '' : 
                <input type="checkbox" name="room_active" onChange={this.toggleActive} checked={rooms[ix].isActive} />;

        return(
            <section className={rooms[ix].isActive? 'room active' : 'room inactive'}>
                <h3 className="room_title">
                    {chBx}Room {ix+1}
                </h3>
                <form className="room_guests" id={`form_rooms_${ix}`}>
                    <fieldset className="room_guests-gtype" form={`form_rooms_${ix}`}>
                        <label htmlFor={`adults_${ix}`}>Adults (18+)</label>
                        <HGuests ix={ix} guestType='adults' guestOptions={adults} />
                    </fieldset>
                    <fieldset className="room_guests-gtype" form={`form_rooms_${ix}`}>
                        <label htmlFor={`children_${ix}`}>Children (0-17)</label>
                        <HGuests ix={ix} guestType='children' guestOptions={children} />
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HRoom);