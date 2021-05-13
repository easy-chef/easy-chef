import React from 'react';
import { Card, Header, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Recipe cards. See pages/ListRecipe.jsx. */
class Recipe extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.recipe.image}/>
        <Card.Content>
          <Card.Header>
            <Link id="view-individual-recipe" to={`/recipe/${this.props.recipe._id}`}>{this.props.recipe.recipeName}</Link>
          </Card.Header>
          <Card.Meta>
            <Header size='medium'>By {this.props.recipe.recipeAuthor} ({this.props.recipe.recipeEmail})</Header>
            <Card.Description>
              {this.props.recipe.description}
            </Card.Description>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Rating icon='star' defaultRating={this.props.recipe.averageRating} maxRating={5} disabled/>
        </Card.Content>
        <Card.Content extra>
          <Link id="view-edit-recipe" to={`/edit/${this.props.recipe._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Recipe);
