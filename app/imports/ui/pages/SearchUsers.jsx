import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
// import swal from 'sweetalert';
import { Profiles } from '../../api/profile/Profile';
// import swal from 'sweetalert';
// import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
});

function getProfile(userName) {
  const data = Profiles.collection.findOne({ userName });
  const name = _.pluck(Profiles.collection.find({ pfp: userName }).fetch(), 'name');
  const bio = _.pluck(Profiles.collection.find({ pfp: userName }).fetch(), 'bio');
  const owner = _.pluck(Profiles.collection.find({ pfp: userName }).fetch(), 'owner');
  return _.extend({ }, data, { name, bio, owner });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header>{props.pfp.name}</Card.Header>
      <Card.Meta>
        {props.pfp.owner}
      </Card.Meta>
      <Card.Description>
        {props.pfp.bio}
      </Card.Description>
    </Card.Content>
  </Card>
);

/** Properties */
MakeCard.propTypes = {
  pfp: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: [] };
  }

  submit(data) {
    this.setState({ name: data.name || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const bridge = new SimpleSchema2Bridge(formSchema);
    const userNames = _.pluck(Profiles.collection.find({ user: this.state.name }).fetch(), 'name');
    const profileData = _.uniq(userNames).map(userName => getProfile(userName));
    return (
      <Container id="filter-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <TextField id='name' name='name' showInlineError={true} placeholder={'User'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(profileData, (pfp, index) => <MakeCard key={index} pfp={pfp}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Filter.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(Filter);
