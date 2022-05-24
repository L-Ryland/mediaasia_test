export enum FetchData {
  FetchUsers = 'fetchUsers',
  FetchPosts = 'fetchPost',
  FetchComments = 'fetchComments',
  FetchAlbums = 'fetchAlbums',
  FetchPhotos = 'fetchPhotos',
  FetchTodos = 'fetchTodos',
}
export interface User {
  id:       number;
  name:     string;
  username: string;
  email:    string;
  address:  Address;
  phone:    string;
  website:  string;
  company:  Company;
}

export interface Address {
  street:  string;
  suite:   string;
  city:    string;
  zipcode: string;
  geo:     Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name:        string;
  catchPhrase: string;
  bs:          string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUser(json: string): User {
    return JSON.parse(json);
  }

  public static userToJson(value: User): string {
    return JSON.stringify(value);
  }
}

export interface Album {
  userId: number;
  id:     number;
  title:  string;
}

export interface Photo {
  albumId:      number;
  id:           number;
  title:        string;
  url:          string;
  thumbnailUrl: string;
}
export interface Todo {
  userId:    number;
  id:        number;
  title:     string;
  completed: boolean;
}
export interface Post {
  userId: number;
  id:     number;
  title:  string;
  body:   string;
}
export interface Comment {
  postId: number;
  id:     number;
  name:   string;
  email:  string;
  body:   string;
}

export interface ExtraQueryKey<T=unknown> {
  _order?: "asc" | "desc";
  _sort?: keyof T;
  _limit?: number;
  _page?: number
}