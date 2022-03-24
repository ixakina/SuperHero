import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LocStorKeys, SortCase, SortType} from "../../common/constants";
import {Battle, User} from "../../common/interfaces";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-buttles-history-tab',
  templateUrl: './buttles-history-tab.component.html',
  styleUrls: ['./buttles-history-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtlesHistoryTabComponent implements OnInit {
  public user: User;
  public battles: Battle[]
  private sortType: string = SortType.ASK;
  private sortCase: string = SortCase.ALPHABET;

  constructor(
    private storage: StorageService
  ) {
  }

  ngOnInit(): void {
    this.setVariablesvalues();
  }

  private setVariablesvalues(): void {
    this.user = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID));
    this.battles = this.user.battles;
  }

  public sortByAlphabet(field: keyof Battle) {
    this.setSortType();
    this.sortCase = SortCase.ALPHABET;
    const [increase, decrease] = this.sortType === SortType.ASK ? [1, -1] : [-1, 1];
    this.battles.sort((buttleA: Battle, buttleB: Battle) => {
      return buttleA[field].toLowerCase() > buttleB[field].toLowerCase()
        ? increase
        : decrease;
    })
  }

  public sortByDate(): void {
    this.setSortType();
    this.sortCase = SortCase.DATE;
    const [increase, decrease] = this.sortType === SortType.ASK ? [1, -1] : [-1, 1];
    this.battles.sort((buttleA: Battle, buttleB: Battle) => {
      const buttleADate = +buttleA.date;
      const buttleBDate = +buttleB.date;
      return buttleADate - buttleBDate > 0 ? increase : decrease;
    })
  }

  private setSortType(): void {
    this.sortType = this.sortType === SortType.ASK ? SortType.DESC : SortType.ASK;
  }
}
