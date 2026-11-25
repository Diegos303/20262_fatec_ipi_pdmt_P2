import { StyleSheet, Text, View } from 'react-native'

export default function Creditos() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  texto: {
    fontSize: 10,
    color: '#9AA0B5',
    textAlign: 'center'
  }
})