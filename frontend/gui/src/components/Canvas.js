import {PtsCanvas } from 'react-pts-canvas'
import { Create, Group, Line } from 'pts/dist/es5'


class CanvasComponent extends PtsCanvas {


    constructor() {
      super();
      this.pts = new Group();
    }

    _create() {
      this.pts = Create.distributeRandom( this.space.innerBound, 200 );
    }

    componentDidUpdate() {
      if (this.props.pause) {
        this.space.pause();
      } else {
        this.space.resume();
      }
    }


    // Override PtsCanvas' start function
    start(bound) {
      this._create();
    }


    // Override PtsCanvas' resize function
    resize() {
      this._create();
    }


    // Override PtsCanvas' animate function
    animate(time, ftime) {
      let perpend = new Group( this.space.center.$subtract(0.1), this.space.pointer ).op( Line.perpendicularFromPt );
      this.pts.rotate2D( 0.0005, this.space.center );

      this.pts.forEach( (p, i) => {
        // for each point, find the perpendicular to the line
        let lp = perpend( p );
        var ratio = Math.min( 1, 1 - lp.$subtract(p).magnitude()/(this.space.size.x/2) );
        this.form.stroke(`rgba(255,255,255,${ratio}`, ratio*2).line( [ p, lp ] );
        this.form.fillOnly( ["#f03", "#09f", "#0c6"][i%3] ).point( p, 1 );
      });
      
    }

}

export default CanvasComponent;
