import React from 'react';
import moment from 'moment-timezone';
import socketIOClient from 'socket.io-client';

import { Row, Col } from 'antd';

import './Greeter.css';

class Greeter extends React.Component {
  constructor() {
    super();
    this.state = {
      socketIOHost: process.env.SOCKETIO_HOST || "http://127.0.0.1:8084",
      date: moment.tz("Asia/Jakarta").format("dddd, MMMM DD YYYY"),
      time: moment.tz("Asia/Jakarta").format("HH:mm:ss"),
      totalGuess: 0,
      nameToGreet: "",
      description: "",
      promise: null
    };
  }

  componentDidMount() {
    const { socketIOHost } = this.state;
    const socket = socketIOClient(socketIOHost);

    var resetTimer;

    socket.on("newGuess", data => {
      console.log(data);
      const { name, totalGuess, description } = data;
      const { promise } = this.state;
      let closure = this;

      function newPromise(){
        return new Promise((resolve, reject) => {
          closure.setState({
            nameToGreet: name,
            totalGuess: totalGuess,
            description: description
          }, () => {
            clearTimeout(resetTimer);
            window.responsiveVoice.speak(`Selamat Datang, ${closure.state.nameToGreet}`, "Indonesian Female", {rate: 0.85 , onend: resolve});
    
            resetTimer = setTimeout(() => {
              closure.setState({ nameToGreet: "", description: "" })
            }, 10000);
          })
        });
      }

      if (promise != null){
        this.setState({
          promise: promise.then(() => newPromise())
        });
      } else {
        this.setState({
          promise: newPromise()
        });
      }

    });

    this.startClock();
  }


  render() {
    const { nameToGreet, totalGuess, date, time, description } = this.state;

    let greeterContent;
    if (nameToGreet) {
      greeterContent = (
        <React.Fragment>
          <p className='fs-2hvw margin-0 martop-25 fc-grey'>Selamat Datang</p>
          <p className='fs-4vw fc-black'>{nameToGreet}</p>
          <p className='fs-large fc-grey martop-5-min'>{description}</p>
        </React.Fragment>
      )
    } else {
      greeterContent = (
        <React.Fragment>
          <p className='fs-2hvw margin-0 martop-30 fc-grey'></p>
          <p className='fs-4vw fc-black marbot-5'>Selamat Datang</p>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Row justify='space-around' align='middle'>
          <Col span={24}>
            <div className='announce-ctr'>
              {greeterContent}
            </div>
          </Col>
        </Row>

        <Row justify='space-around' align='middle' className='fs-xlarge martop-25'>
          <Col span={12}>
            Total Tamu :<br />
            {totalGuess}
          </Col>
          <Col span={12} align='right'>{date}<br />{time}</Col>
        </Row>
      </React.Fragment>
    );
  }

  startClock() {
    setInterval(() => {
      this.setState({
        date: moment.tz("Asia/Jakarta").format("dddd, MMMM DD YYYY"),
        time: moment.tz("Asia/Jakarta").format("HH:mm:ss"),
      })
    }, 1000);
  }
}

export default Greeter;
