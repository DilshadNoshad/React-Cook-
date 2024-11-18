import { baseApi } from "./base";

export function getTodos(query, options) {
  return baseApi.get(`todos?q=${query}`, options).then((res) => res.data);
}
export function addTodo(data, options) {
  return baseApi.post("todos", data, options).then((res) => res.data);
}
