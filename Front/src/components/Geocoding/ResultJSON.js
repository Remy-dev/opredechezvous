// ./src/ResultJSON.js
import React, { Component } from 'react';
class ResultJSON extends Component {
  render() {
    return (
      <article className="message">
        <div className="message-body">
          <pre>{JSON.stringify(this.props.response, null, 2)}</pre>
        </div>
      </article>
    );
  }
}
export default ResultJSON;
