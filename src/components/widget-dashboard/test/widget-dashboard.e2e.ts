import { newE2EPage } from '@stencil/core/testing';

describe('widget-dashboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<widget-dashboard></widget-dashboard>');

    const element = await page.find('widget-dashboard');
    expect(element).toHaveClass('hydrated');
  });
});
