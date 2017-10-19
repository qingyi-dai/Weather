/**
 * Day 2
 * A weather app
 * Have trouble completing the animation part
 * will stçdy on the animation in later experiments
 */
'use strict';

import React,{ Component, propTypes } from 'react';
import { Platform,Image,ScrollView,StatusBar,StyleSheet,Text,TouchableHighlight,View,TextInput,Button } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';

class Weather extends Component{

    componentDidMount() {
      var city = '%E5%8C%97%E4%BA%AC';
      this.updWeather(city);
    }

  constructor(props) {
    super(props)
    this.state = {
      source: null,
      city: '',
      citys: [{
        citySource: null,
      }]
    }
  }

    onSetCity(text){
      this.setState({
        city: text,
      });
    }

    onChanegeTextKeyword(){
      this.updWeather(this.state.city);
    }

    updWeather(city){
      var url = '%E5%8C%97%E4%BA%AC';
      if(city===''){
      } else {
        url = city;
      }

      fetch('http://www.sojson.com/open/api/weather/json.shtml?city=' + url )
      .then((response)=>response.json())
      .then((json)=>{
        this.setState({
          source: json,
        });
      })
      .catch((e)=>{
       // alert(e);
        alert('不存在当前输入的城市！');
      });

    }

    handleClick() {
      let citySource = this.state.source;
      if(this.state.citys[0].citySource != null){
        let citys = this.state.citys.slice();
        var isSameCity = true;
        for(var i = this.state.citys.length-1;i >= 0; i--){
          if(citySource.city == citys[i].citySource.city) {
            isSameCity = false;
          }
        }
        if(isSameCity){
          this.setState({
            citys: citys.concat([{
              citySource: citySource
            }]),
          });
          alert("成功添加城市");
        } else {
          alert("已经存在当前城市");
        }
        
      } else {
        this.setState({
            citys: [{
              citySource: citySource
            }],
          });
        alert("成功添加城市");
      }
    }

  render() {
    var weatherIndex;
      if (!this.state.source) {
        weatherIndex = (<Text key={0}>'Loading...'</Text>);
      } else {
        const dayView = this.state.source.data.forecast.map((elem, i) => {
          return (
            <View key={i} style={styles.withinWeekLine}>
              <View style={styles.withinWeekDay}>
                <Text style={styles.withinWeekDayText}>
                  {
                    elem.date
                  }
                </Text>
              </View>
              <View style={styles.withinWeekIcon}>
                <Icon name={ "ios-rainy" } style={styles.withinWeekIconIcon} size={25}></Icon>
              </View>
              <View style={styles.withinWeekDegree}>
                <Text style={styles.withinWeekHigh}>{elem.high}</Text>
                <Text style={
                  styles.withinWeekLow
                }>{elem.low}</Text>
              </View>
            </View>
          );
        });
        weatherIndex = (
          <View key={0}>
            <Image style={styles.image} source={
              require("./img/w3.png")
            }></Image>
            <ScrollView style={styles.pageContainer}  showsVerticalScrollIndicator={false}>
                <View style={styles.headInfo}>
                  <Text style={styles.city}>{
                    this.state.source.city
                  }</Text>
                  <Text style={styles.abs}>{
                    this.state.source.data.yesterday.type
                  }</Text>
                  <Text style={styles.degree}>{
                    this.state.source.data.wendu
                  }</Text>
                  <Text style={styles.circle}>°</Text>
                </View>
                <View style={styles.withinDay}>
                  <View style={styles.withinDayGeneral}>
                    <View style={styles.withinDayHead}>
                      <Text style={styles.withinDayWeek}>{
                        this.state.source.data.yesterday.date
                      }</Text>
                      <Text style={styles.withinDayDay}>{
                        }
                        昨天
                      </Text>
                    </View>
                    <View style={styles.withinDayTail}>
                      <Text style={styles.withinDayHigh}>{
                        this.state.source.data.yesterday.high
                      }</Text>
                      <Text style={styles.withinDayLow}>{
                        this.state.source.data.yesterday.low
                      }</Text>
                    </View>
                  </View>
                  <View style={styles.withinWeek}>
                    {
                      dayView
                    }
                  </View>
                  <View style={styles.weatherInfo}>
                    <Text style={styles.weatherInfoText}>{
                      this.state.source.data.ganmao
                    }</Text>
                  </View>
                  <View style={styles.weatherOther}>
                    <View style={styles.weatherOtherSection}>
                      <View style={styles.weatherOtherLine}>
                        <Text style={styles.weatherOtherTitle}>日出：</Text>
                        <Text style={styles.weatherOtherValue}>{
                          this.state.source.data.yesterday.sunrise
                        }</Text>
                      </View>
                      <View style={styles.weatherOtherLine}>
                        <Text style={styles.weatherOtherTitle}>日落：</Text>
                        <Text style={styles.weatherOtherValue}>{
                          this.state.source.data.yesterday.sunset
                        }</Text>
                      </View>
                    </View>
                    <View style={styles.weatherOtherSection}>
                      <View style={styles.weatherOtherLine}>
                        <Text style={styles.weatherOtherTitle}>湿度：</Text>
                        <Text style={styles.weatherOtherValue}>{
                          this.state.source.data.shidu
                        }</Text>
                      </View>
                    </View>
                    <View style={styles.weatherOtherSection}>
                      <View style={styles.weatherOtherLine}>
                        <Text style={styles.weatherOtherTitle}>风速：</Text>
                        <Text style={styles.weatherOtherValue}>
                        <Text style={{fontSize:15}}>{
                          this.state.source.data.yesterday.fx
                        }</Text>{
                          this.state.source.data.yesterday.fl
                        }</Text>
                      </View>
                    </View>
                  </View>
                </View>
            </ScrollView>
          </View>
        );
      }

    var weatherOther;
    if(this.state.citys[0].citySource != null) {
      weatherOther = this.state.citys.map((elemOther, index) => {

        const dayView = elemOther.citySource.data.forecast.map((elem, i) => {
          return (
            <View key={i} style={styles.withinWeekLine}>
              <View style={styles.withinWeekDay}>
                <Text style={styles.withinWeekDayText}>
                  {
                    elem.date
                  }
                </Text>
              </View>
              <View style={styles.withinWeekIcon}>
                <Icon name={ "ios-rainy" } style={styles.withinWeekIconIcon} size={25}></Icon>
              </View>
              <View style={styles.withinWeekDegree}>
                <Text style={styles.withinWeekHigh}>{elem.high}</Text>
                <Text style={
                  styles.withinWeekLow
                }>{elem.low}</Text>
              </View>
            </View>
          );
        });

        return (
          <View key={index+1}>
            <Image style={styles.image} source={
              require("./img/w3.png")
            }></Image>
            <ScrollView style={styles.pageContainer}  showsVerticalScrollIndicator={false}>
                <View style={styles.headInfo}>
                  <Text style={styles.city}>{
                    elemOther.citySource.city
                  } {index}</Text>
                  <Text style={styles.abs}>{
                    elemOther.citySource.data.yesterday.type
                  }</Text>
                  <Text style={styles.degree}>{
                    elemOther.citySource.data.wendu
                  }</Text>
                  <Text style={styles.circle}>°</Text>
                </View>
                <View style={styles.withinDay}>
                  <View style={styles.withinDayGeneral}>
                    <View style={styles.withinDayHead}>
                      <Text style={styles.withinDayWeek}>{
                        elemOther.citySource.data.yesterday.date
                      }</Text>
                      <Text style={styles.withinDayDay}>{
                        }
                        昨天
                      </Text>
                    </View>
                    <View style={styles.withinDayTail}>
                      <Text style={styles.withinDayHigh}>{
                        elemOther.citySource.data.yesterday.high
                      }</Text>
                      <Text style={styles.withinDayLow}>{
                        elemOther.citySource.data.yesterday.low
                      }</Text>
                    </View>
                  </View>
                  <View style={styles.withinWeek}>
                    { dayView }
                  </View>
                  <View style={styles.weatherInfo}>
                    <Text style={styles.weatherInfoText}>{
                      elemOther.citySource.data.ganmao
                    }</Text>
                  </View>
                  <View style={styles.weatherOther}>
                    <View style={styles.weatherOtherSection}>
                      <View style={styles.weatherOtherLine}>
                        <Text style={styles.weatherOtherTitle}>日出：</Text>
                        <Text style={styles.weatherOtherValue}>{
                          elemOther.citySource.data.yesterday.sunrise
                        }</Text>
                      </View>
                      <View style={styles.weatherOtherLine}>
                        <Text style={styles.weatherOtherTitle}>日落：</Text>
                        <Text style={styles.weatherOtherValue}>{
                          elemOther.citySource.data.yesterday.sunset
                        }</Text>
                      </View>
                    </View>
                    <View style={styles.weatherOtherSection}>
                      <View style={styles.weatherOtherLine}>
                        <Text style={styles.weatherOtherTitle}>湿度：</Text>
                        <Text style={styles.weatherOtherValue}>{
                          elemOther.citySource.data.shidu
                        }</Text>
                      </View>
                    </View>
                    <View style={styles.weatherOtherSection}>
                      <View style={styles.weatherOtherLine}>
                        <Text style={styles.weatherOtherTitle}>风速：</Text>
                        <Text style={styles.weatherOtherValue}>
                        <Text style={{fontSize:15}}>{
                          elemOther.citySource.data.yesterday.fx
                        }</Text>{
                          elemOther.citySource.data.yesterday.fl
                        }</Text>
                      </View>
                    </View>
                  </View>
                </View>
            </ScrollView>
          </View>
        );
      });
    } else {
      weatherOther = (<View key={1}>
        <Image style={styles.image} source={
          require("./img/w3.png")
        }></Image>
        <Text>关注的城市</Text>
        </View>)
    }
    
    var arrWeather = [weatherIndex].concat(weatherOther);

      return(
      <View style={{width: Util.size.width, height:Util.size.height}}>
        <TextInput id='city'
                    ref={(ref) => this.input = ref}
                    style={{height:50,borderColor:'red',borderWidth:1,marginTop:1}}
                    underlineColorAndroid="transparent"
                    maxLength={20} 
                    placeholder={'输入城市名查询'}
                    onChangeText={this.onSetCity.bind(this)}
                    onBlur={() => this.onChanegeTextKeyword()}>
        </TextInput>
        <View>
          <Button onPress={() => this.handleClick()} title="Add">
            123
          </Button>
        </View>
        <Swiper
        // style={styles.wrapper}
        showsButtons={false}
        paginationStyle={{bottom:10, paddingTop:10, borderTopColor:"rgba(255,255,255,0.7)",borderTopWidth:Util.pixel}}
        dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3,
                          marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.5)', width: 6, height: 6, borderRadius: 3,
                          marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        >
        { arrWeather }

        </Swiper>
      </View>
    )
  }  
}

export default class extends Component{
  render() {
    return(
      <View style={styles.weatherContainer}>
        <Weather />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer:{
    backgroundColor:"transparent",
    position: "absolute",
    width: Util.size.width,
    left:0,
    top: 20,
    height: Util.size.height - 103
  },
  headInfo:{
    paddingTop:70,
    alignItems:"center",
    paddingBottom:60,
  },
  city:{
    fontSize: 25,
    color:"#fff",
    paddingBottom: 5,
    backgroundColor:"transparent"
  },
  abs:{
    fontSize:15,
    color:"#fff",
    backgroundColor:"transparent"
  },
  degree:{
    fontSize:85,
    color:"#fff",
    fontWeight: "100",
  },
  circle:{
    fontSize:35,
    color:"#fff",
    fontWeight: "300",
    position:"absolute",
    top:130,
    right:Util.size.width/2-55,
  },
  withinDayGeneral:{
    flexDirection:"row",
    width: Util.size.width,
  },
  withinDayHead:{
    flex:1,
    flexDirection:"row",
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  withinDayTail:{
    flex:1,
    flexDirection:"row",
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  withinDayWeek:{
    fontSize:15,
    color: "#fff",
    fontWeight: "400",
    width:90,
  },
  withinDayDay:{
    fontSize:15,
    color: "#fff",
    fontWeight: "300",
    width:50,
  },
  withinDayHigh:{
    fontSize:16,
    color: "#fff",
    fontWeight: "200",
    width:90,
  },
  withinDayLow:{
    fontSize:16,
    color: "#eee",
    fontWeight: "200",
    width:90,
  },
  withinDayLowNight:{
    fontSize:16,
    color: "#aaa",
    fontWeight: "200",
    width:30,
  },
  withinDayHoursBox:{
    width:55,
  },
  withinDayHoursContainer:{
    marginTop:3,
    borderTopColor:"rgba(255,255,255,0.7)",borderTopWidth:Util.pixel,
    borderBottomColor:"rgba(255,255,255,0.7)",borderBottomWidth:Util.pixel
  },
  withinDayHours:{
    paddingLeft:7,paddingTop:10,paddingBottom:10,paddingRight:10,
    flexDirection:"row",
    flexWrap:"nowrap"
  },
  withinDayHoursTime:{
    color:"#fff",
    fontSize:12,
    textAlign:"center"
  },
  withinDayHoursTimeBold:{
    color:"#fff",
    fontSize:13,
    textAlign:"center",   
    fontWeight:"500",
  },
  withinDayHoursIcon:{
    textAlign:"center",
    paddingTop:5,
  },
  withinDayHoursDegree:{
    color:"#fff",
    fontSize:14,
    paddingTop:5,
    textAlign:"center"
  },
  withinDayHoursDegreeBold:{
    color:"#fff",
    fontSize:15,
    textAlign:"center",
    paddingTop:5,
    fontWeight:"500"
  },
  withinWeek:{
    paddingTop:5
  },
  withinWeekLine:{
    flexDirection:"row",
    height: 28
  },
  withinWeekDay:{
    justifyContent:"center",
    alignItems:"flex-start",
    flex:1,
  },
  withinWeekIcon:{
    justifyContent:"center",
    // alignItems:"center",
    flex:1, 
  },
  withinWeekDegree:{
    justifyContent:"flex-end",
    alignItems:"center",
    flex:1,
    flexDirection:"row",
    paddingRight:25,
  },
  withinWeekHigh:{
    color:"#fff",
    width:85,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekIconIcon:{
    color:"#fff"
  },
  withinWeekLow:{
    color:"#eee",
    width:85,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekLowNight:{
    color:"#aaa",
    width:35,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekDayText:{
    color:"#fff",
    paddingLeft:1,
    fontSize:15,
  },
  weatherInfo:{
    marginTop:5,
    borderTopColor:"rgba(255,255,255,0.7)", borderTopWidth:Util.pixel,
    borderBottomColor:"rgba(255,255,255,0.7)", borderBottomWidth:Util.pixel
  },
  weatherInfoText:{
    color:"#fff",
    fontSize:15,
    paddingTop:10,paddingLeft:20,paddingBottom:10,paddingRight:20,
  },
  weatherOther:{
    paddingTop:10
  },
  weatherOtherSection:{
    paddingBottom:10
  },
  weatherOtherLine:{
    flexDirection:"row",
    flexWrap:"nowrap"
  },
  weatherOtherTitle:{
    width: Util.size.width/2-15,
    color:"#fff",
    textAlign:"right",
    fontSize: 15,
  },
  weatherOtherValue:{
    width: Util.size.width/2,
    paddingLeft:15,
    flex:1,
    fontSize: 15,
    color:"#fff",
  },
  backBtn:{
    position:"absolute", 
    right:20,bottom:7
  },
  backBtnIcon:{
    color:"#fff",
    width: 20,
    height:30,
  },
})
