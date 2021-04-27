import { Selector } from 'testcafe';

class IndividualRecipePage {
  constructor() {
    this.pageId = '#individual-recipe';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(60000).expect(this.pageSelector.exists).ok();
  }
}

export const viewIndividualRecipePage = new IndividualRecipePage();
