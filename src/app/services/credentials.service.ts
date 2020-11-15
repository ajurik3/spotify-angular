import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, tap } from 'rxjs/operators';
import { UserItem } from './user-item';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private userItemState = new BehaviorSubject<UserItem>(new UserItem());
  private params;
  private userItem = new UserItem();
  private refreshToken;
  private pageInitLoadError;
  private bearerHeaders;
  constructor(private http: HttpClient) { }

  public initSubject(): Observable<UserItem>{
    this.params = this.getHashParams();

    this.userItem.accessToken = this.params.access_token;
    this.refreshToken = this.params.refresh_token;
    this.pageInitLoadError = this.params.error;
    this.bearerHeaders = {
        headers : {
          'Authorization' : 'Bearer ' + this.userItem.accessToken
        }
    };
    this.userItemState.next(this.userItem);
    if (this.pageInitLoadError) {
      console.log(this.pageInitLoadError);
    } else if (this.userItem.accessToken) {
         return this.http.get('https://api.spotify.com/v1/me', this.bearerHeaders).pipe(switchMap(value => {
           this.userItem.id = (value as any).id;
           this.userItemState.next(this.userItem);
           return this.userItemState.asObservable();
          }));
    //     {
    //       $('#login').hide();
    //       $('#loggedin').show();
    //       updateHidden().then(getTracking).then(getTempPlaylists(checkArchiveDates, {archived: false}));
    //     }
    //     else {
    //         // render initial screen
    //         $('#login').show();
    //         $('#loggedin').hide();
    }
    return of(null);
  }

  getUserItemState(): Observable<UserItem> {
    return this.userItemState.asObservable();
  }

  subscribe(callback) {
    return this.userItemState.subscribe(callback);
  }

  getHashParams() {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);

    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getDateDisplay(date){

    if (typeof date === 'string') {
      date = new Date(date);
    }

    return '' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
  }

  refreshOrFail(err, callback, params, onFail){

    if (err[0].status === 401){
      this.getRefreshToken(); // .then(callback.apply(0, params));
    }
    else if (err[0].status === 429) {
      console.log(err);
      console.log(err[0].getResponseHeader());
    }
    else{
      console.log(err);
      if (onFail) {
        onFail();
      }
    }
  }

  getRefreshToken(){
    return this.http.get('localhost:8888/refresh_token',
       {
         params: {
          'refresh_token': this.refreshToken
        }
      }
      );
  }

  /*
      success : function(data){
          access_token = data.access_token;
          bearerHeaders = {
            'Authorization' : 'Bearer ' + access_token
          };
        },
        error : function(data){
          console.log(data);
        }
  */
}
