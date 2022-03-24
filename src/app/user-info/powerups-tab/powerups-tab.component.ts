import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PowerUp, User} from "../../common/interfaces";
import {StorageService} from "../../services/storage.service";
import {LocStorKeys, usersPowerupsInfo} from "../../common/constants";

@Component({
  selector: 'app-powerups-tab',
  templateUrl: './powerups-tab.component.html',
  styleUrls: ['./powerups-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerupsTabComponent implements OnInit {
  public powerups: PowerUp[];
  public powerupsInfo = usersPowerupsInfo;

  constructor(
    private storage: StorageService
  ) {
  }

  ngOnInit(): void {
    this.showUsersPowerups();
  }

  public getImgSrc(name: string) {
    return this.powerupsInfo.find(item => item.name === name).imgSrc;
  }

  private showUsersPowerups(): void {
    this.powerups = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) =>
        user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID))
      .powerups
      .sort((a: PowerUp, b: PowerUp) => b.uses - a.uses)
  }

}
