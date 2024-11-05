import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

// Criando meus próprios componentes
export default function MeuBotao(props) {
  //as props são os atributos passados para o componente
  //as props só transitam de pai para filho (de cima para baixo no VDOM)
  //console.log(props.cor);

  return (
    <TouchableHighlight
      onPress={props.aoClicar}
      style={{...styles.botao, backgroundColor: props.cor}}>
      <Text>Incrementar</Text>
    </TouchableHighlight>
  );
}

// Estilização com react-native core-components
const styles = StyleSheet.create({
  botao: {
    width: 200,
    height: 50,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});
