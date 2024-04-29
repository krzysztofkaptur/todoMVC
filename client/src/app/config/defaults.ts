// export const baseURL = "http://host.docker.internal/api/v1"; // works on server and client, but cookies are removed
// export const baseURL = "http://localhost/api/v1"; // works in the browser, not on server
// export const baseURL = "http://todomvc_api/api/v1"; // work on server, not in the browser
export const baseURL = process.env.BASE_URL || "http://localhost/api/v1";
