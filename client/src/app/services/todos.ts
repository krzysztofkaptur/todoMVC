const baseURL = 'http://host.docker.internal/api/v1'

export const fetchTodos = () =>
  fetch(`${baseURL}/todos`).then(res => res.json())
