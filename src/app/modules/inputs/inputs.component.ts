import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
  constructor() {}

  @Output() showOutputComponent = new EventEmitter<boolean>();

  ngOnInit(): void {}

  showUploadedOutput(val) {
    if (val) {
      this.showOutputComponent.emit(true);
    } else {
      this.showOutputComponent.emit(false);
    }
  }

  showRecoredOutput(val) {
    if (val) {
      this.showOutputComponent.emit(true);
    } else {
      this.showOutputComponent.emit(false);
    }
  }
}
