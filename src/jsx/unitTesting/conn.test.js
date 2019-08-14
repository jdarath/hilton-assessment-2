import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { mount } from 'enzyme';
import HRooms from '../HRooms';

const initialState = {
    rooms: [
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
    ]
},
    TOGGLE_ROOM = "TOOGLE_ROOM", //action type
    //reducer:
    rReducer = (state = initialState, action) => {
        let { rooms } = state,
            newRooms = [];
        switch(action.type) {
            case TOGGLE_ROOM:
                const roomIx = (typeof action.roomIx == 'undefined')? action.payload.roomIx : action.roomIx;
                rooms[roomIx].isActive = !rooms[roomIx].isActive;
                if(rooms[roomIx].isActive) {
                    for(var i=0; i<roomIx; i++) rooms[i].isActive = true;
                } else {
                    for(var i=roomIx; i<rooms.length; i++) {
                        rooms[i].isActive = false;
                        rooms[i].adults = 1;
                        rooms[i].children = 0;
                    }
                }
                break;
            default:
                rooms = rooms;
        }
        rooms.map((room) => {
            newRooms.push(room);
        })
        return Object.assign({}, state, { rooms: newRooms});
    },
    middleware = [ReduxThunk],
    tStore = (tsState = initialState) => {
        const createStoreWMW = applyMiddleware(...middleware)(createStore);
        return createStoreWMW(rReducer, tsState);
    },
    setUp = (state = initialState) => {
        const app = mount(<Provider store={tStore()}><HRooms /></Provider>);
        return app;
    };

describe('RoomsApp', () => {
    let app;
    beforeEach(() => {
        app = setUp();
    });

    it('render without errors', () => {
        expect(app.find('HRoom')).toHaveLength(4);
    });

    //rooms 2 - 4 should be off by default:
    for(let ci = 1; ci <= 3; ci++) {
        it('By default, room ' + (ci+1) + ' should be off', () => {
            let cchkbx = app.find('HRoom').at(ci).find({type: 'checkbox'});
            expect(cchkbx.props().checked).toEqual(false);
        });
    }
    
    it('While activating 4th checkbox, 2nd and 3rd checkboxes and internal selects become active', () => {
        //click the 4th checkbox:
        let cchkbx = app.find('HRoom').at(3).find({type: 'checkbox'});
            cchkbx.simulate('change', { target: { checked: true }});
            for(let ci = 1; ci <= 2; ci++) {
                //now checkbox of [current room] should be enabled
                cchkbx = app.find('HRoom').at(ci).find({type: 'checkbox'});
                expect(cchkbx.props().checked).toEqual(true);

                //now adults select of [current room] should be enabled
                let sAdults = app.find('HRoom').at(ci).find('[name="adults"]');
                expect(sAdults.props().disabled).toBeFalsy();
            }
    });

    it('While deactivating 2nd checkbox, all 2nd, 3rd and 4th checkboxes and internal selects become inactive', () => {
        //click the 2nd checkbox:
        let cchkbx = app.find('HRoom').at(1).find({type: 'checkbox'});
            cchkbx.simulate('change', { target: { checked: false }});
            for(let ci = 1; ci <= (app.find('HRoom').length - 1); ci++) {
                //now checkbox of [current room] should be disabled
                cchkbx = app.find('HRoom').at(ci).find({type: 'checkbox'});
                expect(cchkbx.props().checked).toEqual(false);

                //now adults select of [current room] should be disabled
                let sAdults = app.find('HRoom').at(ci).find('[name="adults"]');
                expect(sAdults.props().disabled).toBeTruthy();
            }
    });
});