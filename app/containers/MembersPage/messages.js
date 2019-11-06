/*
 * MembersPage Messages
 *
 * This contains all the text for the MembersPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MembersPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Members',
  },
  newMember: {
    id: `${scope}.newMember`,
    defaultMessage: 'New Member',
  },
});
