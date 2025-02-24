# Realtime Chat System

Um sistema de chat em tempo real completo, modular e escalável, com suporte a salas públicas e privadas, histórico de mensagens, notificações push e autenticação. O projeto utiliza Node.js, WebSockets, Redis, PostgreSQL e React com Shadcn UI, tudo rodando em contêineres Docker.

## Funcionalidades
- **Autenticação**: Registro e login de usuários com JWT.
- **Salas de Chat**: Públicas e privadas com controle de acesso.
- **Histórico de Mensagens**: Persistência em PostgreSQL.
- **Notificações Push**: Via Web Push API para alertas fora do navegador.
- **Tempo Real**: Comunicação via WebSocket com propagação via Redis Pub/Sub.
- **Escalabilidade**: Arquitetura modular e stateless com serviços separados.

## Pré-requisitos
- **Docker**: Instalado e rodando.
- **Docker Compose**: Para orquestração dos serviços.

## Configuração
1. **Clone o repositório**:
   ```bash
   git clone <https://github.com/angelino-valeta/realtime-chat-system>
   cd realtime-chat-system
   docker-compose up --build
O backend estará em http://localhost:3000.
O frontend estará em http://localhost:5173.