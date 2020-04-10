import React from 'react';
import CanvasComponent from '../components/Canvas';
import '../components/Canvas.css';
import Typography from '@material-ui/core/Typography';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Typography className="title">Redon Xharja</Typography>
        <div className="leftExample">
          <CanvasComponent
            background="#fff"
            name="pts-tester"
            style={{opacity: 0.95}}
            onAction={(space) => {space.bindMouse().bindTouch().play()}}
             />
        </div>
      </div>
    );
  }
}

export default Home;
