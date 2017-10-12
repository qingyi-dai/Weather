/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component , PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Day2 from './view/day2';

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      tenms: 0,
      history: [{
        times: [0, 0, 0],
      }],
      resetms: 0,
    }
  }

  handlePress() {
    
    this.setState({
      isStart: !this.state.isStart,
    });

    var intervalOne = setInterval(() => {
      this.setState(previousState => {
        let ms = this.state.tenms + 10;
        return { tenms: ms, };
      });
      if(!this.state.isStart){
        clearInterval(intervalOne);
        return;
      }
    }, 90);

    var intervalTwo = setInterval(() => {
      this.setState(previousState => {
        let rMs = this.state.resetms + 10;
        return { resetms: rMs, };
      });
      if(!this.state.isStart){
        clearInterval(intervalTwo);
        return;
      }
    }, 90);
    
  }

  handlePressToHistory(min, sec, count) {
    if(this.state.isStart){
      const time = [min, sec, count]
      const history = this.state.history.unshift({times: time});
      this.setState({
        history: this.state.history,
        resetms: 0,
      });
    }
  }

  handlePressToClear() {
    this.setState({
      tenms: 0,
      resetms: 0,
      history: [{
        times: [0, 0, 0],
      }], 
    });
  }

  render() {
    let isStart = this.state.isStart;
    let resetms = this.state.resetms;
    const history = this.state.history;

    let min = resetms/6000 ;
    let sec = (resetms % 6000 ) / 100;
    
    let btnRecordNm = (!isStart && this.state.tenms != 0) ? '复位' : '计次';
    let onPressEvent = btnRecordNm === '复位' ? () => this.handlePressToClear() : () => this.handlePressToHistory(min, sec, parseInt(history.length));
    let btnStName = isStart ? '停止' : '启动';
    let stBgColor = isStart ? '#331412' : '#19351e';
    let stTextStyle = isStart ?  '#cf3b38' : '#72c679';

    const countNum = resetms != 0 ? this.state.history.length : null;
    let minute = resetms != 0 ? parseInt(min) + ':' : null;
    let second = resetms != 0 ? (parseFloat(sec)).toFixed(2) : null;
    const moves = history.map((times,num) => {
      return (
        <Count key={num} time={times.times} />
      );
    });

    return (
      <View style={styles.container}>
        <Text style={[styles.textDefaultStyle, styles.border, styles.title,]}> 秒表 </Text>
        <TimeDisplay time={this.state.tenms}/>
        <View style={[styles.center, styles.btn]}>
          <Btn btnName= {btnRecordNm}
               btnStyle= {{ backgroundColor: '#141414', marginRight: 80,}}
               textStyle= {{ color: '#d1d1d1', }} 
               onPress={onPressEvent}/>

          <Btn btnName= {btnStName}
                btnStyle=  {{backgroundColor: stBgColor, marginLeft: 80,}}
                textStyle=  {{color: stTextStyle,}}
                onPress={() => this.handlePress()} />
        </View>
        
        <ScrollView className="countList">
          <View style={[styles.center, styles.count, styles.border,]}>
            <Text style={[styles.textDefaultStyle, styles.countNum]}>{countNum}</Text>
            <Text style={[styles.textDefaultStyle, styles.countTime]}>{minute}</Text>
            <Text style={[styles.textDefaultStyle,]}>{second}</Text>
          </View>
          {moves}
        </ScrollView>
      </View>
    );
  }
}

class TimeDisplay extends Component {
  render() {
    let minute = this.props.time/6000 ;
    let second = (this.props.time % 6000 ) / 100;
    
    return (
      <View style={[styles.center, styles.timeDisplay]}>
        <Text style={[styles.textDefaultStyle, styles.timeText,]}>{parseInt(minute)}:</Text>
        <Text style={[styles.textDefaultStyle, styles.timeText,]}>{(parseFloat(second)).toFixed(2)}</Text>
      </View>
    );
  }
}

class Btn extends Component {

  static propTypes = {
    btnName: PropTypes.string,
    btnStyle: TouchableHighlight.propTypes.style,
    textStyle: Text.propTypes.style,
  };

  static defaultProps = {
    btnName: 'Button',
  };

  render() {
    return (
      <View>
          <TouchableHighlight
              style={[styles.center, styles.btnDefaultStyle, this.props.btnStyle]}
              onPress={() => this.props.onPress()} >
              <Text style={[styles.textDefaultStyle, this.props.textStyle]}>{this.props.btnName}</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

class Count extends Component {
  render() {
    if(this.props.time[0] === 0 && this.props.time[1] === 0){
      return <View></View>;
    } else {
      return (
        <View style={[styles.center, styles.count, styles.border, ]}>
          <Text style={[styles.textDefaultStyle, styles.countNum]}>{this.props.time[2]}</Text>
          <Text style={[styles.textDefaultStyle, styles.countTime]}>{parseInt(this.props.time[0])}:</Text>
          <Text style={[styles.textDefaultStyle, ]}>{(parseFloat(this.props.time[1])).toFixed(2)}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
  },
  textDefaultStyle: {
    fontSize: 18,
    color: '#d1d1d1',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    width: 400,
    height: 50,
    color: '#fbfbfb',
    backgroundColor: '#181818',
    borderBottomWidth: 1,
  },
  center: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
  border: {
    borderColor: '#919191',
  },
  timeDisplay: {
    height: 250,
  },
  timeText: {
    fontSize: 80,
    color: '#fbfbfb',
  },
  btn: {
    height: 110,
  },
  btnDefaultStyle: {
    width: 80,
    height: 80,
    backgroundColor: '#19351e',
    borderRadius: 40,
  },
  count: {
    borderTopWidth: 1,
    width: 320,
    height: 40,
  },
  countNum: {
    marginRight: 110,
  },
  countTime: {
    marginLeft: 110,
  }
});

// AppRegistry.registerComponent('Stopwatch', () => Stopwatch);