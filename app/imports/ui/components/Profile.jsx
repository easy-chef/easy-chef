import React from 'react';
import { Image, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Column width={5}>
          <Image src={this.props.profile.image} size='medium' rounded />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1" inverted>
            {this.props.profile.name}
          </Header>
          <Header as="h3" inverted>
            {this.props.profile.bio}
          </Header>
        </Grid.Column>
      </Grid.Row>

    );
  }
}

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);
