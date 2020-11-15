import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ArtistRequestService } from 'src/app/services/artist-request.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-playable-display',
  templateUrl: './playable-display.component.html',
  styleUrls: ['./playable-display.component.scss'],
})
export class PlayableDisplayComponent implements OnInit {

  @Input() playableId;
  @Input() playableType;
  public title = null;
  public image = null;
  constructor(private artistRequestService: ArtistRequestService) { }

  ngOnInit() {
    console.log(this.playableId);
    zip(
      this.artistRequestService.getArtist(this.playableId),
      this.artistRequestService.getArtistAlbums(this.playableId),
      this.artistRequestService.getArtistTopTracks(this.playableId)
    ).subscribe(([artist, artistAlbums, topTracks]) => {
      this.title = (artist as any).name;
      if ((artist as any).images.length) {
        this.image = this.getImageURL((artist as any).images);
      }
      console.log(artist);
      console.log(artistAlbums);
      console.log(topTracks);
    });
  }

  private getImageURL(images){
    let index = 0;
    for (let i = 0; i < images.length; i++){
      const width = images[i].width;
      if (Math.abs(width - 160) <= Math.abs(images[index].width - 160)) {
        index = i;
      }
    }
    return images[index].url;
  }
}
