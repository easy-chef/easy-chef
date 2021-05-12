import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Search } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Recipes } from '../../api/recipe/Recipes';
import Recipe from '../components/Recipe';

const source = _.times(5, () => ({
  recipeName: Recipes.recipeName(),
  description: Recipes.description(),
  image: Recipes.image(),
}));

const initialState = {
  loading: false,
  results: [],
  value: '',
};

function exampleReducer(state, action) {
  switch (action.type) {
  case 'CLEAN_QUERY':
    return initialState;
  case 'START_SEARCH':
    return { ...state, loading: true, value: action.query };
  case 'FINISH_SEARCH':
    return { ...state, loading: false, results: action.results };
  case 'UPDATE_SELECTION':
    return { ...state, value: action.selection };

  default:
    throw new Error();
  }
}

function SearchExampleStandard() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result) => re.test(result.title);

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);
  /** Renders a table containing all of the Recipe documents. */
  class SearchRecipe extends React.Component {

    //  findRecipe(recipeName, searchString) {
    //   return recipeName.toLowerCase().substr(0, searchString.length).includes(searchString.toLowerCase());
    //  }

    //  searchResult = Recipes.filter(i => this.findRecipe(i.recipeName, '<search_string>'))

    // If the subscription(s) have been received, render the page, otherwise show a loading icon.
    render() {
      return (this.props.ready) ? this.renderPage() : <Loader active>Getting recipes</Loader>;
    }

    renderPage() {
      return (
        <Container id="Search-recipes">
          <Search
            loading={loading}
            onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.recipeName })
            }
            onSearchChange={handleSearchChange}
            results={results}
            value={value}
          />
          <Header as="h2" textAlign="center" inverted>Searched Recipe List</Header>
          <Card.Group>
            {this.props.recipes.map((recipe, index) => <Recipe key={index} recipe={recipe}/>)}
          </Card.Group>
        </Container>
      );
    }
  }

  // Require an array of Recipe documents in the props.
  SearchRecipe.propTypes = {
    recipes: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
  };
}

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
})(SearchExampleStandard);
