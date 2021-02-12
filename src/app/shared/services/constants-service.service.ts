import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsServiceService {
  private originalURL: string;
  private stitchedURL: string;
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
}
