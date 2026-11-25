import { Image, StyleSheet, Text, View } from 'react-native'
import { formatarNota } from '../utils/formatacao'

export default function CartaoFilme({ titulo, ano, nota, poster }) {
  return (
    <View style={styles.cartao}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.semPoster]}>
          <Text style={styles.textoSemPoster}>Sem pôster</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{titulo}</Text>
        {ano ? <Text style={styles.ano}>{ano}</Text> : null}
        <Text style={styles.nota}>{formatarNota(nota)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    marginBottom: 14
  },
  poster: {
    width: 70,
    height: 105,
    borderRadius: 8
  },
  semPoster: {
    backgroundColor: '#4B4F63',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoSemPoster: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  ano: {
    fontSize: 14,
    color: '#9AA0B5',
    marginTop: 4
  },
  nota: {
    fontSize: 14,
    color: '#F5C518',
    marginTop: 4
  }
})