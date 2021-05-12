import React from 'react';
import { Card, Header, Icon, Image, List, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Recipe cards. See pages/ListRecipe.jsx. */
class Recipe extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.recipe.image}/>
        <Card.Content>
          <Card.Meta>
            <Header as='h1' size='huge'>{this.props.recipe.recipeName}</Header>
            <Header size='medium'>By {this.props.recipe.recipeAuthor}</Header>
            <span className='date'>{this.props.recipe.recipeEmail}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            {this.props.recipe.description}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header><Icon name='pencil alternate'/>Steps</Card.Header>
          <Card.Description>
            <List ordered items={this.props.recipe.steps}/>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Header><Icon name='utensil spoon'/>Tools</Card.Header>
          <Card.Description>
            <List bulleted items={this.props.recipe.tools}/>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name='dollar sign'/>
          {this.props.recipe.total}
        </Card.Content>
        <Card.Content extra>
          <Rating icon='star' defaultRating={this.props.recipe.rating} maxRating={5}/>
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
