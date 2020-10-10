import { MatButtonModule } from "@angular/material/button";
import { moduleMetadata } from "@storybook/angular";
import { HappyButtonComponent } from "./happy-button.component";

export default {
  title: "<%= classify(name) %> Component",
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
