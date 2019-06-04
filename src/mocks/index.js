export const postMock = {
  data: {
    title: `This is the title`,
    name: 'test_post',
    author: `Author`,
    num_comments: "5",
    permalink: '/r/permalink',
    created_utc: 1559529564,
    thumbnail: '/test.jpg'
  }
}

export const redditResponse = {
  data: {
    data: {
      after: "test",
      before: "test2",
      children: [postMock]
    }
  }
}