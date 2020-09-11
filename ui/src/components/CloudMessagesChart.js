import React from 'react';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';

const CloudMessagesChart = ({ workerData }) => {
  return (
    <div style={{ height: '230px', width: '350px' }}>
      <ChartDonut
        ariaDesc="Processed Messages"
        ariaTitle="Responses"
        constrainToVisibleArea={true}
        data={workerData.data}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
        legendData={workerData.legendData}
        legendOrientation="vertical"
        legendPosition="right"
        padding={{
          bottom: 20,
          left: 20,
          right: 140, // Adjusted to accommodate legend
          top: 20
        }}
        subTitle="Processed Messages"
        title={workerData.title}
        themeColor={ChartThemeColor.multiOrdered}
        width={350}
      />
    </div>
  );
};

export default CloudMessagesChart;