import React, { Component } from 'react'

export default class AsyncSplitMe extends Component {
    state = {
        SplitMe: null
    }
    loadSplitMe = () => {
        //비동기적으로 코드를 불러옴. 함수는 Promise를 결과로 반환.
        //import()는 모듈의 전체 네임스페이스를 불러오므로, default를 직접 지정해야함.
        import('./SplitMe').then(({ default: SplitMe }) => {
            this.setState({
                SplitMe
            });
        });
    }
    render() {
        const { SplitMe } = this.state;
        //SplitMe가 있으면 이걸 랜더하고, 없으면 버튼을 랜더
        return (SplitMe ? <SplitMe /> :
            <button onClick={this.loadSplitMe}>SplitMe 로딩</button>
        )
    }
}
