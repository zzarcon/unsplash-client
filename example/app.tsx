import * as React from 'react';
import {Component} from 'react';
import {GHCorner} from 'react-gh-corner';
import {AppWrapper} from './styled';
import Unsplash from '../src';

export interface AppState {
  
}

const repoUrl = 'https://github.com/zzarcon/unsplash-client';
const accessKey = '';
const client = new Unsplash(accessKey);

export default class App extends Component <{}, AppState> {
  state: AppState = {
    
  }

  async componentDidMount() {
    const response = await client.search('skateboarding');

    console.log(response);
  }

  render() {
    return (
      <AppWrapper>
        <GHCorner openInNewTab href={repoUrl} />
      </AppWrapper>
    )
  }
}