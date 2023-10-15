import { json, redirect, useNavigate, useNavigation, useActionData, Form } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  let data = useActionData();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting"
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        Object.values(data.errors).map(err => <p key={err}>{err}</p>)
      )}
      <p>
        <label htmlFor="title">Title</label>
        < input id="title" type="text" name="title" defaultValue={event ? event.title : ""} required />
      </p >
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={event ? event.image : ""} required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={event ? event.date : ""} required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={event ? event.description : ""} rows="5" required />
      </p>
      <div className={classes.actions}>
        <button disabled={isSubmitting ? true : false} type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting ? true : false}>{isSubmitting ? "Submitting..." : "Save"}</button>
      </div>
    </Form >
  );
}

export default EventForm;


export async function action({ request, params }) {
  let formData = await request.formData();

  let data = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  }

  let url = 'http://localhost:8080/events'
  if (request.method === "PATCH") url = url + "/" + params.id

  const res = await fetch(
    url,
    {
      method: request.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
  );

  if (res.status === 422) return res;

  if (!res.ok) {
    throw json({ message: "Could not save event" }, { status: 500 });
  }
  return redirect("/events");

}