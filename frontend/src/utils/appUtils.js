// Common code used in the application

export function requestBuilder(req, authcontext, body) {
  const requestOptions = {
    method: req,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authcontext ? authcontext.authHeader() : ""}`,
    },
    body: JSON.stringify(body),
  };
  return requestOptions;
}
