import React, { Component } from 'react'
import styles from './Timer.scss'

import { setTime } from '../reduxCode'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setTime: (time) => dispatch(setTime(time))
});

export const formatTime = (time) => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}


const Timer = ({ time = 0 }) => (
  <div className={styles.timer}>
    {formatTime(time)}
  </div>
)

Timer.propTypes = {
  time: React.PropTypes.number,
}

const TimerContainer = connect(null, mapDispatchToProps)(
  class TimerContainer extends Component {

    constructor(props) {
      super(props)
      this.state = {
        secondsElapsed: 0,
      }
    }

    componentDidMount() {
      this.interval = setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
      this.props.setTime(this.state.secondsElapsed)
      clearInterval(this.interval)
    }

    tick() {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1,
      })
    }

    render() {
      return (
        <Timer time={this.state.secondsElapsed} />
      )
    }
  }
)

export default TimerContainer
