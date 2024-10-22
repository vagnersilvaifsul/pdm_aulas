import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

function MeuBotao(props) {
  console.log(props.cor);

  return (
    <TouchableHighlight
      onPress={props.aoClicar}
      style={{...styles.botao, backgroundColor: props.cor}}>
      <Text>Incrementar</Text>
    </TouchableHighlight>
  );
}

export default function App() {
  //State
  const [cont, setCont] = useState(0);

  console.log(cont);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Contador: {cont}</Text>
      <MeuBotao cor="blue" aoClicar={() => setCont(cont + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
  texto: {
    color: 'red',
    fontSize: 20,
  },
  botao: {
    width: 200,
    height: 50,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});
