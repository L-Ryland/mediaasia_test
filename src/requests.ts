import axios, {AxiosPromise} from "axios";
import {Album, Photo, Post, User, Comment, Todo, ExtraQueryKey} from "./interface";

const offset = 100;

export function fetchUsers(params?: {id: number}): AxiosPromise<User[]> {
  return axios.get('https://jsonplaceholder.typicode.com/users', {params});
}

export function fetchAlbums(): AxiosPromise<Album[]> {
  return axios.get('https://jsonplaceholder.typicode.com/albums');
}

export function fetchPhotos(params?: Partial<Photo>| ExtraQueryKey): AxiosPromise<Photo[]> {
  return axios.get("https://jsonplaceholder.typicode.com/photos", {params});
}

export function fetchInfinitePhotos({pageParam = 1}) {
  return fetchPhotos({_page: pageParam, _limit: offset});
}

export function fetchPosts(params?: { id: number }): AxiosPromise<Post[]> {
  return axios.get('https://jsonplaceholder.typicode.com/posts', {params});
}

export function fetchComments(params: Partial<Comment>): AxiosPromise<Comment[]> {
  return axios.get("https://jsonplaceholder.typicode.com/comments",{params} )
}

export function fetchTodos(params?: Partial<Todo> | ExtraQueryKey<Todo>): AxiosPromise<Todo[]> {
  return axios.get("https://jsonplaceholder.typicode.com/todos", {params})
}
