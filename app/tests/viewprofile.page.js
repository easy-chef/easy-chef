import { Selector } from 'testcafe';

class ViewProfilePage {
  constructor() {
    this.pageId = '#view-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const viewProfilePage = new ViewProfilePage();
