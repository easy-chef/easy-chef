import React from 'react';
import { Grid, Icon, Header, Image, Divider } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { height: '500px' };
    return (
      <div>
        <div className="easychef-landing-background">
          <Grid id="landing-page" container centered stackable columns={1} verticalAlign="middle" style={gridStyle}>

            <Grid.Column textAlign='center'>
              <Icon size="huge" name="food" inverted />
              <Header as='h1' inverted >Cook, Eat, Repeat</Header>
              <Header as='h3' inverted >EasyChef is the only site you will ever need to find simple yet amazing recipes</Header>
            </Grid.Column>

          </Grid>
        </div>
        <div>
          <Grid container verticalAlign='middle' centered columns={2} rows={3}>
            <Grid.Row>
              <Grid.Column>
                <div className="landing-text-dark">
                  <h2 className="landing-text-dark">User-Made Recipes</h2>
                  <p>This site lets users share their simple recipes so others can enjoy quick, easy, and cheap cuisine.</p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <Image src="https://openclipart.org/image/400px/253316" rounded size="small"/>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row>
              <Grid.Column>
                <Image src="https://openclipart.org/image/800px/154837" rounded size="small" floated="right"/>
              </Grid.Column>
              <Grid.Column>
                <div className="landing-text-dark">
                  <h2 className="landing-text-dark">Simple Recipes</h2>
                  <p>Enjoy home cooked meals without needing fancy utilities or expensive ingredients.</p>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Divider/>
            <Grid.Row>
              <Grid.Column>
                <div className="landing-text-dark">
                  <h2 className="landing-text-dark">Local Vendors</h2>
                  <p>The vendors on this site are within walking distance of the University of Hawaii at Manoa, so ingredients are never too far.</p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <Image src="https://openclipart.org/image/400px/313157" rounded size="small"/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Landing;
