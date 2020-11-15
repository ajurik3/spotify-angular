import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { UtilsService } from '../services/utils.service';
import { PlayableDisplayModule } from '../playable-display/playable-display.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    PlayableDisplayModule
  ],
  declarations: [Tab1Page],
  providers: [UtilsService]
})
export class Tab1PageModule {}
