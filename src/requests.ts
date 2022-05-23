import axios, {AxiosPromise} from "axios";
import {Album, Photo, User} from "./interface";

export function fetchUsers(): AxiosPromise<User[]> {
  return axios.get('https://jsonplaceholder.typicode.com/users');
}

export function fetchAlbums(): AxiosPromise<Album[]> {
  return axios.get('https://jsonplaceholder.typicode.com/albums');
}

export function fetchPhotos(params?: {id: number}):  AxiosPromise<Photo[]> {
  return axios.get("https://jsonplaceholder.typicode.com/photos", {params});
}