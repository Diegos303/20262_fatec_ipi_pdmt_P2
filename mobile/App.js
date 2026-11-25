import { StyleSheet, View, Text } from 'react-native'
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Cabecalho from './src/components/Cabecalho'
import Creditos from './src/components/Creditos'
import Carregando from './src/components/Carregando'
import ListaFilmes from './src/components/ListaFilmes'
import backendClient from './src/utils/backendClient'
import { useEffect,useState } from 'react'



export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    backendClient.get('/em-alta')
      .then((resposta) => {
        setEmAlta(resposta.data)
        setCarregando(false)
      })
      .catch((erro) => {
        console.log(erro)
        setErro('Não foi possível carregar os filmes. Verifique se o backend está no ar.')
        setCarregando(false)
      })
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho />
        <View style={styles.conteudo}>
          {carregando ? (
            <Carregando mensagem="Buscando os filmes em alta..." />
          ) : erro ? (
            <Text style={styles.erro}>{erro}</Text>
          ) : (
            <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} />
          )}
        </View>  
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E'
  },
  conteudo: {
    flex: 1
  },
  erro: {
    fontSize: 16,
    color: '#E0473C',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 24
  }

})