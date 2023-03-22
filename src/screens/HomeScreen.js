import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
// import {firebase,auth } from '../../firebaseconfig';
import {firebase,auth} from '../../firebaseconfig'
import { MenuButton } from '../components';

const tiles = [
  {
    title: `Room\nManagement`,
    screen:'Room'
  },
  {
    title: `Inventory\nManagement`,
    screen:'Inventory'
  },
  {
    title: `Food\nManagement`,
    screen:'Food'
  },
  {
    title: `House\nKeeping`,
    screen:'House'
  },
]

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('todos');
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    todoRef
    .orderBy('createdAt', 'desc')
    .onSnapshot( 
        querySnapshot => {
        const todos = []
        querySnapshot.forEach((doc) => {
            const {heading} = doc.data()
            todos.push({
                id: doc.id,
                heading,
            })
        })
        setTodos(todos)
        //console.log(users)
    })
}, [])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }


   


  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.buttonSignOut}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <View style={styles.menus}>
        {
          tiles.map((item ,i) => <MenuButton title={item.title} onPress={()=> navigation.navigate(item.screen)} key={i} />)
        }
        
      </View>

</View>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DAACF0',
    padding: 15,
    borderRadius: 15,
    margin:5,
    marginHorizontal: 10,
    flexDirection:'row',
    alignItems:'center'
},
innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft:45,
},

itemHeading: {
    fontWeight: 'bold',
    fontSize:18,
    marginRight:22
},
formContainer: {
    flexDirection: 'row',
    height: 50,
    marginLeft:10,
    marginRight: 10,
    marginTop:100
},
buttonSignOut: {
    backgroundColor: '#F03729',
    width: '100%',
    padding: 10,
    borderRadius: 0,
    // marginTop: 100,
    // marginBottom:-90,
    alignItems:"center",
},

input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#E7C1F7',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5
},
button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#BD2BF7',
    width: 80,
    alignItems: "center",
    justifyContent: 'center'
},
buttonText: {
    color: 'white',
    fontSize: 20
},

todoIcon:{
    marginTop:10,
    fontSize:20,
    marginLeft:14,
},
menus: {
  flexDirection:'row',
  flexWrap: 'wrap',
  justifyContent:'center'
}
});

export default HomeScreen