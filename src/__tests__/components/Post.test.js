import React from 'react'
import { render } from '@testing-library/react'
import Post from '../../components/Post'
import { postMock } from '../mocks'

describe('<Post /> spec', () => {
  test('it should render', () => {
    const post = postMock;
    const {getByTestId} = render(<Post data={post}/>);

    expect(getByTestId('post-title').textContent).toBe(post.data.title)
    expect(getByTestId('post-author').textContent).toBe("Author: " + post.data.author)
    expect(getByTestId('post-comments').textContent).toBe(post.data.num_comments + " comments")
    expect(getByTestId('post-timestamp').textContent).toBe("Posted on: " + new Date(post.data.created_utc * 1000).toString())
  });
});