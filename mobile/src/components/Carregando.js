import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function Carregando({ mensagem = 'Carregando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#E0473C" />
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mensagem: {
    marginTop: 12,
    fontSize: 16,
    color: '#FFFFFF'
  }
})