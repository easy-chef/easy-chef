import { Selector } from 'testcafe';

class AddRecipePage {
  constructor() {
    this.pageId = '#add-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addRecipe(testController, recipeName, recipeAuthor, description, image, servings, ingredients, tools, steps) {
    await this.isDisplayed(testController);
    await testController.typeText('#add-recipe-name', recipeName);
    await testController.typeText('#add-recipe-author', recipeAuthor);
    await testController.typeText('#add-recipe-description', description);
    await testController.typeText('#add-recipe-image', image);
    await testController.typeText('#add-recipe-servings', servings);
    await testController.click('#add-recipe-restriction');
    await testController.click('#gluten-free');
    await testController.click('#vegetarian');
    await testController.click('#add-recipe-restriction');
    await testController.click('#uniforms-0001-0007');
    await testController.typeText('#add-recipe-ingredients', ingredients);
    await testController.click('#uniforms-0001-000a');
    await testController.typeText('#add-recipe-tools', tools);
    await testController.click('#uniforms-0001-000d');
    await testController.typeText('#add-recipe-steps', steps);
    await testController.click('#submit');
  }
}

export const addRecipePage = new AddRecipePage();
