import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { Observable } from 'rxjs';

const url = 'http://localhost:8000/upload';
const url2 = 'https://dev.imibot.ai/silence/detect';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  error = false;

  upload(
    files: Set<File>
  ): {
    [key: string]: {
      progress: Observable<number>;
    };
  } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach((file) => {
      // create a new multipart-form for every file
      // debugger;
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // console.log(formData.get(file))
      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true,
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(
        (event) => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            // calculate the progress percentage
            const percentDone = Math.round((100 * event.loaded) / event.total);

            // pass the percentage into the progress-stream
            progress.next(percentDone);
          } else if (event instanceof HttpResponse) {
            // Close the progress-stream if we get an answer form the API
            // The upload is complete
            progress.complete();
          }
        },
        (error) => {
          error = true;
          console.log('ERROR');
        }
      );

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable(),
      };
    });

    // return the map of progress.observables
    return status;
  }

  uploadWithoutProgress(files: Set<File>): HttpRequest<any> {
    let req;
    files.forEach((file) => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      req = new HttpRequest('POST', url2, formData);
    });
    return req;
  }
}
