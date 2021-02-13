import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  constructor() {}

  isOutputReady = false;

  ngOnInit(): void {}

  showOutput(val) {
    if (val) {
      this.isOutputReady = true;
    } else {
      this.isOutputReady = false;
    }
  }
}
