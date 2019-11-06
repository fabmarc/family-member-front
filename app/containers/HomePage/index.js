/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import PagePath from 'components/PagePath';
import LayoutWrapper from 'components/LayoutWrapper';

import messages from './messages';

const header = <FormattedMessage {...messages.header} />;

export function HomePage() {
  return (
    <LayoutWrapper>
      <PagePath header={header} />
    </LayoutWrapper>
  );
}

HomePage.propTypes = {};

export default memo(HomePage);
