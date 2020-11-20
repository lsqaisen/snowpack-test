import request from "../utils/request";

export function fetch({ page }: any) {
  return request(`/api/users?_page=${page}&_limit=10`);
}

export function remove(id: any) {
  return request(`/api/users/${id}`, {
    method: "DELETE",
  });
}

export function patch(id: any, values: any) {
  return request(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

export function create(values: any) {
  return request("/api/users", {
    method: "POST",
    body: JSON.stringify(values),
  });
}
