import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function App (){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.102:8000/api/login')
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24,backgroundColor:"red",alignItems:"center",justifyContent:"center",marginTop:50 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <View>
            
            <Text>{item.email.toString()},{item.name.toString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};