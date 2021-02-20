import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsServiceService {
  private originalURL: string;
  private stitchedURL: string;
  private uploadedOnce: boolean;
  private apiData;

  constructor() {}

  setOriginalURL(val) {
    this.originalURL = val;
  }

  getOriginalURL() {
    return this.originalURL;
  }

  setStitchedURL(val) {
    this.stitchedURL = val;
  }

  getStitchedURL() {
    return this.stitchedURL;
  }

  setuploadedOnce(val) {
    this.uploadedOnce = val;
  }

  getuploadedOnce() {
    return this.uploadedOnce;
  }

  getApiData() {
    return this.apiData;
  }

  setApiData(val) {
    this.apiData = val;
    // timestamp_to_remove
  }
}
