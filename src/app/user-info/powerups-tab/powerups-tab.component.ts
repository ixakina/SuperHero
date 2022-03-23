import {Component, OnInit} from '@angular/core';
import {IPowerUp, IUser} from "../../common/interfaces";
import {UtilsService} from "../../services/storage.service";

@Component({
  selector: 'app-powerups-tab',
  templateUrl: './powerups-tab.component.html',
  styleUrls: ['./powerups-tab.component.scss']
})
export class PowerupsTabComponent implements OnInit {
  public powerups: [string, IPowerUp][];

  constructor(
    private utils: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.powerups = Object.entries(this.utils.getUsers()
      .find((user: IUser) => user.id === +this.utils.getCurrentUserId()).powerups)
      .sort((a: [string, IPowerUp], b: [string, IPowerUp]) => b[1].uses - a[1].uses)
  }

}
