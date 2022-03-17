import {Component, OnInit} from '@angular/core';
import {SortCase, SortType} from "../../common/constants";
import {IButtle, IUser} from "../../common/interfaces";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-buttles-history-tab',
  templateUrl: './buttles-history-tab.component.html',
  styleUrls: ['./buttles-history-tab.component.scss']
})
export class ButtlesHistoryTabComponent implements OnInit {
  public user: IUser;
  public buttles: IButtle[]
  private sortType: string = SortType.ASK;
  private sortCase: string = SortCase.ALPHABET;

  constructor(
    private utils: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.user = this.utils.getUsers().find((user: IUser) => user.id === +this.utils.getCurrentUserId());
    this.buttles = this.user.buttles;
  }

  public sortByAlphabet(field: keyof IButtle) {
    this.setSortType();
    this.sortCase = SortCase.ALPHABET;
    const [increase, decrease] = this.sortType === SortType.ASK ? [1, -1] : [-1, 1];
    this.buttles.sort((buttleA: IButtle, buttleB: IButtle) => {
      return buttleA[field].toLowerCase() > buttleB[field].toLowerCase()
        ? increase
        : decrease;
    })
  }

  public sortByDate(): void {
    this.setSortType();
    this.sortCase = SortCase.DATE;
    const [increase, decrease] = this.sortType === SortType.ASK ? [1, -1] : [-1, 1];
    this.buttles.sort((buttleA: IButtle, buttleB: IButtle) => {
      const buttleADate = +buttleA.date;
      const buttleBDate = +buttleB.date;
      return buttleADate - buttleBDate > 0 ? increase : decrease;
    })
  }

  private setSortType(): void {
    this.sortType = this.sortType === SortType.ASK ? SortType.DESC : SortType.ASK;
  }
}
