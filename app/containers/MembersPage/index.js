/**
 *
 * MembersPage
 *
 */

import React, { memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import pageContainer, { useLoadableContainer } from 'utils/pageContainer';
import LayoutWrapper from 'components/LayoutWrapper';
import PagePath from 'components/PagePath';

import { makeSelectMembers, makeSelectPagination } from './selectors';
import { loadMembersAction } from './actions';
import messages from './messages';
import DataTable from './table';
import Filter from './filter';
import reducer from './reducer';
import saga from './saga';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name', render: (value, column, row) => `${row.last_name}, ${row.first_name}` },
  { id: 'birthdate', label: 'Birthdate', render: (value, column, row) => moment(value).format('L') },
  { id: 'family', label: 'Family', render: (value, column, row) => `${row.family_id} - ${row.family.name}` },
];

const breadcrumbs = [{ label: 'Home', to: '/'}];
const header = <FormattedMessage {...messages.header} />;

export function MembersPage({ dispatch, message, members, pagination }) {
  const [Loadable, trackPromise] = useLoadableContainer();
  useInjectReducer({ key: 'membersPage', reducer });
  useInjectSaga({ key: 'membersPage', saga });

  const loadMembers = page => {
    trackPromise(
      dispatch(loadMembersAction(page)).catch(error => {
        message.error(error.message);
      }),
    );
  };

  const handleChangePage = (event, newPage) => {
    loadMembers(newPage + 1);
  };

  const handleSearch = () => {
    loadMembers();
  };

  return (
    <LayoutWrapper>
      <PagePath
        header={header}
        pages={breadcrumbs}
      />
      <Loadable>
        <Filter fields={columns} onSearch={handleSearch} />
        <DataTable
          rows={members}
          columns={columns}
          pagination={pagination}
          onChangePage={handleChangePage}
        />
      </Loadable>
    </LayoutWrapper>
  );
}

MembersPage.propTypes = {
  message: PropTypes.object,
  dispatch: PropTypes.func,
  members: PropTypes.array,
  pagination: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  members: makeSelectMembers(),
  pagination: makeSelectPagination(),
});

const withPageContainer = pageContainer(mapStateToProps);

export default compose(
  withPageContainer,
  memo,
)(MembersPage);
