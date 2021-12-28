import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'SeabedUI',
  brandUrl: "https://www.seabed.ui"
});

addons.setConfig({
    theme
})