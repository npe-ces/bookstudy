import React, { Component } from 'react';
import EditorHeader from 'components/editor/EditorHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import *as editorAction from 'store/modules/editor';


class EditorHeaderContainer extends Component {

    componentDidMount() {
        const { EditorActions } = this.props;
        EditorActions.initialize(); //에디터를 초기화함
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    handleSubmit = async () => {
        const { title, markdown, tags, EditorActions, history } = this.props;
        const post = {
            title,
            body: markdown,
            //태그텍스트를 ,로 분리시키고 앞뒤 공백을 지운 후 중복값 제거
            tags: tags === " " ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
        };
        try {
            await EditorActions.writePost(post);
            //페이지를 이동시킵니다.
            //주의 : Postid는 위쪽에서 레퍼런스를 만들지 않고 이 자리에서
            //this.porps.postId를 조회해야 합니다(현재값을 불러오기 위해)
            history.push(`/post/${this.props.postId}`);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { handleGoBack, handleSubmit } = this;
        return (
            <EditorHeader
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags'),
        postId: state.editor.get('postId')
    }),
    (dispatch) => (
        {
            EditorActions: bindActionCreators(editorAction, dispatch)
        }
    )
)(withRouter(EditorHeaderContainer))