import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

function ErrorPage() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) return <p>{error.data}</p>

    return (
        <div>An error occured</div>
    )
}

export default ErrorPage