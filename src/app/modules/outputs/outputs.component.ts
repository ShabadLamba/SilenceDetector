import { Component, OnInit } from '@angular/core';
import { RestApiService } from './../../shared/services/rest-api.service';
@Component({
  selector: 'app-outputs',
  templateUrl: './outputs.component.html',
  styleUrls: ['./outputs.component.scss'],
})
export class OutputsComponent implements OnInit {
  response_text: string;
  api_url = 'https://dev.imibot.ai/silence/helloworld';
  constructor(private restApi: RestApiService) {}

  ngOnInit(): void {}

  getHelloWorld() {
    this.restApi.getHelloWorld(this.api_url).subscribe((response) => {
      this.response_text = response.response;
    });
  }
}
