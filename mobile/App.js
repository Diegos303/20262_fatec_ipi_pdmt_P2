import { StyleSheet, View, Text } from 'react-native'
import {SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Cabecalho from './src/components/Cabecalho'
import Creditos from './src/components/Creditos'
import Carregando from './src/components/Carregando'
import ListaFilmes from './src/components/ListaFilmes'
import backendClient from './src/utils/backendClient'
import { useEffect,useState } from 'react'
import Busca from './src/components/Busca'
import DetalhesFilme from './src/components/DetalhesFilme'


export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)
  const [buscando, setBuscando] = useState(false)
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
        setErro("Não foi possível carregar os filmes. Verifique se o backend está no ar.")
        setCarregando(false)
      })
  }, [])

  useEffect(() => {
    const termoLimpo = termo.trim()

    if (termoLimpo === '') {
      setResultados(null)
      setErro(null)
      setBuscando(false)
      return
    }

    if (termoLimpo.length < 3) {
      setBuscando(false)
      return
    }

    let ativa = true

    const agendamento = setTimeout(() => {
      setBuscando(true)
      backendClient.get('/filmes', {
        params: { busca: termoLimpo }
      })
        .then((resposta) => {
          if (!ativa) return
          setResultados(resposta.data)
          setTermoBuscado(termoLimpo)
          setErro(null)
          setBuscando(false)

        })
        .catch((erro) => {
          if (!ativa) return
          console.log(erro)
          setErro((erro.response && erro.response.data && erro.response.data.mensagem) || "Não foi possível buscar os filmes.")
          setBuscando(false)
        })
    }, 600)
    return () => {
      ativa = false
      clearTimeout(agendamento)
    }
  },[termo])

  const tamanhoDoTermo = termo.trim().length
  const limpar = () => {
    setTermo('')
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
            onLimpar={limpar}
            buscando={buscando}
          />

          {tamanhoDoTermo > 0 && tamanhoDoTermo < 3 ? (
            <Text style={styles.dica}>Digite pelo menos 3 letras</Text>
           ) : null}
           <View style={styles.conteudo}>
             {carregando ? (
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
            <DetalhesFilme 
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
  dica: {
    color: '#FFFFFF'
  },
  erro: {
    color: '#FFFFFF'
  }

})
