import React, { useEffect, useState} from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import api from './src/device/api';

export default function App(){
    //'Users' e 'setUser' são variável ea função de atualização respectativamente
    const[Users, setUsers ] = useState([]);
    console.log(Users)

    const API = "http://10.110.12.86:3000/user";

    //Função assincrona para buscar os comentarios da API
    //'async/await simplifica acesso ao serviço de API
    async function fetchUsers() {
        try{
        //Faz uma requisição GET para a URL de API
        const response = await api.get(API)
        //Se bem sucedida a chamada da API carrega a lista dos dados 
        setUsers(response.data);
        }catch(error){
            //se ocorrer erro (ex: falha de conexão), exibe uma mensagem de erro 
            console.error("Erro GET:", error.message);
        }        
    };

    useEffect(()=> {
        fetchUsers();
    },[])

    const _render = () => {
        const vet = [];

        Users.map((item, index)=> {
            vet.push(
                <View key={index}>
                    <Text style={style.item}>ID:{item.id} Nome:{item.name} Email: {item.email}</Text>
                </View>
            )
        })
        return vet;
    }
    return(
        <View style={style.container}>
            <Text style={style.title}>GET - Listar Usuarios</Text>
            <Button title="Recarregar lista" onPress={fetchUsers}/>
            <ScrollView>
                {_render()}
            </ScrollView>
            
        </View>
    );
}
//Styles utilizados no projetos
const style = StyleSheet.create({
    container : {flex: 1, padding: 20, marginTop: 40,},
    title: {fontSize: 22, fontWeight: "bold", marginBottom:10},
    item: {fontSize:12, marginTop:10}
});

