import React from 'react';
import Post from '../components/Post';

import {posts} from '../models/sample.js';
export default class Home {
  render() {
    return (
      <div>
        <h2>The Homepage</h2>
          {posts.map( (p, index) =>
            <Post key={index} title={p.title} desc={p.desc} horizontal={p.horizontal} child={p.child}></Post>
          )}
      </div>
    );
  }
}
