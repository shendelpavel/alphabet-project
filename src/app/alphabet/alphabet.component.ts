import { Component } from '@angular/core';
import LettersData from 'src/assets/letters-data.json';
interface Letter {
  id: number;
  name: string;
  transcription: string;
  letterImg: string;
  letterSound: string;
  previousLetterId: number;
  nextLetterId: number;
}

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
})
export class AlphabetComponent {
  public alphabet: Letter[] = LettersData;
}
