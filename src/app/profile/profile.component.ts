import { Component, OnInit } from '@angular/core';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

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

  private id: number;

  constructor(private apollo: Apollo) {
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

}
