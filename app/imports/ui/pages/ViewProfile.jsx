import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
import { Profiles } from '../../api/profile/Profile';

/** Renders a table containing all of the Profile documents. */
class ViewProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Grid id="view-profile" container>
        {this.props.profiles.map((profile, index) => <Profile key={index}
          profile={profile}/>)}
      </Grid>
    );
  }
}

// Require an array of Profile documents in the props.
ViewProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  return {
    profiles: Profiles.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ViewProfile);
