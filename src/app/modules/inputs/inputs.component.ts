import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConstantsServiceService } from 'src/app/shared/services/constants-service.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements OnInit {
  constructor(private constantsService: ConstantsServiceService) {}

  @Output() showOutputComponent = new EventEmitter<boolean>();
  uploadedOnce = false;
  isLoading = false;

  ngOnInit(): void {
    // this.uploadedOnce = true;
  }

  showUploadedOutput(val) {
    if (val) {
      this.showOutputComponent.emit(true);
      this.uploadedOnce = true;
    } else {
      this.showOutputComponent.emit(false);
    }
  }

  showRecoredOutput(val) {
    if (val) {
      this.showOutputComponent.emit(true);
      this.uploadedOnce = true;
    } else {
      this.showOutputComponent.emit(false);
    }
  }

  showLoader(val) {
    this.isLoading = val;
  }
}
