import { FlatList, StyleSheet, Text, View } from 'react-native'
import CartaoFilme from './CartaoFilme'

export default function ListaFilmes({ titulo, filmes }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <FlatList
        data={filmes}
        keyExtractor={(filme) => String(filme.id)}
        renderItem={({ item }) => (
          <CartaoFilme
            titulo={item.titulo}
            ano={item.ano}
            nota={item.nota}
            poster={item.poster}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12
  }
})