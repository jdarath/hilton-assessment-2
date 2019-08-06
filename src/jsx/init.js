import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './common/store';
import HRooms from './HRooms';
import '../scss/main.scss';

render(
    <Provider store={store}>
        <HRooms />
    </Provider>, 
    document.getElementById('HiltonA2-app')
);