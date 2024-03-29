import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Delete = () =>{
    const [token, setToken] = useState("");
    const navigation = useNavigation();
    
    const getToken = async () => {
        const token = await AsyncStorage.getItem("token");
        setToken(token);
    };

    const handleDelete = async () => {
        try {
            const url = `https://notepad-api-dev-hsee.3.us-1.fl0.io/api/users/delete`
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            });

            if(response.status !== 200) return Alert.alert(
                "Error", "Something went wrong deleting your account, try again later"
            );
            
            return Alert.alert("Your account has been deleted",
                [{ text: "Ok", onPress: () => navigation.navigate("Login")}]
            );
            
        } catch (error) {
            //alertar que no se pudo eliminar la cuenta
            //pudo ser por falta de internet
            return console.error(error);
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    return (
        <View style={style.contentNote}>
            <Text style={style.text}>If you delete your account, you will lose all your notes and note groups associated with them. This action is irreversible, and you will not be able to recover the information once the account is deleted.</Text>
            <TouchableOpacity
                style={style.btn}
                onPress={handleDelete}
            >
                <Text style={style.textt}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}


const style = StyleSheet.create({
    contentNote: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
        marginTop: 50
    },
    text:{
        fontSize: 15,
        color: "red",
        fontWeight: "bold",
        textAlign: "center",
        width: "80%",
    },
    btn:{
        width: "80%",
        height: 55,
        borderRadius: 15,
        backgroundColor: "#EB9373",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textt:{
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default Delete