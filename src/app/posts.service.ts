import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

import { Post } from "./models/post.interface";

@Injectable({ providedIn: "root" })
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(postData: Post) {
    return this.http
      .post<{ name: string }>(
        "https://food-n-stuff-2b9e6.firebaseio.com/posts.json",
        postData
      )
      .pipe(
        map(responseData => {
          return responseData;
        })
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('custom', 'key')

    return this.http
      .get<{ [key: string]: Post }>(
        "https://food-n-stuff-2b9e6.firebaseio.com/posts.json",
        {
          // headers and params are key: value objects (just different syntx)
          headers: new HttpHeaders({ "Custom-Header": "Hello"}),
          params: searchParams
        }
      )
      .pipe(
        // we are converting the Firebase JS object into an array
        map(responseData => {
          const postsArray: Post[] = [];
          // for each key in each returned object
          for (const key in responseData) {
            // safety check to ensure we have a response object with a key
            if (responseData.hasOwnProperty(key)) {
              // push object into array BUT as an array with the key as array item (id)
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorResponse => {
          // do something with errorResponse; send to analtics server
          // throwError is an Observable - currently doing nothing cuz none is subscribed to it
          return throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      "https://food-n-stuff-2b9e6.firebaseio.com/posts.json"
    );
  }
}
