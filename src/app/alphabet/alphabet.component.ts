import { Component } from '@angular/core';
import * as AlphabetModule from 'src/assets/letters-data.json';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
})
export class AlphabetComponent {
  private alphabetModule = AlphabetModule;
  public alphabet = this.alphabetModule.alphabet;
}
