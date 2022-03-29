import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { environmentProp } from '../../app.properties';

//import { GraphQLClient, gql } from 'graphql-request'

const bitQueryNetworkEthereum = 'ethereum';
export const bitQueryUrl = 'https://graphql.bitquery.io/';

export const headersGQL = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('X-API-KEY', environmentProp.bitApiKey);

export interface Transfer {
  date: {
    date: string;
  };
  amount: number;
  count?: number;
}

export interface InOut {
  ethereum: {
    transfers: Transfer[];
  };
}

export const variables = {
  limit: 10,
  offset: 0,
  network: 'ethereum',
  address: '{{address}}',
  currency: '',
  from: null,
  till: null,
  dateFormat: '%Y-%m'
};

@Injectable({
  providedIn: 'root'
})
export class StakeDaoGraphServices {
  documentOut = gql`
    query ($network: ${bitQueryNetworkEthereum}, $address: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
      ethereum(network: $network) {
        transfers(
          options: {limit: $limit, offset: $offset}
          date: {since: $from, till: $till}
          sender: {is: $address}
          amount: {gt: 0}
        ) {
          count
          date {
            date(format: "%Y-%m")
          }
          currency{symbol}
          amount
        }
      }
    }
  `;

  documentIn = gql`
  query ($network: ${bitQueryNetworkEthereum}, $address: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
    ethereum(network: $network) {
      transfers(
        options: {limit: $limit, offset: $offset}
        date: {since: $from, till: $till}
        receiver: {is: $address}
        amount: {gt: 0}
      ) {
        count
        date {
          date(format: "%Y-%m")
        }
        currency{symbol}
        amount
      }
    }
  }
`;
}
