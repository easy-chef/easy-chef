import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController, name, bio, image) {
    await this.isDisplayed(testController);
    await testController.typeText('#profile-name', name);
    await testController.typeText('#profile-bio', bio);
    await testController.typeText('#profile-image', image);
    await testController.click('#submit');
  }
}

export const editProfilePage = new EditProfilePage();
