import React, { Component } from 'react';
import './styles.css';
import marked, { Renderer } from 'marked'

const renderer = new marked.Renderer()

export default class Main extends Component {
    constructor() {
        super()
        this.state={
            input:'',
            markedInput: ''
        }
    }
    handleChange(e){
        const markedContent = marked(e.target.value)
        this.setState({
            input: e.target.value,
            markedInput: markedContent
        })
    }
    markedBox(){
        const renderer = new marked.Renderer();
        return (
            React.createElement("div", {
                dangerouslySetInnerHTML: {
                    __html: marked(this.state.markdown, { renderer: renderer })
                }    
            }));
    }
    render() {
        return (
            React.createElement('div', null,
                React.createElement(Editor, { //creates editor div
                    input: this.state.input,
                    onChange: this.handleChange.bind(this)
                }),
                React.createElement(Previewer, { //creates previewer
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