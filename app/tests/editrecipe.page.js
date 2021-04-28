import { Selector } from 'testcafe';

class EditRecipePage {
  constructor() {
    this.pageId = '#edit-recipe';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editRecipe(testController, recipeName, description, image, total, servings, ingredients, tools, steps) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit-recipe-name', recipeName);
    await testController.typeText('#edit-recipe-description', description);
    await testController.typeText('#edit-recipe-image', image);
    await testController.typeText('#edit-recipe-total', total);
    await testController.typeText('#edit-recipe-servings', servings);
    await testController.click('#edit-recipe-restrictions');
    await testController.click('#vegetarian');
    await testController.click('#edit-recipe-restrictions');
    await testController.click('#uniforms-0000-000a');
    await testController.click('#uniforms-0000-0007');
    await testController.typeText('#uniforms-0000-0023', ingredients);
    await testController.click('#uniforms-0000-0015');
    await testController.click('#uniforms-0000-0012');
    await testController.typeText('#uniforms-0000-0027', tools);
    await testController.click('#uniforms-0000-001k');
    await testController.click('#uniforms-0000-001h');
    await testController.typeText('#uniforms-0000-002b', steps);
    await testController.click('#submit');
    await testController.click('#submit');
  }
}

export const editRecipePage = new EditRecipePage();
