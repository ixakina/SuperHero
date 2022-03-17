import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public activeTab: string = 'heroes';

  constructor() {
  }

  ngOnInit(): void {
  }

}
