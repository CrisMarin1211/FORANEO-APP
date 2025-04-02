import React from 'react';
import { Flex, Progress } from 'antd';
const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};
const conicColors = {
  '0%': '#87d068',
  '50%': '#ffe58f',
  '100%': '#ffccc7',
};
const ProgressBar = () => (
  <Flex vertical gap="middle">
    <Progress percent={29.9} strokeColor={twoColors} />

  </Flex>
);
export default ProgressBar;