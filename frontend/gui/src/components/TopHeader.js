import React from 'react';

import { PageHeader } from 'antd';

const TopHeader = (props) => {

  const getTitle = (location) => {
    if ( location.length > 1) {
      return location[1].toUpperCase() + location.slice(2);
    } else {
      return location.slice(1);
    }
  }

  const switchSubtitle = (title) => {
    switch (title) {
      case '/':
        return "Welcome Home!";
      case '/articles':
        return "Latest Musings";
      case '/login':
        return "Going to post something cool?"
      default:
        return "Copacetic";
    }
  }

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
