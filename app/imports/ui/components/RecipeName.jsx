import React from 'react';
import { Card, Grid, Header, Icon, Image, Item, List, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders recipe name and additional info. See pages/IndividualRecipeDetails.jsx. */
class RecipeDetails extends React.Component {
  render() {
    return (
      <div className="recipe-background">
        <Grid container columns={2}>
          <Grid.Column>
            <div className="recipe-title">
              <Item>
                <Item.Content>
                  <Item.Header><Header as='h1' size='huge'>{this.props.recipe.recipeName}</Header></Item.Header>
                  <Item.Meta><Header size='medium'>By {this.props.recipe.recipeAuthor}</Header></Item.Meta>
                  <div className='recipe-description'>
                    <Item.Description>{this.props.recipe.description}</Item.Description>
                  </div>
                </Item.Content>
              </Item>
            </div>
          </Grid.Column>
          <Grid.Column>
            <Card centered>
              <Image alt="sample" src={this.props.recipe.image} size='medium' centered/>
              <Card.Content>
                <Rating icon='star' defaultRating={this.props.recipe.rating} maxRating={5}/>
              </Card.Content>
              <Card.Content extra>
                <Icon name='food'/>
                <List items={this.props.recipe.restrictions}/>
              </Card.Content>
              <Card.Content extra>
                <Icon name='dollar sign'/>
                {this.props.recipe.total}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require a document to be passed to this component.
RecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(RecipeDetails);
