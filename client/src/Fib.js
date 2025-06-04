import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            seenIndexes: seenIndexes.data
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });

        this.setState({ index: '' });
        this.fetchValues();
        this.fetchIndexes();
    }

    render() {
        return (
            <div>
                <h1>Fibonacci Calculator</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input
                        type="number"
                        value={this.state.index}
                        onChange={e => this.setState({ index: e.target.value })}
                    />
                    <button>Submit</button>
                </form>
                <h2>Indexes I have seen:</h2>
                <ul>
                    {this.state.seenIndexes.map(({ number }) => (
                        <li key={number}>{number}</li>
                    ))}
                </ul>
                <h2>Calculated Values:</h2>
                <ul>
                    {Object.entries(this.state.values).map(([key, value]) => (
                        <li key={key}>
                            For index {key}, I calculated {value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Fib;