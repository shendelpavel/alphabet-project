import { Component } from "@angular/core";

import LettersData from "src/assets/letters-data.json";

import { Letter } from "../services/shared/letter.model";

@Component({
  selector: "ap-alphabet",
  templateUrl: "./alphabet.component.html",
  styleUrls: [ "./alphabet.component.scss" ]
})
export class AlphabetComponent {
  public alphabet: Letter[] = LettersData;
}
