import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features-dashboard',
  templateUrl: './features-dashboard.component.html',
  styleUrls: ['./features-dashboard.component.scss'],
})
export class FeaturesDashboardComponent implements OnInit {
  constructor() {}

  isActive = '';
  ngOnInit(): void {}

  showFeatureComponent(value) {
    this.isActive = value;
  }
}
