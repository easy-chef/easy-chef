import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, LongTextField, ListField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '../../api/recipe/Recipes';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';
import MultiSelectField from '../forms/controllers/MultiSelectField';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  recipeName: String,
  recipeAuthor: String,
  description: String,
  image: String,
  rating: Number,
  servings: Number,
  restrictions: Array,
  'restrictions.$': {
    type: String,
    allowedValues: ['gluten-free', 'lactose intolerance', 'vegetarian', 'no peanuts', 'none'],
    optional: true,
  },
  ingredients: Array,
  'ingredients.$': {
    type: String,
    label: 'ingredients',
    optional: false,
  },
  tools: Array,
  'tools.$': {
    type: String,
    label: 'tools',
    optional: false,
  },
  steps: Array,
  'steps.$': {
    type: String,
    label: 'steps',
    optional: false,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  lowestIngredients = (recipeIngredients) => {
    const ingredientList = _.map(recipeIngredients, (ingredient) => _.filter(VendorIngredients, (vendorIngredient) => vendorIngredient.ingredient === ingredient));
    const lowestPrices = _.map(ingredientList, function (eachIngredient) {
      return _.min(_.pluck(eachIngredient, 'price'));
    });
    console.log(lowestPrices);
    return _.reduce(lowestPrices, function (memo, num) { return memo + num; }, 0);
  }

  costUpdate = (totalCalculated) => {
    const total = totalCalculated;
    return total;
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { recipeName, recipeAuthor, description, image, rating, servings, restrictions, ingredients, tools, steps } = data;
    const recipeEmail = Meteor.user().username;
    const total = this.costUpdate(this.lowestIngredients(ingredients));
    Recipes.collection.insert({ recipeName, recipeAuthor, recipeEmail, description, image, total, rating, servings, restrictions, ingredients, tools, steps },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid id="add-recipe-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Recipe</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='add-recipe-name' name='recipeName'/>
                <TextField id='add-recipe-author' name='recipeAuthor'/>
              </Form.Group>
              <LongTextField id='add-recipe-description' name='description'/>
              <TextField id='add-recipe-image' name='image'/>
              <Form.Group widths={'equal'}>
                <NumField id='add-recipe-rating' name='rating' decimal={false} showInlineError={true} placeholder={'Select Rating'}/>
                <NumField id='add-recipe-servings' name='servings' decimal={false} showInlineError={true} placeholder={'Select Serving Amount'}/>
              </Form.Group>
              <MultiSelectField id='add-recipe-restriction' name='restrictions' showInlineError={true} placeholder={'Select restrictions (select "none" if there are no restrictions)'}/>
              <span>*Please capitalize and specify only the name of ingredient*</span>
              <ListField id='add-recipe-ingredients' name='ingredients'/>
              <ListField id='add-recipe-tools' name='tools'/>
              <span>*Be sure to mention the amount of a certain ingredient that is being used!*</span>
              <ListField id='add-recipe-steps' name='steps'/>
              <SubmitField id='submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddRecipe;
