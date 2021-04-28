import React from 'react';
import { Header } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class ComingSoon extends React.Component {
  render() {
    return (
      <Header as="h2" textAlign="center" inverted>
        <p>This page is currently in development and is coming soon!</p>
      </Header>
    );
  }
}

export default ComingSoon;
