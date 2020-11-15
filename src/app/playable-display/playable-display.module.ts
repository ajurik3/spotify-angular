import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayableDisplayComponent } from './playable-display/playable-display.component';
import { ArtistRequestService } from '../services/artist-request.service';



@NgModule({
  declarations: [PlayableDisplayComponent],
  exports: [PlayableDisplayComponent],
  imports: [
    CommonModule
  ],
  providers: [ArtistRequestService]
})
export class PlayableDisplayModule { }
