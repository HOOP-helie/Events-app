import React from 'react'
import { json, useRouteLoaderData, redirect } from 'react-router-dom';
import EventItem from '../components/EventItem';
import { getToken } from '../utils/auth';

function EventDetailPage() {
    const { event } = useRouteLoaderData("event-detail")

    return (
        <EventItem event={event} />
    )
}

export default EventDetailPage

export async function eventDetailLoader({ params }) {
    const res = await fetch(`http://localhost:8080/events/` + params.id);
    if (!res.ok) {
        throw json({ message: "Could not fetch event details" }, { status: 500 });
    }
    return res;
}

export async function action({ params, request }) {
    const token = getToken();

    const res = await fetch(`http://localhost:8080/events/` + params.id, {
        method: request.method,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });

    if (!res.ok) {
        throw json({ message: "Could not delete event" }, { status: 500 });
    }
    return redirect("/events");
}
