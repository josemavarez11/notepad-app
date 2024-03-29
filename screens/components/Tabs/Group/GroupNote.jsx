import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert} from "react-native";
import Constants  from "expo-constants";
import Nav from "../../Nav";
import NoteGroup from "./NoteGroup";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

const GroupNote = () =>{
    const Focus = useIsFocused();


    useEffect(() => {
        if(Focus){
        }
    }, [Focus]);
    return (
        <View style={{backgroundColor: "rgba(255,255,255,0.8)"}}>
            <View style={style.contentBtn}>
                <TouchableOpacity
                    // value="Create"
                    style={style.btn}
                    onPress={() => Alert.alert("Create")}
                >
                    <Image
                    source={require('../../../../assets/add-note.png')}
                    />
                </TouchableOpacity>
            
                <Text style={style.text}>Notes</Text>
                
            </View>
         
            <View style={style.content}>
                <View style={style.contentBar}>
                </View>
                    <NoteGroup />
                    <Nav />
            </View>
            
        </View>
    )
}

const style = StyleSheet.create({
    text: {
        fontSize: 25,
        textAlign: "center",
        marginTop: "10%",
        // marginLeft: "60%",
        // padding: 10,
        color:"#E97451",
        fontWeight: "bold",
        // marginRight: 150
        // gap: 30
    },
    input:{
        backgroundColor: "rgba(237, 179,129, 0.4)",
        width: 327,
        height: 45,
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 20
    },
    content:{
        display: "flex",
        flexDirection: "column",
        marginBottom: Constants.statusBarHeight + 150,
        // gap: 20,
    },
    contentBar:{
        marginBottom: 30,
    
    },
    contentNote: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    note: {
        backgroundColor: "#FAF0E8",
        width: 360,
        height: 70,
        borderRadius: 15,
        padding: 5,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    circle: {
        width: 53,
        height: 53,
        borderRadius: 62,
        backgroundColor: "#FAE0C6",
        marginRight: 15,
        marginLeft: 7,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    // scroll:{
    //     marginBottom: 100
    // },
    contentMax:{
        marginBottom: 10,
    },
    image:{
        height:26,
        width:26,
        // backgroundColor: "white"
    },
    contentBtn:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        // marginTop: 20,
        // marginBottom: 20,
        // backgroundColor: "red",
        gap: 150,
    },
    btn:{
        backgroundColor: "#FAE0C6",
        width: 60,
        height: 40,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginTop: 40,
    }
});

export default GroupNote;
