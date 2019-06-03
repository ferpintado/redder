import React from 'react'
import { render } from '@testing-library/react'
import Post from './Post'

describe('<Post /> spec', () => {
  test('it should render', () => {
    const post = {
      data: {
        title: "This is the title",
        author: "Author123",
        num_comments: "5",
        permalink: '/r/permalink',
        created_utc: 1559529564,
        thumbnail: '/test.jpg'
      }
    }

    const {getByTestId} = render(<Post data={post}/>);

    expect(getByTestId('post-title').textContent).toBe(post.data.title)
    expect(getByTestId('post-author').textContent).toBe("Author: " + post.data.author)
    expect(getByTestId('post-comments').textContent).toBe(post.data.num_comments + " comments")
    expect(getByTestId('post-timestamp').textContent).toBe("Posted on: " + new Date(post.data.created_utc * 1000).toString())
  });
});