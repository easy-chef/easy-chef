import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Users table. See pages/ViewUsers.jsx. */
class UserCard extends React.Component {
  render() {
    return (
      <Card centered>
        <img alt={'user image'} src={this.props.profile.image} height={250}/>
        <Card.Content>
          <Card.Header>{this.props.profile.name}</Card.Header>
          <Card.Description>
            {this.props.profile.bio}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
UserCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserCard);
