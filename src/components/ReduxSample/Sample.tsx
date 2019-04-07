import * as React from "react";
import "../../App.css";

import logo from "../../logo.svg";
import { connect } from "react-redux";
import { Actions } from "../../actions";

interface IAppProps {
  level: number;
  sendLevelUpRequest: (level: number) => void;
}

interface IAppState {
  localLevel: number;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: Readonly<IAppProps>) {
    super(props);
    console.log(props)
    this.state = {
      localLevel: props.level
    };
  }

  componentDidUpdate(prevProps: IAppProps) {
    if (prevProps !== this.props) {
      this.setState({
        localLevel: this.props.level
      });
    }
  }

  levelUp = () => {
    const { localLevel } = this.state;
    this.props.sendLevelUpRequest(localLevel);

  };

  render() {
    const { localLevel } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">Level = {localLevel}</p>
        <button onClick={this.levelUp}>Level Up</button>
      </div>
    );
  }
}

const mapStateToProps = ({levelReducer}: any) => {
  return { level: levelReducer.level };
};

const mapDispatchToProps = (dispatch: any) => ({
  sendLevelUpRequest: (level: number) => dispatch(Actions.levelUp(level))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
