import React from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends React.Component {

  handleClick = () => {
    console.log('handle click app:');
    this.props.dispatch( {type: 'test', payload: 'test info'} );
  }

  componentDidMount() {
    console.log(this.props)
  }// end componentDidMount

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Lamport Combine Logger
            </p>
            <br/>
            <button onClick={this.handleClick}>TEST Dispatch</button>
            <p>Reducer One: {this.props.reduxState.reducerOne} </p>
            <p>Reducer Two: {this.props.reduxState.reducerTwo} </p>
        </header>
      </div>
    );
  } // end render
}// end class

const putStateOnProps = (reduxState) => ({ reduxState });

export default connect(putStateOnProps)(App);
