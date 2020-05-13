import React from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends React.Component {

  handleClick = () => {
    console.log('handle click app:');
    this.props.dispatch( {type: 'test00', payload: 'test info'} );
  }

  componentDidMount() {
    console.log(this.props);
    this.props.dispatch( {type: 'FETCH_STARSHIPS'} );
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
            {/* <p>Ships: {this.props.reduxState.shipReducer}</p> */}
            <p>{JSON.stringify(this.props.reduxState.shipReducer)}</p>
        </header>
      </div>
    );
  } // end render
}// end class

const putStateOnProps = (reduxState) => ({ reduxState });

export default connect(putStateOnProps)(App);
