import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cors';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  public callServer(): void {
    this.http.post('/OutReport/ListJson/?firstload=0', {
        _search: false,
        nd: 1694335158190,
        rows: 100,
        page: 1,
        sidx: 'TrTime',
        sord: 'asc',
        Group: 'f2bc9cc1-b572-41c9-ac26-ccc46cd3e1e5',
        MachineID: '2309020065',
        IndexTime: '2023-09-08 00:00:00',
        LastTime: '2023-09-10 23:59:59'
      }
    ).subscribe((data) => console.log(data))
  }
}
