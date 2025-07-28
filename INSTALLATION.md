# Instruções de Instalação e Teste

## 📦 Como Instalar a Extensão

### Método 1: Desenvolvimento Local
1. Clone este repositório
2. Abra o projeto no VS Code
3. Execute os comandos:
   ```bash
   npm install
   npm run compile
   ```
4. Pressione `F5` para abrir uma nova janela do VS Code com a extensão carregada

### Método 2: Empacotamento VSIX
1. Instale o vsce (VS Code Extension CLI):
   ```bash
   npm install -g vsce
   ```
2. Empacote a extensão:
   ```bash
   vsce package
   ```
3. Instale o arquivo .vsix gerado:
   ```bash
   code --install-extension go-helper-0.0.1.vsix
   ```

## 🧪 Como Testar

### Teste Básico
1. Abra uma pasta vazia no VS Code
2. Pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac)
3. Digite "Go Helper"
4. Selecione "Create Service" ou "Create Repository"
5. Digite um nome (ex: "User", "Product", "Order")
6. Verifique se os arquivos foram criados na estrutura correta

### Teste via Context Menu
1. Clique com botão direito em qualquer pasta no Explorer
2. Verifique se aparecem as opções "Create Service" e "Create Repository"
3. Teste criando componentes

### Estrutura Esperada

#### Para Service "User":
```
internal/
├── application/services/user_service.go
├── domain/usecases/user_usecase.go
└── main/factories/services/user_factory.go
```

#### Para Repository "Product":
```
internal/
├── application/contracts/repositories/product_repository_contract.go
├── infra/databases/repositories/product_repository.go
└── main/factories/repositories/product_factory.go
```

## 🔧 Funcionalidades Implementadas

✅ **Comando "Create Service"**
- Cria implementação concreta do serviço
- Cria interface do caso de uso
- Cria factory singleton

✅ **Comando "Create Repository"**
- Cria implementação concreta do repositório
- Cria interface do contrato
- Cria factory singleton

✅ **Menu de Contexto**
- Comandos disponíveis ao clicar com botão direito
- Integração com Explorer do VS Code

✅ **Convenções de Nomenclatura**
- Conversão automática para snake_case nos nomes de arquivos
- Conversão automática para PascalCase nos tipos
- Conversão automática para camelCase nas variáveis

✅ **Criação Automática de Diretórios**
- Cria toda a estrutura de pastas automaticamente
- Segue os padrões da Clean Architecture

## 🐛 Debugging

### Se a extensão não aparecer:
1. Verifique se a compilação foi bem-sucedida: `npm run compile`
2. Recarregue a janela do VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Verifique o console de desenvolvedor: `Help` → `Toggle Developer Tools`

### Se os comandos não funcionarem:
1. Verifique se há erros no console
2. Confirme se você está em um workspace válido
3. Teste criando uma pasta de projeto primeiro

## 📁 Estrutura do Projeto da Extensão

```
/
├── src/
│   └── extension.ts          # Código principal da extensão
├── out/
│   ├── extension.js          # Código compilado
│   └── extension.js.map      # Source map
├── test-project/             # Exemplo de arquivos gerados
├── package.json              # Configuração da extensão
├── tsconfig.json            # Configuração TypeScript
├── README.md                # Documentação principal
└── INSTALLATION.md          # Este arquivo
```

## 🚀 Próximos Passos

Para melhorar a extensão, considere implementar:

1. **Templates Customizáveis**: Permitir que o usuário customize os templates
2. **Configurações**: Adicionar configurações para nomes de packages
3. **Validação**: Validar nomes de entrada
4. **Múltiplos Frameworks**: Suporte para diferentes frameworks Go
5. **Import Auto-completion**: Detectar automaticamente o nome do módulo Go

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do VS Code
2. Confirme que todas as dependências estão instaladas
3. Teste em um projeto Go limpo
4. Reporte issues com exemplos específicos 