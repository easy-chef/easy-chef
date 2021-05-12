import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Image, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Profiles } from '../../api/profile/Profile';
import MultiSelectField from '../forms/controllers/MultiSelectField';
// import TextField from '../forms/controllers/TextField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allUsers) => new SimpleSchema({
  profiles: { type: Array, label: 'profiles', optional: true },
  'profiles.$': { type: String, allowedValues: allUsers },
});

function getProfile(email) {
  const data = Profiles.collection.findOne({ email });
  return _.extend({ }, data);
}
/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.pfp.image} />
      <Card.Header>{props.pfp.name} {props.pfp.namme}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.pfp.owner}</span>
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
    this.state = { profiles: [] };
  }

  submit(data) {
    this.setState({ profiles: data.profiles || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allUsers = _.pluck(Profiles.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allUsers);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const emails = _.pluck(Profiles.collection.find({ pfp: { $in: this.state.profiles } }).fetch(), 'profile');
    const profileData = _.uniq(emails).map(email => getProfile(email));
    return (
      <Container id="filter-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='profiles' name='profiles' showInlineError={true} placeholder={'User'}/>
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
