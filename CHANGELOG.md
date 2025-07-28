# Changelog

## [0.0.1] - 2024-01-01

### ✨ Added
- **Comando Create Service**: Cria automaticamente 3 arquivos para Services (implementação, interface, factory)
- **Comando Create Repository**: Cria automaticamente 3 arquivos para Repositories (implementação, contrato, factory)
- **Detecção Automática de Módulo Go**: Lê o arquivo `go.mod` para detectar automaticamente o nome do módulo
- **Fallback Manual**: Solicita o nome do módulo ao usuário se não conseguir detectar automaticamente
- **Menu de Contexto**: Comandos disponíveis via botão direito no Explorer
- **Command Palette**: Comandos disponíveis via `Ctrl+Shift+P`

### 🏗️ Architecture
- **Clean Architecture**: Estrutura de pastas seguindo os princípios da Clean Architecture
- **Factory Pattern**: Implementação de factories singleton com `sync.Once`
- **Dependency Injection**: Construtores preparados para injeção de dependências
- **Interface Segregation**: Separação clara entre interfaces e implementações

### 🔧 Features
- **Conversão Automática de Nomenclatura**: PascalCase → snake_case para arquivos
- **Criação Automática de Diretórios**: Cria toda a estrutura de pastas necessária
- **Templates Go Idiomáticos**: Código Go bem estruturado e documentado
- **Imports Inteligentes**: Gera imports corretos baseados no módulo detectado

### 📂 Generated Structure

#### Service Files:
- `internal/application/services/<nome>_service.go`
- `internal/domain/usecases/<nome>_usecase.go`
- `internal/main/factories/services/<nome>_factory.go`

#### Repository Files:
- `internal/infra/databases/repositories/<nome>_repository.go`
- `internal/application/contracts/repositories/<nome>_repository_contract.go`
- `internal/main/factories/repositories/<nome>_factory.go`

### 🎯 Usage
1. **Via Command Palette**: `Ctrl+Shift+P` → "Go Helper: Create Service/Repository"
2. **Via Context Menu**: Botão direito em pasta → "Create Service/Repository"
3. **Automatic Module Detection**: Detecta nome do módulo do `go.mod` automaticamente
4. **Manual Fallback**: Solicita entrada manual se não detectar automaticamente

### 🛠️ Technical Details
- **TypeScript**: Extensão desenvolvida em TypeScript
- **VS Code API**: Integração completa com APIs do VS Code
- **File System**: Criação automática de arquivos e diretórios
- **Pattern Matching**: Regex para extração do nome do módulo do go.mod
- **Error Handling**: Tratamento robusto de erros e fallbacks

### 📚 Documentation
- **README.md**: Documentação completa de uso
- **INSTALLATION.md**: Instruções de instalação e teste
- **Exemplos de Código**: Templates de código gerado documentados
- **Troubleshooting**: Guia de solução de problemas

### 🧪 Testing
- **Exemplos Funcionais**: Pasta `test-project` com exemplos dos arquivos gerados
- **Compilação**: Verificação de compilação sem erros
- **Validação**: Templates validados para sintaxe Go correta 