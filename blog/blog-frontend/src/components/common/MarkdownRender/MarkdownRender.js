import React, { Component } from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';

import marked from 'marked';

const cx = classNames.bind(styles);

class MarkdownRender extends Component {

    state = {
        html: ''
    }

    renderMarkdown = () => {
        const { markdown } = this.props;
        //마크다운이 존재하지 않으면 공백처리
        if (!markdown) {
            this.setState({ html: '' });
            return;
        }
        this.setState({
            html: marked(markdown, {
                breaks: true,
                sanitize: true // 마쿠다운 내부 html 무시
            })
        });
    }

    constructor(props) {
        super(props);
        const { markdown } = props;
        //서버사이드 랜더링에서도 마크다운 처리가 되도록 constructor쪽에서도 구현함
        this.state = {
            html: markdown ? marked(props.markdown, { breaks: true, sanitize: true }) : ''
        }
    }

    componentDidUpdate(prevProps,prevState){
        //마크다운 값이 변경되면 renderMarkdown을 호출
        if(prevProps.markdown !== this.props.markdown){
            this.renderMarkdown();
        }
    }

    render() {
        const {html} = this.state;

        //react에서 html을 랜더때릴거면 객체를 만들어 내부에 __html값을 설정해야함
        const markup = {
            __html : html
        };

        //그리고 dangerouslySetInnerHTML에 해당 객체를 넣어주면 된다.        
        return (
            <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/>
        )
    }
}
export default MarkdownRender;