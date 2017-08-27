import { SvgdemoPage } from './app.po';

describe('svgdemo App', () => {
  let page: SvgdemoPage;

  beforeEach(() => {
    page = new SvgdemoPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
