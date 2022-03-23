import {Component, OnInit} from '@angular/core';
import {PowerUp, User} from "../../common/interfaces";
import {StorageService} from "../../services/storage.service";
import {LocStorKeys} from "../../common/constants";

@Component({
  selector: 'app-powerups-tab',
  templateUrl: './powerups-tab.component.html',
  styleUrls: ['./powerups-tab.component.scss']
})
export class PowerupsTabComponent implements OnInit {
  public powerups: [string, PowerUp][];

  constructor(
    private storage: StorageService
  ) {
  }

  ngOnInit(): void {
   this.showUsersPowerups();
  }

  private showUsersPowerups(): void {
    this.powerups = Object.entries((<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID)).powerups)
      .sort((a: [string, PowerUp], b: [string, PowerUp]) => b[1].uses - a[1].uses)
  }

}
