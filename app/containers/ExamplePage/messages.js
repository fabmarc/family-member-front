/*
 * ExamplePage Messages
 *
 * This contains all the text for the ExamplePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ExamplePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ExamplePage container!',
  },
});
