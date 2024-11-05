/*
  import React, {useState} from 'react';
  O React é um export default, pois está sem as chaves.
  O useState é um export nomeado, pois está entre chaves.
  As chaves são utilizadas para "destructuring" (desestruturação) de objetos (e um arquivo, ou módulo JS, é um objeto).

  Em resumo:
  Como o React é um export default, não precisamos das chaves.
  Como useState é um export nomeado, precisamos das chaves.
*/
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MeuBotao from './src/componentes/MeuBotao';

// Componente principal (O App é quem inicializa o aplicativo)
export default function App() {
  //State
  /*
    const [getter, setter] = useState(ValorInicial);
    O useState é um hook do React.
    Um detalhe importante sobre os states:
    Toda vez que qualquer uma delas mude o valor, o componente é renderizado novamente (pois, para o React, ele mudou de estado).
    Então, para evitar muitas renderizações, é necessário tomar cuidado com o uso de states.
  */
  const [cont, setCont] = useState(0);

  useEffect(() => {
    console.log('Componente foi montado');
    return () => {
      console.log('Componente foi desmontado');
    };
  }, []);

  useEffect(() => {
    console.log('Contador foi alterado');
  }, [cont]);

  useEffect(() => {
    console.log('Componente foi montado ou contador foi alterado');
  });

  //com o console.log podemos acompanhar o valor da state do console de debug
  console.log(cont);

  //JSX (JavaScript + XML)
  //Lembre disso: Todo componente React deve retornar um JSX.
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Contador: {cont}</Text>
      {/* As props são livres, e podemos utilizar qualquer nome para elas. */}
      <MeuBotao cor="green" aoClicar={() => setCont(cont + 1)} />
      <MeuBotao cor="red" aoClicar={() => setCont(cont - 1)} />
    </View>
  );
}

// Estilização com react-native core-components
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
});
