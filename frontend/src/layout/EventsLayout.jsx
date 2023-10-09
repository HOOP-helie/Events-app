import React from 'react'
import EventsNavigation from "../components/EventsNavigation"
import { Outlet } from 'react-router-dom'

function EventsLayout() {
    return (
        <>
            <EventsNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default EventsLayout