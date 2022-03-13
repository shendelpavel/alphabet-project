import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

interface DialogData {
  type: string;
  title: string;
  description: string;
  inputData: string;
}
@Component({
  selector: "ap-dialog-input",
  templateUrl: "./dialog-input.html"
})
export class DialogInputComponent {
  public outputData?: string;

  constructor(
    public readonly dialogRef: MatDialogRef<DialogInputComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data?: DialogData
  ) {
    this.outputData = this.data?.inputData;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
