import { moduleMetadata } from '@storybook/angular';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

export default {
  title: '<%= classify(name) %> Component',
  component: <%= classify(name) %>Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [],
    }),
  ],
};

export const simple = () => ({
  component: <%= classify(name) %>Component,
  props: {},
});
