import React from 'react';
import CanvasComponent from '../components/Canvas';
import '../components/Canvas.css';
import Typography from '@material-ui/core/Typography';

class Home extends React.Component {

  render() {
    return (
      <div className="home-container">
        <Typography className="title" align="center" variant="h1">Redon Xharja</Typography>
        <div className="leftExample">
          <CanvasComponent
            background="#fff"
            className="canvas-component"
            name="pts-tester"
            onAction={(space) => {space.bindMouse().bindTouch().play()}}
          />
        </div>
      </div>
    );
  }
}

export default Home;
