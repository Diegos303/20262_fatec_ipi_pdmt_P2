import {Pressable, StyleSheet, View, Text, TextInput } from 'react-native'

export default function Busca ({termo, onTermoAlterado, onBuscar, onLimpar }) {
  return (  
    <View style={styles.linha}>
      <TextInput
        style={styles.campo}
        value={termo}
        onChangeText={onTermoAlterado}
        placeholder="Digite o título de um filme"
        placeholderTextColor="#9AA0B5"
      />
      {termo !== '' ? (
        <Pressable style={styles.botao} onPress={onLimpar}>
          <Text style={styles.texto}>✕</Text>
        </Pressable>
      ) : null}
      <Pressable style={styles.botao} onPress={onBuscar}>
        <Text style={styles.texto}>Buscar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    color: '#FFFFFF'
  },
  botao: {
    padding: 8
  },
  texto: {
    color: '#FFFFFF'
  }
})