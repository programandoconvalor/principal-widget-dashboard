import { newSpecPage } from '@stencil/core/testing';
import { WidgetDashboard } from '../widget-dashboard';

describe('widget-dashboard', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WidgetDashboard],
      html: `<widget-dashboard></widget-dashboard>`,
    });
    expect(page.root).toEqualHtml(`
      <widget-dashboard>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </widget-dashboard>
    `);
  });
});
