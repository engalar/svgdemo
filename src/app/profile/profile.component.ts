import {Component, OnInit, ViewChild} from '@angular/core';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// We use the gql tag to parse our query string into a query document
const CurrentUserForProfile = gql`
  query CurrentUserForProfile {
    owner(id: 1) {
    id
    address
  }
  }
`;

interface QueryResponse {
  loading: boolean
  owner: {
    id: number
    address: string
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  address: string;

  id = 3;
  @ViewChild('fileInput') fileInput;

  constructor(private apollo: Apollo, private  http: HttpClient) {
  }

  ngOnInit() {
    this.loading = true;
    this.apollo.watchQuery<QueryResponse>({
      query: CurrentUserForProfile
    }).subscribe((respon) => {
      const data = respon.data;
      this.loading = respon.loading;

      this.id = data.owner.id;
      this.address = data.owner.address;
    });
  }

  startDrag(event) {
    console.log(event);
  }

  onDrop(event) {
    console.log(event);
  }

  dragenterEvent(event) {
    console.log(event);
  }

  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('image', fileBrowser.files[0]);

      this.http
        .post('/api/items/add', formData, {
          headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
        })
        .subscribe(data => console.log(data));
    }
  }
}
