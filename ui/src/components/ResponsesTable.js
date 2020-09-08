import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
} from '@patternfly/react-table';
import { EmptyState, EmptyStateBody, Title, EmptyStateIcon } from '@patternfly/react-core';
import FlagsIcon from '@patternfly/react-icons/dist/js/icons/messages-icon';
import styles from '@patternfly/react-styles/css/components/Table/table';

const ResponsesTable = ({ rows }) => {
  const columns = ['Response', 'Cloud'];
  return (
    <React.Fragment>
      <Table aria-label="Responses" cells={columns} rows={rows}>
        <TableHeader className={styles.modifiers.nowrap} />
        <TableBody />
      </Table>
      {rows.length <= 0 &&
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