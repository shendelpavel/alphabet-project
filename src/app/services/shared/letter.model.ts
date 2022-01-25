export interface Letter {
  id: number;
  name: string;
  transcription: string;
  letterImg: string;
  letterSound: string;
  previousLetterId: number;
  nextLetterId: number;
}
