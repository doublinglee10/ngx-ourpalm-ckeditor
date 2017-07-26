import { NgxOurpalmCkeditorPage } from './app.po';

describe('ngx-ourpalm-ckeditor App', () => {
  let page: NgxOurpalmCkeditorPage;

  beforeEach(() => {
    page = new NgxOurpalmCkeditorPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
