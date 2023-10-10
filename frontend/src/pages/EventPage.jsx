import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import EventList from "./../components/EventsList"
export default function EventPage() {
    const data = useLoaderData();

    if (!data.events) return <p>Error</p>

    return (
        <div>EventPage
            <Outlet />
            <EventList events={data.events} />
        </div>

    )
}

async function eventsLoader() {
    const res = await fetch(`http://localhost:8080/events`);
    if (!res.ok) {
        throw new Response("Not Found");
    }
    return res.json();
}

export { eventsLoader }