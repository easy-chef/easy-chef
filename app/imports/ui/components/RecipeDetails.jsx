import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders recipe details. See pages/ListStuff.jsx. */
class RecipeDetails extends React.Component {
  render() {
    return (
      <Container>

      </Container>
    );
  }
}

// Require a document to be passed to this component.
RecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RecipeDetails);
