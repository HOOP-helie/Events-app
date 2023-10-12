import React from 'react'
import EventForm from '../components/EventForm'
import { json, redirect } from 'react-router-dom'

function NewEventPage() {
    return (
        <EventForm />
    )
}

export default NewEventPage

export async function action({ request }) {
    let formData = await request.formData();

    let data = {
        title: formData.get("title"),
        image: formData.get("image"),
        date: formData.get("date"),
        description: formData.get("description"),
    }

    const res = await fetch(
        `http://localhost:8080/events`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }
    );
    if (!res.ok) {
        throw json({ message: "Could not save new event" }, { status: 500 });
    }
    return redirect("/events");

}