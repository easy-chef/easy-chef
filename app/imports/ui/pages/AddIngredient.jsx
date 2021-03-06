import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { VendorIngredients } from '../../api/vendor/VendorIngredient';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  ingredient: String,
  price: Number,
  size: String,
  quantity: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddIngredient extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { ingredient, price, size, quantity } = data;
    const owner = Meteor.user().username;
    VendorIngredients.collection.insert({ ingredient, price, size, quantity, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Ingredient added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid id="add-ingredient" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Ingredient</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='add-ingredient-ingredient' name='ingredient'/>
              <TextField id='add-ingredient-price' name='price' iconLeft="dollar"/>
              <TextField id='add-ingredient-size' name='size' placeholder="Please enter a number followed by the unit of measurement. Example: 3 oz"/>
              <NumField id='add-ingredient-quantity' name='quantity' decimal={false}/>
              <SubmitField id='submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddIngredient;
