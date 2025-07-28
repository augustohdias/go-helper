# Go Helper

Uma extensão do VS Code para criação automática de componentes de serviços web em Go seguindo os princípios da Clean Architecture.

## ✨ Funcionalidades

### 🔧 Criação de Service
Cria automaticamente 3 arquivos para um novo serviço:
- `internal/application/services/<nome>_service.go` - Implementação concreta do serviço
- `internal/domain/usecases/<nome>_usecase.go` - Interface do caso de uso
- `internal/main/factories/services/<nome>_factory.go` - Factory singleton

### 🗄️ Criação de Repository
Cria automaticamente 3 arquivos para um novo repositório:
- `internal/infra/databases/repositories/<nome>_repository.go` - Implementação do repositório
- `internal/application/contracts/repositories/<nome>_repository_contract.go` - Interface do contrato
- `internal/main/factories/repositories/<nome>_factory.go` - Factory singleton

### 🏗️ Criação de Entity
Cria automaticamente:
- `internal/domain/entities/<nome>.go` - Entidade de domínio com métodos básicos

### 🌐 Criação de Controller
Cria automaticamente 2 arquivos para um novo controller:
- `internal/presentation/controllers/<nome>_controller.go` - Controller REST com handlers CRUD
- `internal/main/factories/controllers/<nome>_controller_factory.go` - Factory singleton

### 📦 Criação de DTO
Cria automaticamente:
- `internal/domain/dto/<nome>_dto.go` - DTOs para Request e Response com métodos de conversão

### ⚙️ Configurações Personalizáveis
- **Módulo Go**: Configure o nome do módulo uma vez
- **Caminhos Customizáveis**: Defina onde cada tipo de arquivo será criado
- **Flexibilidade Total**: Adapte a qualquer estrutura de projeto

## 📋 Instalação

### Via Marketplace (Recomendado)
1. Abra o VS Code
2. Vá para a aba Extensions (`Ctrl+Shift+X`)
3. Busque por "Go Helper"
4. Clique em "Install"

### Via VSCE (Desenvolvimento)
```bash
# Clone o repositório
git clone <seu-repositorio>
cd GoHelper

# Instale as dependências
npm install

# Compile a extensão
npm run compile

# Instale o VSCE globalmente (se não tiver)
npm install -g vsce

# Gere o pacote .vsix
vsce package

# Instale a extensão
code --install-extension go-helper-0.1.4.vsix
```

### Via Arquivo .vsix
1. Baixe o arquivo `go-helper-0.1.4.vsix`
2. No VS Code: `Ctrl+Shift+P` → "Extensions: Install from VSIX"
3. Selecione o arquivo baixado

## 🎮 Como Usar

### Via Atalhos de Teclado
| Comando | Atalho Windows/Linux | Atalho macOS |
|---------|---------------------|--------------|
| Create Service | `Ctrl+Alt+S` | `Cmd+Alt+S` |
| Create Repository | `Ctrl+Alt+R` | `Cmd+Alt+R` |
| Create Entity | `Ctrl+Alt+E` | `Cmd+Alt+E` |
| Create Controller | `Ctrl+Alt+C` | `Cmd+Alt+C` |
| Create DTO | `Ctrl+Alt+D` | `Cmd+Alt+D` |

### Via Command Palette
1. Abra o Command Palette (`Ctrl+Shift+P` ou `Cmd+Shift+P`)
2. Digite e selecione:
   - `Go Helper: Create Service`
   - `Go Helper: Create Repository`
   - `Go Helper: Create Entity`
   - `Go Helper: Create Controller`
   - `Go Helper: Create DTO`

### Via Context Menu
1. Clique com o botão direito em qualquer pasta no Explorer
2. Selecione o comando desejado do grupo "Go Helper"
3. Digite o nome do componente

## ⚙️ Configurações

Acesse as configurações em: `File` → `Preferences` → `Settings` → busque por "Go Helper"

### Configurações Disponíveis

| Configuração | Padrão | Descrição |
|--------------|--------|-----------|
| `goHelper.moduleName` | *(vazio)* | Nome do módulo Go (ex: github.com/user/project) |
| `goHelper.paths.services` | `internal/application/services` | Caminho onde services serão criados |
| `goHelper.paths.usecases` | `internal/domain/usecases` | Caminho onde usecases serão criados |
| `goHelper.paths.entities` | `internal/domain/entities` | Caminho onde entities serão criadas |
| `goHelper.paths.dtos` | `internal/domain/dto` | Caminho onde DTOs serão criados |
| `goHelper.paths.repositories` | `internal/infra/databases/repositories` | Caminho onde repositories serão criados |
| `goHelper.paths.repositoryContracts` | `internal/application/contracts/repositories` | Caminho onde contratos serão criados |
| `goHelper.paths.controllers` | `internal/presentation/controllers` | Caminho onde controllers serão criados |
| `goHelper.paths.serviceFactories` | `internal/main/factories/services` | Caminho onde factories de services serão criados |
| `goHelper.paths.repositoryFactories` | `internal/main/factories/repositories` | Caminho onde factories de repositories serão criados |
| `goHelper.paths.controllerFactories` | `internal/main/factories/controllers` | Caminho onde factories de controllers serão criados |

### Exemplo de Configuração Personalizada

No seu `settings.json`:
```json
{
  "goHelper.moduleName": "github.com/meuuser/meuprojeto",
  "goHelper.paths.entities": "pkg/domain/models",
  "goHelper.paths.dtos": "pkg/api/dto",
  "goHelper.paths.controllers": "pkg/handlers"
}
```

## 🏗️ Estrutura de Arquivos Gerada

### Estrutura Padrão Completa
```
internal/
├── application/
│   ├── contracts/
│   │   └── repositories/
│   │       └── user_repository_contract.go
│   └── services/
│       └── user_service.go
├── domain/
│   ├── dto/
│   │   └── user_dto.go
│   ├── entities/
│   │   └── user.go
│   └── usecases/
│       └── user_usecase.go
├── infra/
│   └── databases/
│       └── repositories/
│           └── user_repository.go
├── main/
│   └── factories/
│       ├── controllers/
│       │   └── user_controller_factory.go
│       ├── repositories/
│       │   └── user_factory.go
│       └── services/
│           └── user_factory.go
└── presentation/
    └── controllers/
        └── user_controller.go
```

## 🎯 Detecção Automática do Módulo

### Prioridade de Detecção
1. **Configuração Manual**: `goHelper.moduleName` no settings
2. **Detecção Automática**: Leitura do arquivo `go.mod`
3. **Input do Usuário**: Solicitação manual como fallback

### Exemplo de go.mod
```go
module github.com/meuusuario/meu-projeto

go 1.21
```

Resultará em imports como:
```go
import "github.com/meuusuario/meu-projeto/internal/domain/usecases"
```

## 📝 Exemplos de Código Gerado

### Entity (user.go)
```go
package entities

import "time"

// User represents a user entity in the domain
type User struct {
    ID        string    `json:"id"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
    // TODO: Add your entity fields here
}

func NewUser() *User {
    now := time.Now()
    return &User{
        CreatedAt: now,
        UpdatedAt: now,
    }
}
```

### DTO (user_dto.go)
```go
package dto

import "time"

// UserRequestDTO represents the request data for user operations
type UserRequestDTO struct {
    // TODO: Add your request fields here
    // Name  string `json:"name" validate:"required"`
    // Email string `json:"email" validate:"required,email"`
}

// UserResponseDTO represents the response data for user operations
type UserResponseDTO struct {
    ID        string    `json:"id"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
    // TODO: Add your response fields here
}
```

### Controller (user_controller.go)
```go
package controllers

import (
    "encoding/json"
    "net/http"
    
    "github.com/meuusuario/meu-projeto/internal/domain/usecases"
    "github.com/meuusuario/meu-projeto/internal/main/factories/services"
)

// UserController handles HTTP requests for user operations
type UserController struct {
    userUseCase usecases.UserUseCase
}

func NewUserController() *UserController {
    return &UserController{
        userUseCase: services.MakeUser(),
    }
}

// Create handles POST /users
func (c *UserController) Create(w http.ResponseWriter, r *http.Request) {
    // TODO: Implement create logic
    w.Header().Set("Content-Type", "application/json")
    
    response := map[string]interface{}{
        "message": "User created successfully",
        "status":  "success",
    }
    
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(response)
}
```

## 🔧 Desenvolvimento

### Pré-requisitos
- Node.js >= 16
- VS Code >= 1.74.0

### Setup Local
```bash
# Clone o repositório
git clone <seu-repositorio>
cd GoHelper

# Instale as dependências
npm install

# Compile a extensão
npm run compile

# Execute em modo watch
npm run watch
```

### Estrutura do Projeto
```
GoHelper/
├── src/
│   └── extension.ts        # Código principal da extensão
├── templates/              # Templates Go organizados
│   ├── controllers/
│   ├── dtos/
│   ├── entities/
│   ├── repositories/
│   └── services/
├── package.json           # Configuração da extensão
└── README.md
```

### Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Roadmap

- [ ] Templates para Middlewares
- [ ] Templates para Tests unitários
- [ ] Suporte a diferentes frameworks (Gin, Echo, Fiber)
- [ ] Templates para gRPC services
- [ ] Configuração de banco de dados automática

## 🐛 Problemas Conhecidos

- Certifique-se de ter um `go.mod` válido na raiz do projeto
- A extensão funciona melhor em projetos Go com estrutura Clean Architecture
- Configurações são salvas por workspace

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 🤝 Suporte

Se você encontrar algum problema ou tiver sugestões, por favor:
1. Abra uma [issue](https://github.com/augustohdias/go-helper/issues)
2. Descreva o problema detalhadamente
3. Inclua informações sobre sua versão do VS Code e sistema operacional

---
