/**
 *
 * Asynchronously loads the component for MembersPage
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoaderIndicator from 'components/LoaderIndicator';

export default loadable(() => import('./index'), {
  fallback: <LoaderIndicator />,
});
