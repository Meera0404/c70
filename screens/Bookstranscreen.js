import React from "react";
import { Text,View ,TouchableOpacity,StyleSheet, TextInput,Image} from "react-native";
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { askAsync } from "expo-permissions";


export default class Transactionscreen extends React.Component{
  constructor(){
   super();
   this.state = {hascamerapermission:null,scanned:false,scannedata:'',
   buttonstate:'normal',scanbookid:'',scanstudentid:'',}
  }
  getcampermission=async(id)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hascamerapermission:status==="granted",
      buttonstate:id,
      scanned:false,
    })
  }
  handlebarscanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedata:data,
      buttonstate:'normal' 
    })
  }
  render(){

    const hascamerapermission = this.state.hascamerapermission;
    const scanned = this.state.scanned;
    const buttonstate = this.state.buttonstate;

    if(buttonstate !=="normal" && hascamerapermission){
      return(
       < BarCodeScanner 
         onBarCodeScanned = {scanned? undefined:this.handlebarscanned}
         style ={StyleSheet.absoluteFillObject}
       />
      )

    }

    else if(buttonstate==="normal"){
    return(
          <View style={styles.container}>

            <View>
              <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
              <Text style={{textAlign:"center",fontSize:30}}> WILY APP </Text>
            </View>
          <View style={styles.inputview}>
            <TextInput style={styles.inputbox} placeholder="BookID" value={this.state.scanbookid}/>
            <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getcampermission("BookId")}}>
            <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputview}>
            <TextInput style={styles.inputbox} placeholder="StudentID" value={this.state.scanstudentid}/>
            <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getcampermission("StudentId")}}>
            <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>

          </View>

      )
  }  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10,
  },
  buttonText:{
    fontSize: 20,
    textalign:"center",
    marginTop:10,
  },
  inputview:{
    flexDirection:"row",
    margin:20,
    
  },
  inputbox:{
    width:200,
    height:40,
    borderWidth:1.5,
    borderRightWidth:0,
    fontSize:20
  },
  scanButton:{
    backgroundColor:"#66BB6A",
    width:50,
    borderWidth:1.5,
    borderLeftWidth:0
  }

});
