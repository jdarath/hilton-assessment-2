import { TOGGLE_ROOM, CHANGE_GUESTS } from './action-types';

let savedRooms = localStorage.getItem('rooms');
try {
    if(typeof savedRooms != 'undefined' && savedRooms != null)
        savedRooms = JSON.parse(savedRooms)
} catch(err){
    savedRooms = null;
}
const rooms = (typeof savedRooms == 'undefined' || savedRooms == null)? [
        {
            isActive: true,
            adults: 1,
            children: 0
        },
        {
            isActive: false,
            adults: 1,
            children: 0
        },
        {
            isActive: false,
            adults: 1,
            children: 0
        },
        { 
            isActive: false,
            adults: 1,
            children: 0
        }
    ] : savedRooms;
console.log(rooms);
const initialState = {
    rooms: rooms
};

function MainReducer(state = initialState, action) {
    let { rooms } = state,
        newRooms = [];
    switch(action.type) {
        case TOGGLE_ROOM:
            rooms[action.roomIx].isActive = !rooms[action.roomIx].isActive;
            if(rooms[action.roomIx].isActive) {
                for(var i=0; i<action.roomIx; i++) rooms[i].isActive = true;
            } else {
                for(var i=action.roomIx; i<rooms.length; i++) {
                    rooms[i].isActive = false;
                    rooms[i].adults = 1;
                    rooms[i].children = 0;
                }
            }
            break;
        case CHANGE_GUESTS:
            let room = rooms[action.roomIx];
            room[action.guestType] = action.guests;
            rooms[action.roomIx] = room;
            break;
        default:
            rooms = rooms;
    }
    rooms.map((room) => {
        newRooms.push(room);
    })
    //console.log(rooms);
    return Object.assign({}, state, { rooms: newRooms});
};

export default MainReducer;