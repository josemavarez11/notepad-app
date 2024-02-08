import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import Fercho from "./Fercho.js";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const navigation = useNavigation();

    const saveToken = async (token) =>{
        await AsyncStorage.setItem("token" , token)
    }

    const handleValidacion = () =>{

        if(username ==="" || password === ""){
            Alert.alert("Error","You must fill all the fields",[{
                text: "Ok",
                onPress: () => console.log("Alert closed")
            },
            {
                text: "Cancel",
                
            }])
            return ;
        }

        if(username.length < 5){
            Alert.alert("Username must be at least 5 characters");
            return false;
        }
        if(password.length < 8){
            Alert.alert("Password must be at least 8 characters");
            return false;
        }
        else{
            return true;
        }
    }

    const handleClick = async (e) => {

        handleValidacion();
        
        (e).preventDefault();
        const endpoint = '/auth/login';
        const bodyLogin = {
            username,
            password,
        }
        try {
            const response = await Fercho({ endpoint, method: 'POST', body: bodyLogin });
            console.log(response.token);
            await saveToken(response.token);
            
            navigation.navigate('NotePage');
            // navigation.navigate('Profile');
            // navigation.navigate('Group');
            // navigation.navigate('Nav');

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        const getToken = async () =>{
            const token = await AsyncStorage.getItem("token");
            setToken(token);
            if(token){
                // navigation.navigate('NotePage');
            }
        }
        getToken();
    }, [])

    return (
        <View style={styles.content}>
          <View style={styles.contentA}>
            <View style={styles.contentAa}>
                <Image 
                    source={require('../../assets/icon-notepad.png')}
                    style={{width: 100, height: 100, marginLeft: 20}}
                />
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.sub}>Sign in to continue</Text>
            </View>

            <View style={styles.contentAb}>
                <Text style={styles.line}></Text>
                <Text style={styles.line}></Text>
                <Text style={styles.line}></Text>
                <Text style={styles.line}></Text>
                <Text style={styles.line}></Text>
            </View>
        </View>
            <View style={styles.contentB}>
                <TextInput 
                    placeholder="Username" 
                    style={styles.input} 
                    placeholderTextColor={'#EB9373'}
                    onChangeText={e => setUsername(e)}
                    minLength={5}
                
                />
                <TextInput 
                    placeholder="Password" 
                    secureTextEntry={true}
                    style={styles.input} 
                    placeholderTextColor={'#EB9373'}
                    onChangeText={e => setPassword(e)}
                    minLength={8}
                   
                />
                <TouchableOpacity style={styles.buttons} onPress={handleClick}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentA:{
        backgroundColor: "#eb9373",
        width: "100%",
        height: "40%",
        display: "flex",
        flexDirection: "row",
    },
    contentB:{
        width: "100%",
        height: "60%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    title:{
        color: "white",
        marginLeft: 20,
        fontSize: 30,
    },
    sub:{
      color: "white",
      marginLeft: 20,
      fontSize: 18,
    },
    input:{
        width: "80%",
        height: 55,
        borderWidth: 1,
        borderColor: "black",
        margin: 10,
        paddingLeft: 20,
        borderRadius: 15,
        borderColor: "#F2C3B2",
        fontSize: 18,
        color: "#E97451",
    },
    buttons:{
        width: "80%",
        height: 55,
        borderRadius: 15,
        backgroundColor: "#EB9373",
    },
    btnText:{
        textAlign: "center",
        marginTop: 15,
        color: "white",
        fontSize: 18,
    },
    contentAa:{
      backgroundColor: "#EB9373",
      width: "60%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    contentAb:{
      backgroundColor: "#EFB888",
      width: "40%",
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      display: "flex",
      justifyContent: "space-around",
      
    },
    line:{
      backgroundColor: '#EB9373',
      margin: 15,
      marginTop: 30,
      height: 5,
    }

});

export default Login;