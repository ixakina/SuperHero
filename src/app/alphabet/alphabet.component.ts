import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss']
})
export class AlphabetComponent implements OnInit {
  public alphabet: string[] = [];
  public isOpened: boolean = false;
  @ViewChild('filter') searchBtn: ElementRef;
  @Output() onSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  this.createAlphabetList();
  }

  public selectLetter(letter: string) {
    this.searchBtn.nativeElement.textContent = letter;
    this.isOpened = !this.isOpened;
    this.onSelect.emit(letter);
  }

  private createAlphabetList() {
    for (let i = 65; i <=90; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
  }

}
