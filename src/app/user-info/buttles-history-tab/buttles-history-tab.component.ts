import {Component, OnInit} from '@angular/core';
import {LocStorKeys, SortCase, SortType} from "../../common/constants";
import {Buttle, User} from "../../common/interfaces";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-buttles-history-tab',
  templateUrl: './buttles-history-tab.component.html',
  styleUrls: ['./buttles-history-tab.component.scss']
})
export class ButtlesHistoryTabComponent implements OnInit {
  public user: User;
  public buttles: Buttle[]
  private sortType: string = SortType.ASK;
  private sortCase: string = SortCase.ALPHABET;

  constructor(
    private storage: StorageService
  ) {
  }

  ngOnInit(): void {
    this.user = (<User[]>this.storage.getData(LocStorKeys.USERS))
      .find((user: User) => user.id === this.storage.getData(LocStorKeys.CURRENT_USER_ID));
    this.buttles = this.user.battles;
  }

  public sortByAlphabet(field: keyof Buttle) {
    this.setSortType();
    this.sortCase = SortCase.ALPHABET;
    const [increase, decrease] = this.sortType === SortType.ASK ? [1, -1] : [-1, 1];
    this.buttles.sort((buttleA: Buttle, buttleB: Buttle) => {
      return buttleA[field].toLowerCase() > buttleB[field].toLowerCase()
        ? increase
        : decrease;
    })
  }

  public sortByDate(): void {
    this.setSortType();
    this.sortCase = SortCase.DATE;
    const [increase, decrease] = this.sortType === SortType.ASK ? [1, -1] : [-1, 1];
    this.buttles.sort((buttleA: Buttle, buttleB: Buttle) => {
      const buttleADate = +buttleA.date;
      const buttleBDate = +buttleB.date;
      return buttleADate - buttleBDate > 0 ? increase : decrease;
    })
  }

  private setSortType(): void {
    this.sortType = this.sortType === SortType.ASK ? SortType.DESC : SortType.ASK;
  }
}
