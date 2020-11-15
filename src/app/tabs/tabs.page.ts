import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, tap, filter } from 'rxjs/operators';
import { CredentialsService } from '../services/credentials.service';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  constructor(private credentialsService: CredentialsService,
              private http: HttpClient) {}
  ngOnInit() {
    console.log('here');
  }

}
