OndePassa

integrantes: 

Diego Souza Melo - RA: 2040482422016

Como executar

Backend
-Abra o terminal na pasta backend do projeto.
-Instale as dependências com o comando:
    npm i
-Crie um arquivo chamado .env dentro da pasta backend, utilizando o arquivo .env.example como modelo.
-No arquivo .env, adicione o token de leitura da API do TMDB no campo.

Como obter o token do TMDB:
Para novos usuários: 
-acesse o site do TMDB   
-crie uma conta. Na tela inicial, acesse a opção de documentação da API.
-Escolha a opção Yes e aceite os termos de uso.
-Preencha as informações solicitadas sobre o aplicativo.
-Após concluir o cadastro, clique no seu perfil e acesse a opção API.
-Copie o Token de leitura da API.

Para usuários que já possuem uma conta: 
-basta acessar o perfil, entrar na opção API e copiar o Token de leitura da API.

-Com as configurações concluídas, inicie o servidor backend utilizando o comando:
npm run dev

Aplicativo
-Abra outro terminal na pasta mobile do projeto.
-Instale as dependências com o comando:
    npm i
Acesse a pasta mobile/src/utils e abra o arquivo backendClient.js.
Altere o endereço IP do arquivo para o endereço IP local da máquina.

Como encontrar o endereço IP da sua máquina?
-No Windows, abra o Prompt de Comando e execute ipconfig.
-Procure pelo campo Endereço IPv4.
-Utilize esse endereço no arquivo backendClient.js.

Com o backend em execução e o IP configurado, inicie o aplicativo com o comando:
-npx expo start
-Aguarde a exibição do QR Code no terminal.
-Instale o aplicativo Expo Go no seu celular, caso ainda não tenha instalado.
-Conecte o celular e o computador à mesma rede wifi e escaneie o QR Code utilizando o Expo Go.


