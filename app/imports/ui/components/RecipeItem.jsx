import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RecipeItem extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.recipe.image} wrapped ui={false}/>
        <Card.Header>{this.props.recipe.name}</Card.Header>

      </Card>

    );
  }
}

// Require a document to be passed to this component.
RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RecipeItem);
