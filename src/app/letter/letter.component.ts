import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { find } from "lodash";

import LettersData from "src/assets/letters-data.json";

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
  selector: "ap-letter",
  templateUrl: "./letter.component.html",
  styleUrls: [ "./letter.component.scss" ]
})
export class LetterComponent implements OnInit {
  public alphabet: Letter[] = LettersData;
  public letter?: Letter = {
    id: 0,
    name: "",
    transcription: "",
    letterImg: "",
    letterSound: "",
    previousLetterId: 0,
    nextLetterId: 0
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      const letterIdFromRoute = Number(routeParams[ "id" ]);
      this.letter = find(
        this.alphabet,
        letter => letter.id === letterIdFromRoute
      );
    });
  }

  public previousLetter(): void {
    this.router.navigate([ "alphabet/letter", this.letter?.previousLetterId ]);
  }

  public nextLetter(): void {
    this.router.navigate([ "alphabet/letter", this.letter?.nextLetterId ]);
  }
}
