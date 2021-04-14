import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="easychef-landing-background">
        <Grid container centered stackable columns={3}>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="users" inverted />
            <Header as='h1' inverted >User-Made Recipes</Header>
            <Header as='h3' inverted >This site lets users share their
              simple recipes so others can enjoy quick, easy, and
              cheap cuisine.</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="file alternate" inverted />
            <Header as='h1' inverted >Simple Recipes</Header>
            <Header as='h3' inverted >Enjoy home cooked meals without
              needing fancy utilities or expensive ingredients.</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="shopping cart" inverted />
            <Header as='h1' inverted >Local Vendors</Header>
            <Header as='h3' inverted >The vendors on this site are within
              walking distance of the University of Hawaii at Manoa, so
              ingredients are never too far.</Header>
          </Grid.Column>

        </Grid>
      </div>
    );
  }
}

export default Landing;
