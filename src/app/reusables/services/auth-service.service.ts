import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  loggedIn() {
    const apiKey = sessionStorage.getItem('api_key');

    if(apiKey) {
      return true;
    } else {
      return false;
    }
  }
  }
