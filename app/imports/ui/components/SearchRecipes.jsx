import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment, Image, Header, Rating } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Link } from 'react-router-dom';
import { Recipes } from '../../api/recipe/Recipes';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  restrictions: { type: Array, label: 'Restrictions', optional: true },
  'restrictions.$': { type: String, allowedValues: ['gluten-free', 'lactose intolerance', 'vegetarian', 'no peanuts', 'vegan', 'kosher', 'halal', 'low-carbohydrates', 'none'] },
});

function getProfileData(recipeName) {
  const data = Recipes.collection.findOne({ recipeName });
  return _.extend({}, data);
}

/** Component for layout out a Recipe Card. */
const MakeCard = (props) => (
  <Card>
    <Image src={props.rpage.image}/>
    <Card.Content>
      <Card.Header>
        <Link id="view-individual-recipe" to={`/recipe/${props.rpage._id}`}>{props.rpage.recipeName}</Link>
      </Card.Header>
      <Card.Meta>
        <Header size='medium'>By {props.rpage.recipeAuthor} ({props.rpage.recipeEmail})</Header>
        <Card.Description>
          {props.rpage.description}
        </Card.Description>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Rating icon='star' defaultRating={props.rpage.averageRating} maxRating={5} disabled/>
    </Card.Content>
  </Card>
);

/** Properties */
MakeCard.propTypes = {
  rpage: PropTypes.object.isRequired,
};

/** Renders the Recipe Collection as a set of Cards. */
class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { restrictions: [] };
  }

  submit(data) {
    this.setState({ restrictions: data.restrictions || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const bridge = new SimpleSchema2Bridge(formSchema);
    const rnames = _.pluck(Recipes.collection.find({ restrictions: { $in: this.state.restrictions } }).fetch(), 'recipeName');
    const profileData = _.uniq(rnames).map(recipeName => getProfileData(recipeName));
    return (
      <Container id="search-recipe-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='restrictions' name='restrictions' showInlineError={true} placeholder={'Select Restrictions...'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(profileData, (rpage, index) => <MakeCard key={index} rpage={rpage}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of recipe documents in the props. */
Filter.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub2 = Meteor.subscribe(Recipes.allPublicationName);

  return {
    ready: sub2.ready(),
  };
})(Filter);
