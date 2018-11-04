import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from 'components/list/ListWrapper';
import PostList from 'components/list/PostList';
import Pagenation from 'components/list/Pagenation';

const ListPage = () => {
  return (
    <PageTemplate>
      <ListWrapper>
        <PostList/>
        <Pagenation/>
      </ListWrapper>
    </PageTemplate>
  )
}

export default ListPage
