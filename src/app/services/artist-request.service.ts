import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistRequestService {

  private bearerHeaders = {
    headers : {
      'Authorization' : null
    }
  };
  constructor(private http: HttpClient,
              private credentialsService: CredentialsService) {
                this.credentialsService.getUserItemState().subscribe(userItem => {
                this.bearerHeaders.headers.Authorization = 'Bearer ' + userItem.accessToken;
                });
  }

  public getArtist(id) {
    return this.http.get('https://api.spotify.com/v1/artists/' + id, this.bearerHeaders);
  }
  public getArtistAlbums(id) {
    return this.http.get('https://api.spotify.com/v1/artists/' + id + '/albums?market=US&limit=50', this.bearerHeaders);
  }
  public getArtistTopTracks(id) {
    return this.http.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks/?country=US', this.bearerHeaders);
  }
}
