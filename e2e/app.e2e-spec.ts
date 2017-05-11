import { DynacompoexpPage } from './app.po';

describe('dynacompoexp App', () => {
  let page: DynacompoexpPage;

  beforeEach(() => {
    page = new DynacompoexpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
