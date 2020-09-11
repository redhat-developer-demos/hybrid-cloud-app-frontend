import React from 'react';
import { Divider, Flex, FlexItem, Title, TitleSizes } from '@patternfly/react-core';

//Application 
import './App.css';
import MessageRequest from './components/MessageRequest'
import MessageResponse from './components/MessageResponse'
import MessageWorkers from './components/MessageWorkers'

const App = () => {

  return (
    <React.Fragment>
      <Title headingLevel="h1" size={TitleSizes['4xl']}>
        Hybrid Cloud Demo
      </Title>
      <Divider />
      <div id="-body-content">
        <MessageRequest />
      </div>
      <Divider />
      <Flex spaceItems={{ modifier: 'spaceItemsXl' }}>
        <FlexItem flex={{ default: 'flex_2' }}>
          <Title headingLevel="h1" size={TitleSizes['2xl']}>
            Responses
          </Title>
          <MessageResponse />
        </FlexItem>
        <Divider isVertical />
        <FlexItem>
          <Title headingLevel="h1" size={TitleSizes['2xl']}>
            Messages
          </Title>
          <MessageWorkers />
        </FlexItem>
      </Flex>
    </React.Fragment>
  );
}

export default App;
