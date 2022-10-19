import React, { useEffect, useRef } from 'react';
import {
  AndroidFilled,
  AppleFilled,
  WindowsFilled,
  ChromeFilled,
  GithubFilled,
  AliwangwangFilled,
  YoutubeFilled,
} from '@ant-design/icons';

import Flex from 'components/shared-components/Flex';
import { Card } from 'antd';

const iconConfigs = [
  {
    id: 1,
    x: 0,
    y: 0,
    icon: AndroidFilled,
    title: 'Диван',
  },
  {
    id: 2,
    x: 0,
    y: 0,
    icon: AppleFilled,
    title: 'стул',
  },
  {
    id: 3,
    x: 0,
    y: 0,
    icon: WindowsFilled,
    title: 'стол',
  },
  {
    id: 4,
    x: 0,
    y: 0,
    icon: ChromeFilled,
    title: 'кресло',
  },
  {
    id: 5,
    x: 0,
    y: 0,
    icon: GithubFilled,
    title: 'арбуз',
  },
  {
    id: 6,
    x: 0,
    y: 0,
    icon: AliwangwangFilled,
    title: 'банан',
  },
  {
    id: 7,
    x: 0,
    y: 0,
    icon: YoutubeFilled,
    title: 'кошка',
  },
];

const InfoSection = () => {
  return (
    <div className='w-50'>
      <div className='modals-section'>
        {iconConfigs.map((item) => (
          <div key={item.id} className='icon-section' id={item.id}>
            <div className='icon-section-wrapper'>
              <item.icon
                className='icons-section-icon'
                style={{ fontSize: '24px' }}
              />
            </div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MapSection = () => {
  return (
    <div className='w-50 board-wrapper'>
      <div className='board-header'>
        <span>Карта комнаты</span>
      </div>
      <div className='board-wrapper-playground'></div>
    </div>
  );
};

const Scheduler = () => {
  return (
    <Card>
      <Flex mobileFlex={false} justifyContent='space-between'>
        <InfoSection />
        <MapSection />
      </Flex>
    </Card>
  );
};

export default Scheduler;
