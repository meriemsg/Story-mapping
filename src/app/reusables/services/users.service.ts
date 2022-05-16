import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {basebackendUrl} from "../Const/configData";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private getMyAccount = basebackendUrl + 'my/account.json';
  constructor(private httpClient: HttpClient) {
  }
  getAccountUser(username:string,password:string) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa(username+":"+password));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get<any>(this.getMyAccount,{headers:headers});
  }

}
