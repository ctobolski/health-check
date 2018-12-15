import React, { Component } from 'react'
import axios from 'axios'

export default class AppStatus extends Component {
  constructor(props) {
    super(props)
    this.state = { status: 'unknown', loading: true }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidMount() {
    this.checkHealth()
    this.timer = setInterval(() => this.checkHealth(), this.props.interval)
  }

  checkHealth() {
    this.setState({ loading: true })
    axios
      .get(this.props.url)
      .then(({ data }) => {
        this.setState({ status: 'up' })
      })
      .catch(error => {
        this.setState({ status: 'down' })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { status, loading } = this.state
    return (
      <div className={`app ${status} ${loading ? 'loading' : ''}`}>
        <h1>{this.props.name}</h1>
      </div>
    )
  }
}
