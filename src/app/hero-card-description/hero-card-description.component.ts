import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Hero} from "../common/interfaces";

@Component({
  selector: 'app-hero-card-description',
  templateUrl: './hero-card-description.component.html',
  styleUrls: ['./hero-card-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardDescriptionComponent{
  @Input() hero: Hero;

}
