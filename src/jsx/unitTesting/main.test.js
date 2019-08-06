import React from 'react';
import { Provider } from 'react-redux';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'
import HRooms from '../HRooms';

configure({adapter: new Adapter()});
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
    mockStore = configureStore();
let app,
    store;

beforeEach(() => {
    store = mockStore(initialState);
    app = mount(<Provider store={store}><HRooms /></Provider>);
});

describe('Rooms', () => {
    it('Display 4 rooms blocks', () => {
        expect(app.find('HRoom')).toHaveLength(4);
    });

    it('By default, 4th room should be off', () => {
        expect(app.update().find('HRoom').at(3).find({type: 'checkbox'}).props().checked).toEqual(false);
    });
});