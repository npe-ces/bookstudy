import React from 'react';

const Post = ({match}) => {
  return (
    <p>
        포스트 #{match.param.id}
    </p>
  )
}

export default Post;