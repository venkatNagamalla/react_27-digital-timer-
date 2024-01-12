// Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, isStarted: false}

  renderMinutesAndSeconds = () => {
    const {minutes, seconds} = this.state
    const remainingSec = minutes * 60 - seconds
    const renderMin = Math.floor(remainingSec / 60)
    const renderSec = Math.floor(remainingSec % 60)
    const displayMin = renderMin > 9 ? renderMin : `0${renderMin}`
    const displaySec = renderSec > 9 ? renderSec : `0${renderSec}`
    return `${displayMin}:${displaySec}`
  }

  getTime = () => {
    const {seconds, minutes} = this.state
    const timerCompleted = seconds === minutes * 60

    if (timerCompleted) {
      clearInterval(this.timeInterval)
      this.setState({isStarted: false})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  onTimerStart = () => {
    const {isStarted} = this.state
    if (isStarted === false) {
      this.timeInterval = setInterval(this.getTime, 1000)
    } else {
      clearInterval(this.timeInterval)
    }
    this.setState(prevState => ({isStarted: !prevState.isStarted}))
  }

  reset = () => {
    clearInterval(this.timeInterval)
    this.setState({minutes: 25, seconds: 0, isStarted: false})
  }

  decreaseMin = () => {
    const {minutes} = this.state
    if (minutes > 0) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  render() {
    const {isStarted} = this.state
    const startMess = isStarted ? 'Pause' : 'Start'
    const startImg = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const timeStatus = isStarted ? 'Running' : 'Paused'
    const altMess = isStarted ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="clock-container">
          <div className="clock-background">
            <div className="card-container">
              <h1 className="time">{this.renderMinutesAndSeconds()}</h1>
              <p className="time-status">{timeStatus}</p>
            </div>
          </div>
          <div className="timer-container">
            <div className="two-btn-container">
              <button
                onClick={this.onTimerStart}
                type="button"
                className="btn-container play-button"
              >
                <img
                  className="play-btn image-status"
                  src={startImg}
                  alt={altMess}
                />
                <p className="btn-text">{startMess}</p>
              </button>
              <button
                onClick={this.reset}
                type="button"
                className="btn-container play-button"
              >
                <img
                  className="play-btn image-status"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="btn-text">Reset</p>
              </button>
            </div>
            <p className="set-timer-text">Set Timer Limit</p>
            <div className="setting-timer">
              <button
                onClick={this.decreaseMin}
                className="set-btn"
                type="button"
                disabled={isStarted}
              >
                -
              </button>
              <div className="timer">
                <p>25</p>
              </div>
              <button
                onClick={() =>
                  this.setState(prevState => ({minutes: prevState.minutes + 1}))
                }
                className="set-btn"
                type="button"
                disabled={isStarted}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
