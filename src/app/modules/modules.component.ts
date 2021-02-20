import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  constructor() {}

  isOutputReady = false;
  uploadedOnce = false;

  ngOnInit(): void {
    // this.isOutputReady = true;
    // this.uploadedOnce = true;
  }

  showOutput(val) {
    if (val) {
      this.isOutputReady = true;
      this.uploadedOnce = true;
    } else {
      this.isOutputReady = false;
    }
  }
}
