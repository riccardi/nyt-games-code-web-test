import React, { Component } from 'react'
import styles from './Timer.scss'

import { setTime } from '../../redux/action-creators'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

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

//I should probably incorporate this in a better way
const TimerContainer = connect(null, mapDispatchToProps)(
  class TimerContainer extends Component {

    constructor(props) {
      super(props)
      this.state = {
        secondsElapsed: 0,
      }
    }

    componentDidMount() {
      if (this.props.startTime) {
        this.setState({
          secondsElapsed: this.props.startTime
        });
        this.interval = setInterval(this.tickDown.bind(this), 1000)
      } else {
        this.interval = setInterval(this.tick.bind(this), 1000)
      }

    }

    componentWillUnmount() {
      this.props.setTime(formatTime(this.state.secondsElapsed))
      clearInterval(this.interval)
    }

    tick() {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1,
      })
    }

    tickDown() {
      if (this.state.secondsElapsed === 0) {
        hashHistory.push('/game-over')
      } else {
        this.setState({
          secondsElapsed: this.state.secondsElapsed - 1,
        })
      }
    }

    render() {
      return (
        <Timer time={this.state.secondsElapsed} />
      )
    }
  }
)

export default TimerContainer
