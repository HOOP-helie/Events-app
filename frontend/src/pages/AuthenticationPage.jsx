import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  let formData = await request.formData();
  const params = new URL(request.url).searchParams;
  let mode = params.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    mode = "signup"
  }

  let data = {
    email: formData.get("email"),
    password: formData.get("password")
  }

  const res = await fetch(`http://localhost:8080/${mode}`,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

  if (res.status === 422 || res.status === 401) return res
  if (!res.ok) return json({ message: "Could not authenticate user" }, { status: 500 });


  return redirect("/")

}