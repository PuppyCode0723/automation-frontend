import React, { Component } from 'react';

class HelloTitle extends Component {
    constructor(props) {
        super(props)
        this.state = (
            {
                clickCount: 0
            }
        )
        this.addCount = this.addCount.bind(this);
    }

    addCount() {
        console.log(this);
        this.setState({ clickCount: this.state.clickCount + 1 });
        console.log("Clicked");
    }

    render() {
        return <input type="button" onClick={this.addCount} value="Click me"></input>
    }
}

export default HelloTitle;