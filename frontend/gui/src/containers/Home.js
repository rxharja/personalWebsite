import React from 'react';
import CanvasComponent from '../components/Canvas';
import '../components/Canvas.css';


class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="leftExample">
          <CanvasComponent background="#000" name="pts-tester" style={{opacity: 0.95}} />
          <div className="label">
            <h1>Redon Xharja</h1>
            <h2>Full Stack / Bioinformatics</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
