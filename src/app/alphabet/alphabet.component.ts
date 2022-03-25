import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetComponent implements OnInit {
  public alphabet: string[] = [];
  public isOpened: boolean = false;
  public selectedLetter: string = 'A';
  @Output() onSelect = new EventEmitter<string>();

  ngOnInit(): void {
    this.createAlphabetList();
  }

  public selectLetter(letter: string) {
    this.selectedLetter = letter;
    this.isOpened = !this.isOpened;
    this.onSelect.emit(letter);
  }

  private createAlphabetList(): void {
    for (let i = 65; i <= 90; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
  }

  public trackLetter(index: number, letter: string) {
    return letter;
  }

}
