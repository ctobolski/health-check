import React, { Component, Fragment } from 'react';
import './App.css';
import axios from 'axios'
import { environments } from './config.js'

class App extends Component {
  static defaultProps = {environments}
  createEnvironments = () => {
      return this.props.environments.map(({name, apps}, index) => {
        return <Environment name={name} apps={apps} key={index} />
      })
  }
  render() {
    return (
      <Fragment>
        {this.createEnvironments()}
      </Fragment>
    )
  }
}

const Environment = ({name, apps}) => {
    return (
        <div className="environment"> 
            <div className="title">{name}</div> 
            <div className="row">
                {makeBoxes(apps)}
            </div>
        </div>
    )
}

const makeBoxes = (apps) => {
    return apps.map((app, index) => {
        return (
            <Box url={app.url} name={app.name} interval={app.interval} key={index} />
        );
    });
}

class Box extends Component { 

    constructor(props) {
        super(props)
        this.state = { status: "unknown", loading: true}
    } 

    componentWillUnmount() {
      clearInterval(this.timer)
    }

    componentDidMount() { 
        this.checkHealth(); 
        this.timer = setInterval(() => this.checkHealth(), this.props.interval);
    }

    checkHealth() { 
      this.setState({loading: true})
        axios.get(this.props.url)
            .then(({data}) => { 
                this.setState({status: "up"});
            })
            .catch((error) => {
                this.setState({status: "down"}); 
            })
            .finally(() => { 
              this.setState({loading: false})
            })
    }

    render() { 
    const {status, loading}  = this.state
        return (
            <div className={`app ${status} ${loading ? 'loading' : ''}`}>
                <h1>{this.props.name}</h1>
            </div>
        );
    }
} 

export default App;
