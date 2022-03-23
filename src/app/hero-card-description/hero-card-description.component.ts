import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../common/interfaces";

@Component({
  selector: 'app-hero-card-description',
  templateUrl: './hero-card-description.component.html',
  styleUrls: ['./hero-card-description.component.scss']
})
export class HeroCardDescriptionComponent implements OnInit {
  @Input() hero: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
