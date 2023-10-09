import React from 'react'
import { Outlet } from 'react-router-dom'

function EventPage() {
    return (
        <div>EventPage
            <Outlet/>
        </div>
        
    )
}

export default EventPage