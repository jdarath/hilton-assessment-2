import React, { Component } from 'react';
import '../scss/header.scss';
import HI_isotipo from '../assets/HI_isotipo.png';

class HHeader extends Component {
    render() {
        return (
            <header>
                <button class="header_button-back" role="button">Back</button>
                <h1 class="header_title">Hotel Details</h1>
                <img class="header_img-logo" src={HI_isotipo} alt="Hilton logo" />
            </header>
        );
    }
}

export default HHeader;