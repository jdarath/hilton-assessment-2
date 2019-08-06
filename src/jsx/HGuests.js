import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHANGE_GUESTS } from './common/action-types';

const mapStateToProps = state => {
    return { 
        rooms: state.rooms
    };
}
const mapDispatchToProps = dispatch => {
    return {
        changeGuests: (roomIx, type, guests) => dispatch({ type: CHANGE_GUESTS, roomIx: roomIx, guestType: type, guests: guests })
    }
}

export class HGuests extends Component {
    constructor(props) {
        super(props);
        this.optChange = this.optChange.bind(this);
    }

    optChange(e) {
        const { ix, guestType } = this.props;
        this.props.changeGuests(ix, guestType, parseInt(e.target.value));
    }

    render() {
        const { ix, rooms, guestType, guestOptions } = this.props,
            room = rooms[ix];

        return(
            <select name={guestType}
                id={`${guestType}_${ix}`}
                disabled={!room.isActive} 
                value={room[guestType]}
                onChange={this.optChange} >
                {guestOptions.map((option, k) => {
                    return <option value={option} key={k}>{option}</option>
                })}
            </select>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HGuests);