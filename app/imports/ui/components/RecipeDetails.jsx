import React from 'react';
import { Grid, List, Divider, Card, Item, Icon, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders recipe details. See pages/IndividualRecipeDetails.jsx. */
class RecipeDetails extends React.Component {
  ratingState = {};

  handleRatingRate = ({ rating, maxRating }) => this.setState({ rating, maxRating })

  updateRatings = (inputRating) => {
    this.props.recipe.userRatings.insert(inputRating.rating);
    const ratingSum = _.reduce(this.props.recipe.rating, function (memo, num) { return memo + num; }, 0);
    const rating = ratingSum / this.props.recipe.userRatings.length;
    this.props.recipe.rating.update({ $set: { rating } });

  }

  render() {
    return (
      <div className="recipe-details">
        <Grid container row={3}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Card fluid color='black'>
                <Card.Content>
                  <Card.Header><Icon name='shopping basket'/>Ingredients</Card.Header>
                  <Card.Description>
                    <List bulleted items={this.props.recipe.ingredients}/>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Item as={NavLink} exact to="/inprogress"><Icon name='map'/>Locate ingredients</Item>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card fluid color='black'>
                <Card.Content>
                  <Card.Header><Icon name='utensil spoon'/>Tools</Card.Header>
                  <Card.Description>
                    <List bulleted items={this.props.recipe.tools}/>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Card fluid color='black'>
                <Card.Content>
                  <Card.Header><Icon name='pencil alternate'/>Steps</Card.Header>
                  <Card.Description>
                    <List ordered items={this.props.recipe.steps}/>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Card fluid color='black'>
                <Card.Content>
                  <Card.Header><Icon name='star'/>Rating</Card.Header>
                  <Card.Meta>Had a change to try out the recipe? Leave a rating below!</Card.Meta>
                  <Rating icon='star' maxRating={5} size='massive' className='rating-submit' onRate={this.handleRatingRate}/>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
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
