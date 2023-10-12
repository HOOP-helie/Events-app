import React from 'react'
import { json, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
    const { event } = useRouteLoaderData("event-detail")

    return (
        <EventItem event={event} />
    )
}

export default EventDetailPage

export async function eventLoader({ params }) {
    const res = await fetch(`http://localhost:8080/events/` + params.id);
    if (!res.ok) {
        throw json({ message: "Could not fetch event details" }, { status: 500 });
    }
    return res;
}
