import React, { Component, Fragment } from 'react';
import './App.css';
import axios from 'axios'
// import { environments } from './config.js'

const tenMins = 100000
 const environments = [
    {name : "Demo",urls:[
            {url: "http://localhost:8081/actuator/health", name: "GOE",interval:tenMins}, 
            {url: "http://localhost:8081/actuator/health", name: "CDI",interval:tenMins}, 
            {url: "http://localhost:8081/actuator/health", name: "WLTP",interval:tenMins}
    ]},
    {name : "IST",urls:[
            {url: "http://localhost:8081/actuator/health", name: "GOE",interval:tenMins}, 
            {url: "http://localhost:8081/actuator/health", name: "CDI",interval:tenMins}, 
            {url: "http://localhost:8081/actuator/health", name: "WLTP",interval:tenMins}
    ]},
    {name : "Prod",urls:[
            {url: "http://localhost:8081/actuator/health", name: "GOE",interval:tenMins}, 
            {url: "http://localhost:8081/actuator/health", name: "CDI",interval:tenMins}, 
            {url: "http://localhost:8081/actuator/health", name: "WLTP",interval:tenMins}
    ]}
]

class App extends Component {
  static defaultProps = {environments}
  createEnvironments = () => {
      return this.props.environments.map(({name, urls}, index) => {
        return <Environment name={name} urls={urls} key={index} />
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

const Environment = ({name, urls}) => {
    return (
        <div className="environment"> 
            <div className="title">{name}</div> 
            <div className="row">
                {makeBoxes(urls)}
            </div>
        </div>
    )
}

const makeBoxes = (boxes) => {
    return boxes.map((box, index) => {
        return (
            <Box url={box.url} name={box.name} interval={box.interval} key={index} />
        );
    });
}

class Box extends Component { 

    constructor(props) {
        super(props)
        this.state = { status: "unknown", loading: true}
    } 

    componentWillMount() {
        this.checkHealth();
    }

    componentWillUnmount() {
      clearInterval(this.timer)
    }

    componentDidMount() { 
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
