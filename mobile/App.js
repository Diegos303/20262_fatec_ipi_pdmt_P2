import { StyleSheet, View, Text } from 'react-native'
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Cabecalho from './src/components/Cabecalho'
import Creditos from './src/components/Creditos'
import Carregando from './src/components/Carregando'
import ListaFilmes from './src/components/ListaFilmes'
import backendClient from './src/utils/backendClient'
import { useEffect,useState } from 'react'
import Busca from './src/components/Busca'
import DetalhesFilmes from './src/components/DetalhesFilme'


export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)
  const [procurando, setProcurando] = useState(false)
  const [termo, setTermo] = useState('')
  const [filmeSelecionado, setFilmeSelecionado] = useState(null)

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

  const buscar = () => {
    setProcurando(true)
    backendClient.get('/filmes',{
      params: { busca: termo } 
    })
    .then((resposta) => {
      setResultados(resposta.data)
      setTermoBuscado(termo)
      setErro(null)
      setProcurando(false)
    })
    .catch((erro) => {
      console.log(erro)
      setErro((erro.response && erro.response.data && erro.response.data.mensagem) || 'Não foi possível buscar os filmes.')
      setProcurando(false)
    })
  }

  const limpar = () => {
    setTermo('')
    setResultados(null)
    setErro(null)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho />
        {filmeSelecionado === null ? (
         <View style={styles.container}> 
          <Busca
            termo={termo}
            onTermoAlterado={setTermo}
            onBuscar={buscar}
            onLimpar={limpar}
          />
          <View style={styles.conteudo}>
            {procurando ? (
              <Carregando mensagem='Procurando filmes...'/>
            )
            : carregando ? (
              <Carregando mensagem="Buscando os filmes em alta..." />
            ) : erro ? (
              <Text style={styles.erro}>{erro}</Text>
            ) : resultados === null ? (
              <ListaFilmes 
                titulo="Em alta nesta semana" 
                filmes={emAlta}
                onSelecionar={setFilmeSelecionado} 
              />
            ) : resultados.length === 0 ? (
              <Text style={styles.erro}>
                {`Nenhum filme encontrado para “${termoBuscado}”.`}
              </Text>
            ) : (
              <ListaFilmes
                titulo={`Resultados para “${termoBuscado}”`}
                filmes={resultados}
                onSelecionar={setFilmeSelecionado}
              />
            )}
          </View>
        </View>
        ) : (
          <View style={styles.conteudo}>
            <DetalhesFilmes 
              id={filmeSelecionado}
              onVoltar={() => setFilmeSelecionado(null)}
            />
          </View>
        )}  
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
    color: '#FFFFFF'
  }

})
