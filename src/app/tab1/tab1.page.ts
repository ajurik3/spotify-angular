import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, tap, filter } from 'rxjs/operators';
import { CredentialsService } from '../services/credentials.service';
import { UserItem } from '../services/user-item';
import { UtilsService } from '../services/utils.service';
import { Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  private trackingData;
  public loggedIn = false;
  public selectedPlayable = null;
  constructor(private credentialsService: CredentialsService,
              private http: HttpClient,
              private util: UtilsService,
              public platform: Platform,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.credentialsService.initSubject().pipe(
      filter(Boolean),
      tap((userItem: UserItem) => this.loggedIn = !!userItem.id),
      switchMap(value => {
        return this.http.get('http://localhost:8888/latest?uId=' + (value as any).id);
     }), tap(trackingData => this.trackingData = trackingData)).subscribe(val => this.processData(val));
    this.activatedRoute.url.subscribe( () => {
      this.selectedPlayable = null;
    });

  }

  processData(data) {
    this.trackingData = data;
    this.trackingData.forEach(artistData => artistData.displayDate = this.util.getDateDisplay(artistData.date));
    console.log(this.trackingData);
    console.log(this.platform.width());
  }
  displayArtist(item) {
    console.log(this.selectedPlayable);
    this.selectedPlayable = {type: 'artist', id: item.artistID};
    console.log(this.selectedPlayable);
  }

  displayAlbum(item) {
    console.log(this.selectedPlayable);
    this.selectedPlayable = {type: 'album', id: item.albumID};
    console.log(this.selectedPlayable);
  }
}
