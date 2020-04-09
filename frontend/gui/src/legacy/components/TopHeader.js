import React from 'react';

import { PageHeader } from 'antd';

const TopHeader = (props) => {

  return (
    <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
      }}
      onBack={() => {props.history.goBack()}}
      title={getTitle(props.location.pathname)}
      subTitle={switchSubtitle(props.location.pathname)}
    />
  )
}

export default TopHeader;
