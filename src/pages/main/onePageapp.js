import React, { Component } from 'react';
import './styles.css';
import marked, { Renderer } from 'marked'

const renderer = new marked.Renderer()

export default class Main extends Component {
    constructor() {
        super()
        this.state={
            input:'',
        }
    }
    handleChange(e){
        const markedContent = marked(e.target.value)
        this.setState({
            input: e.target.value,
        })
    }
    render() {
        return (
            React.createElement('div', null,
                React.createElement(Editor, { //creates editor div
                    id: 'editor',
                    input: this.state.input,
                    onChange: this.handleChange.bind(this)
                }),
                React.createElement(Previewer, { //creates previewer
                    id: 'previewer',
                    input: this.state.input
                }),
            )
        )
    }
}

const Editor = props =>{
    return (
        React.createElement('textarea',{
            id: 'editor',
            onChange:props.onChange,
            type: 'text',
            value: props.input
        })
    )
}
const Previewer = props =>{
    return (
        React.createElement('div',{
            id: 'previewer',
            dangerouslySetInnerHTML: {
                __html: marked(props.input, {renderer: renderer})
            }
        })
    )
}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));