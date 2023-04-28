# Auxiliador para o Jogo Academia

## Descrição do Projeto

O Auxiliador para o Jogo Academia é uma aplicação desenvolvida em React com TypeScript que oferece suporte e funcionalidades adicionais para o jogo de palavras chamado "Academia". Este auxiliador possui duas funções principais: Jogador e Moderador.

- **Jogador:** Como jogador, você tem a capacidade de cadastrar um card com a palavra da rodada, a definição e o seu nome. Esses cards são compartilhados com o moderador para ser usado na partida.

- **Moderador:** Como moderador, você tem a responsabilidade de cadastrar a resposta correta para a rodada. Além disso, você receberá os cards gerados pelos jogadores. Depois de coletar todos os cards, você pode pontuá-los de acordo com as regras do jogo e conduzir a partida.

## Funcionalidades Principais

O Auxiliador para o Jogo Academia possui as seguintes funcionalidades principais:

1. **Cadastro de Cards:** Os jogadores podem cadastrar cards com a definição, a palavra e o nome do jogador.
2. **Compartilhamento de Cards:** Os cards cadastrados pelos jogadores são compartilhados com o moderador.
3. **Cadastro de Resposta Correta:** O moderador pode cadastrar a resposta correta para a rodada.
4. **Pontuação dos Cards:** O moderador pode pontuar os cards de acordo com as regras do jogo.
5. **Finalização da rodada:** O moderador pode finalizar a rodada e com isso apagar todos os cards gerados para essa rodada.

## Configuração do Projeto

Siga as etapas abaixo para configurar e executar o Auxiliador para o Jogo Academia localmente:

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Faça o clone deste repositório para o seu ambiente local.
3. Acesse o diretório do projeto no terminal.
4. Execute o comando `npm install` para instalar todas as dependências necessárias.
5. Execute o comando `npm start` para iniciar a aplicação.
6. Acesse a aplicação no seu navegador usando o endereço `http://localhost:3000`.

## Tecnologias Utilizadas

O Auxiliador para o Jogo Academia foi desenvolvido utilizando as seguintes tecnologias:

- React: uma biblioteca JavaScript de código aberto para criar interfaces de usuário.
- TypeScript: uma linguagem de programação baseada em JavaScript que adiciona tipagem estática opcional ao código.
- Socket.IO: uma biblioteca que permite a comunicação em tempo real entre cliente e servidor por meio de WebSockets. Utilizamos o `socket.io-client` para receber as respostas dos jogadores.
- Axios: uma biblioteca para fazer requisições HTTP a um servidor. Utilizamos o Axios para se conectar ao backend e realizar a criação e deleção das respostas.
- Material-UI: uma biblioteca de componentes React que segue as diretrizes de design do Material Design. Utilizamos o Material-UI para ajudar a estilizar e construir a interface do usuário do Auxiliador.


## Deploy

O Auxiliador para o Jogo Academia pode ser facilmente implantado usando o GitHub Pages. Siga as etapas abaixo para realizar o deploy do projeto:

1. Certifique-se de ter o Git instalado em sua máquina e uma conta no GitHub.
2. Faça o clone deste repositório para o seu ambiente local, caso ainda não tenha feito.
3. Acesse o diretório do projeto no terminal.
4. Execute o comando `npm run deploy`.
5. Aguarde até que o processo de build e deploy seja concluído.
6. Após a conclusão, o Auxiliador será implantado no GitHub Pages e estará disponível no seguinte URL: `https://seu-nome-de-usuario.github.io/nome-do-repositorio`.

Obs: Está disponível no URL: `https://igorcruzf.github.io/academia_boardgame`.

## Repositório do Backend

O código-fonte do backend do Jogo Academia está disponível no seguinte repositório do GitHub: [academia_boardgame_backend](https://github.com/igorcruzf/academia_boardgame_backend). 