import React, { Component } from 'react';
import '../scss/hotel.scss';
import hotelexterior from '../assets/hotelexterior.jpg';

class HHotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel: {
                cover: hotelexterior,
                title: 'Hilton Chicago',
                address: '720 South Michigan Avenue',
                city: 'Chicago',
                state: 'Illinois',
                zip: '60605',
                phone: '1-312-922-4400'
            },
            links: [ 'Map', 'Photo gallery', 'Amenities', 'Rooms']
        }
    }

    render() {
        const { hotel, links } = this.state;
        return (
            <main class="hotel" itemscope itemtype="http://schema.org/Hotel">
                <div class="hotel_cover">
                    <img src={hotel.cover} alt={hotel.title} itemprop="photo" />
                </div>
                <h2 class="hotel_title" itemprop="name">{hotel.title}</h2>
                <div class="hotel_address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                    <span itemprop="streetAddress">{hotel.address}</span><br />
                    <span itemprop="addressLocality">{hotel.city}</span>,&nbsp;
                    <span itemprop="addressRegion">{hotel.state}</span>,&nbsp;
                    <span itemprop="postalCode">{hotel.zip}</span>
                </div>
                <a class="hotel_contact" href={`tel:` + hotel.phone} target="_blank" itemprop="telephone">{hotel.phone}</a>
                <nav class="hotel_links">
                    {links.map((link, k) => <HotelLink key={k} label={link} />)}
                </nav>
            </main>
        );
    }
}

export default HHotel;

function HotelLink(props) {
    const {label} = props;
    return (
        <a class="hotel_link">
            {label}
        </a>
    );
}