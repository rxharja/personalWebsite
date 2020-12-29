import React from 'react';
import CanvasComponent from '../components/Canvas';
import '../components/Canvas.css';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';


class Home extends React.Component {
  attributes = ['Bioinformatics', 'Machine Learning', 'Software Engineering']
  render() {
    return (
      <div className="home-container">
        <div className="title">
          <Typography align="center" variant="h1">Redon Xharja</Typography>
          <Fade in="true" timeout={{ enter: 1000, exit: 1000}} >
            <Typography align="center" variant="h4">Bioinformatics, Machine Learning, Software Engineering</Typography>
          </Fade>
        </div>
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
