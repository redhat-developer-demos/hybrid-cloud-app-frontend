import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
} from '@patternfly/react-table';
import { EmptyState, EmptyStateBody, Title, EmptyStateIcon, Pagination } from '@patternfly/react-core';
import FlagsIcon from '@patternfly/react-icons/dist/js/icons/messages-icon';
import styles from '@patternfly/react-styles/css/components/Table/table';

const RenderPagination = ({
  totalCount,
  page,
  perPage,
  handleSetPage,
  handlePerPageSelect }) => {
  return (<Pagination
    isCompact
    itemCount={totalCount}
    page={page}
    perPage={perPage}
    defaultToFullPage
    onSetPage={handleSetPage}
    onPerPageSelect={handlePerPageSelect}
    perPageOptions={[
      { title: "3", value: 3 },
      { title: "5", value: 5 },
      { title: "10", value: 10 },
      { title: "15", value: 15 },
      { title: '20', value: 20 }
    ]}
  />);
}
const ResponsesTable = ({ rows }) => {
  const defaultPerPage = 3;
  const columns = ['Response', 'Cloud'];
  const [perPage, setPerPage] = useState(defaultPerPage)
  const [pageRows, setPageRows] = useState(rows.slice(0, defaultPerPage))
  const [page, setPage] = useState(1)

  const handlePerPageSelect = (_evt, newPerPage, newPage, startIdx, endIdx) => {
    //console.log("handlePerPageSelect", rows)
    setPerPage(newPerPage);
    setPage(newPage);
    setPageRows(rows.slice(startIdx, endIdx));
  };

  const handleSetPage = (__evt, newPage, perPage, startIdx, endIdx) => {
    //console.log("handleSetPage", rows)
    setPage(newPage);
    setPageRows(rows.slice(startIdx, endIdx));
  };

  const currentRows = rows.map((row) => ({ cells: row.cells }));

  return (
    <React.Fragment>
      <RenderPagination
        totalCount={rows.length}
        page={page}
        perPage={perPage}
        handlePerPageSelect={handlePerPageSelect}
        handleSetPage={handleSetPage}
      />
      <Table aria-label="Responses" cells={columns} rows={currentRows}>
        <TableHeader className={styles.modifiers.nowrap} />
        <TableBody />
      </Table>
      {pageRows.length <= 0 &&
        <EmptyState>
          <EmptyStateIcon icon={FlagsIcon} />
          <Title headingLevel="h2" size="lg">
            No messages.
        </Title>
          <EmptyStateBody>
            No messages yet, use "Send Request" above to send one.
        </EmptyStateBody>
        </EmptyState>
      }
    </React.Fragment>
  );
}

export default ResponsesTable;