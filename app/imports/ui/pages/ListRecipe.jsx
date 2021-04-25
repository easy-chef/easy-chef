import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Search } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
// import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipes';
import Recipe from '../components/Recipe';

/* const initialState = {
  loading: false,
  results: [],
  value: '',
}; */

/* function filter(state, action) {
  switch (action.type) {
  case 'CLEAR':
    return initialState;
  case 'START_SEARCH':
    return { ...state, loading: true, value: action.query };
  case 'COMPLETE_SEARCH':
    return { ...state, loading: false, results: action.results };
  case 'UPDATE_SELECTION':
    return { ...state, value: action.selection };
  default:
    throw new Error();
  }
} */

/** Renders a table containing all of the Recipe documents. Use <Recipe> to render each row. */
class ListRecipe extends React.Component {

  /*
  filter(state, action) {
    switch (action.type) {
    case 'CLEAR':
      return initialState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'COMPLETE_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };
    default:
      throw new Error();
    }
  }

  search() {
    const [state, dispatch] = React.useReducer(filter, initialState);
    const { loading, results, value } = state;
    const timeout = React.useRef();
    const searchStates = React.useCallback((e, data) => {
      clearTimeout(timeout.current);
      dispatch({ type: 'START_SEARCH', query: data.value });
      timeout.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: 'CLEAR' });
        }

        const reg = new RegExp(_.escapeRegExp(data.value), 'i');
        const matchedRecipe = (recipe) => reg.test(recipe.recipeName);
        dispatch({
          type: 'COMPLETE_SEARCH',
          results: _.filter(this.props.recipes, matchedRecipe),
        });
      }, 300);
    }, []);
    React.useEffect(() => () => {
      clearTimeout(timeout.current);
    }, []);

  }
*/

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Contacts</Header>
        <Search className="search-recipe"/>
        <Card.Group>
          {this.props.recipes.map((recipe, index) => <Recipe key={index} recipe={recipe}/>)}
        </Card.Group>
      </Container>
    );
  }
}
// Require an array of Stuff documents in the props.
ListRecipe.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Recipes.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const recipes = Recipes.collection.find({}).fetch();
  return {
    recipes,
    ready,
  };
})(ListRecipe);
