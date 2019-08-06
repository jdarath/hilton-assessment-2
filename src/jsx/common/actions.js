import { TOGGLE_ROOM, CHANGE_GUESTS } from './action-types';

export function toggleRoom(payload) {
    return { type: TOGGLE_ROOM, payload }
};

export function changeGuests(payload) {
    return { type: CHANGE_GUESTS, payload }
}