import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function toSnakeCase(str: string): string {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
}

function getConfiguration() {
    const config = vscode.workspace.getConfiguration('goHelper');
    return {
        moduleName: config.get<string>('moduleName', ''),
        paths: {
            services: config.get<string>('paths.services', 'internal/application/services'),
            usecases: config.get<string>('paths.usecases', 'internal/domain/usecases'),
            entities: config.get<string>('paths.entities', 'internal/domain/entities'),
            dtos: config.get<string>('paths.dtos', 'internal/domain/dto'),
            repositories: config.get<string>('paths.repositories', 'internal/infra/databases/repositories'),
            repositoryContracts: config.get<string>('paths.repositoryContracts', 'internal/application/contracts/repositories'),
            controllers: config.get<string>('paths.controllers', 'internal/presentation/controllers'),
            serviceFactories: config.get<string>('paths.serviceFactories', 'internal/main/factories/services'),
            repositoryFactories: config.get<string>('paths.repositoryFactories', 'internal/main/factories/repositories'),
            controllerFactories: config.get<string>('paths.controllerFactories', 'internal/main/factories/controllers')
        }
    };
}

async function ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
        await fs.promises.access(dirPath);
    } catch {
        await fs.promises.mkdir(dirPath, { recursive: true });
    }
}

async function detectGoModuleName(workspaceRoot: string): Promise<string> {
    const config = getConfiguration();
    
    
    if (config.moduleName && config.moduleName.trim() !== '') {
        return config.moduleName.trim();
    }
    
    try {
        const goModPath = path.join(workspaceRoot, 'go.mod');
        const goModContent = await fs.promises.readFile(goModPath, 'utf8');
        
        
        const moduleMatch = goModContent.match(/^module\s+(.+)$/m);
        if (moduleMatch) {
            return moduleMatch[1].trim();
        }
    } catch (error) {
        console.error('Erro ao detectar nome do módulo Go:', error);
    }
    
    
    const moduleName = await vscode.window.showInputBox({
        prompt: 'Nome do módulo Go não detectado. Digite o nome do módulo (ex: github.com/user/project)',
        placeHolder: 'github.com/user/project',
        value: 'github.com/your-project'
    });
    
    return moduleName || 'github.com/your-project';
}

interface TemplateVariables {
    name: string;
    capitalizedName: string;
    camelCaseName: string;
    snakeName: string;
    moduleName: string;
}

async function loadAndProcessTemplate(templatePath: string, variables: TemplateVariables, extensionPath: string): Promise<string> {
    try {
        const fullTemplatePath = path.join(extensionPath, templatePath);
        let templateContent = await fs.promises.readFile(fullTemplatePath, 'utf8');
        
        
        templateContent = templateContent.replace(/\{\{name\}\}/g, variables.name);
        templateContent = templateContent.replace(/\{\{capitalizedName\}\}/g, variables.capitalizedName);
        templateContent = templateContent.replace(/\{\{camelCaseName\}\}/g, variables.camelCaseName);
        templateContent = templateContent.replace(/\{\{snakeName\}\}/g, variables.snakeName);
        templateContent = templateContent.replace(/\{\{moduleName\}\}/g, variables.moduleName);
        
        return templateContent;
    } catch (error) {
        throw new Error(`Erro ao carregar template ${templatePath}: ${error}`);
    }
}

async function createService(name: string, workspaceRoot: string, extensionPath: string): Promise<void> {
    try {
        const snakeName = toSnakeCase(name);
        const moduleName = await detectGoModuleName(workspaceRoot);
        const config = getConfiguration();
        
        const variables: TemplateVariables = {
            name,
            capitalizedName: capitalize(name),
            camelCaseName: toCamelCase(name),
            snakeName,
            moduleName
        };
        
        
        const serviceDir = path.join(workspaceRoot, config.paths.services);
        const usecaseDir = path.join(workspaceRoot, config.paths.usecases);
        const factoryDir = path.join(workspaceRoot, config.paths.serviceFactories);
        
        await ensureDirectoryExists(serviceDir);
        await ensureDirectoryExists(usecaseDir);
        await ensureDirectoryExists(factoryDir);
        
        
        const serviceContent = await loadAndProcessTemplate('templates/services/service_implementation.go.template', variables, extensionPath);
        const usecaseContent = await loadAndProcessTemplate('templates/services/usecase.go.template', variables, extensionPath);
        const factoryContent = await loadAndProcessTemplate('templates/services/service_factory.go.template', variables, extensionPath);
        
        
        const serviceFile = path.join(serviceDir, `${snakeName}_service.go`);
        const usecaseFile = path.join(usecaseDir, `${snakeName}_usecase.go`);
        const factoryFile = path.join(factoryDir, `${snakeName}_factory.go`);
        
        await fs.promises.writeFile(serviceFile, serviceContent);
        await fs.promises.writeFile(usecaseFile, usecaseContent);
        await fs.promises.writeFile(factoryFile, factoryContent);
        
        vscode.window.showInformationMessage(`Service '${name}' criado com sucesso!`);
        
        
        const document = await vscode.workspace.openTextDocument(serviceFile);
        await vscode.window.showTextDocument(document);
        
    } catch (error) {
        vscode.window.showErrorMessage(`Erro ao criar service: ${error}`);
    }
}

async function createRepository(name: string, workspaceRoot: string, extensionPath: string): Promise<void> {
    try {
        const snakeName = toSnakeCase(name);
        const moduleName = await detectGoModuleName(workspaceRoot);
        const config = getConfiguration();
        
        const variables: TemplateVariables = {
            name,
            capitalizedName: capitalize(name),
            camelCaseName: toCamelCase(name),
            snakeName,
            moduleName
        };
        
        
        const repositoryDir = path.join(workspaceRoot, config.paths.repositories);
        const contractDir = path.join(workspaceRoot, config.paths.repositoryContracts);
        const factoryDir = path.join(workspaceRoot, config.paths.repositoryFactories);
        
        await ensureDirectoryExists(repositoryDir);
        await ensureDirectoryExists(contractDir);
        await ensureDirectoryExists(factoryDir);
        
        
        const repositoryContent = await loadAndProcessTemplate('templates/repositories/repository_implementation.go.template', variables, extensionPath);
        const contractContent = await loadAndProcessTemplate('templates/repositories/repository_contract.go.template', variables, extensionPath);
        const factoryContent = await loadAndProcessTemplate('templates/repositories/repository_factory.go.template', variables, extensionPath);
        
        
        const repositoryFile = path.join(repositoryDir, `${snakeName}_repository.go`);
        const contractFile = path.join(contractDir, `${snakeName}_repository_contract.go`);
        const factoryFile = path.join(factoryDir, `${snakeName}_factory.go`);
        
        await fs.promises.writeFile(repositoryFile, repositoryContent);
        await fs.promises.writeFile(contractFile, contractContent);
        await fs.promises.writeFile(factoryFile, factoryContent);
        
        vscode.window.showInformationMessage(`Repository '${name}' criado com sucesso!`);
        
        
        const document = await vscode.workspace.openTextDocument(repositoryFile);
        await vscode.window.showTextDocument(document);
        
    } catch (error) {
        vscode.window.showErrorMessage(`Erro ao criar repository: ${error}`);
    }
}

async function createEntity(name: string, workspaceRoot: string, extensionPath: string): Promise<void> {
    try {
        const snakeName = toSnakeCase(name);
        const moduleName = await detectGoModuleName(workspaceRoot);
        const config = getConfiguration();
        
        const variables: TemplateVariables = {
            name,
            capitalizedName: capitalize(name),
            camelCaseName: toCamelCase(name),
            snakeName,
            moduleName
        };
        
        
        const entityDir = path.join(workspaceRoot, config.paths.entities);
        
        await ensureDirectoryExists(entityDir);
        
        
        const entityContent = await loadAndProcessTemplate('templates/entities/entity.go.template', variables, extensionPath);
        
        
        const entityFile = path.join(entityDir, `${snakeName}.go`);
        
        await fs.promises.writeFile(entityFile, entityContent);
        
        vscode.window.showInformationMessage(`Entity '${name}' criada com sucesso!`);
        
        
        const document = await vscode.workspace.openTextDocument(entityFile);
        await vscode.window.showTextDocument(document);
        
    } catch (error) {
        vscode.window.showErrorMessage(`Erro ao criar entity: ${error}`);
    }
}

async function createController(name: string, workspaceRoot: string, extensionPath: string): Promise<void> {
    try {
        const snakeName = toSnakeCase(name);
        const moduleName = await detectGoModuleName(workspaceRoot);
        const config = getConfiguration();
        
        const variables: TemplateVariables = {
            name,
            capitalizedName: capitalize(name),
            camelCaseName: toCamelCase(name),
            snakeName,
            moduleName
        };
        
        
        const controllerDir = path.join(workspaceRoot, config.paths.controllers);
        const factoryDir = path.join(workspaceRoot, config.paths.controllerFactories);
        
        await ensureDirectoryExists(controllerDir);
        await ensureDirectoryExists(factoryDir);
        
        const controllerContent = await loadAndProcessTemplate('templates/controllers/controller.go.template', variables, extensionPath);
        const factoryContent = await loadAndProcessTemplate('templates/controllers/controller_factory.go.template', variables, extensionPath);
        
        
        const controllerFile = path.join(controllerDir, `${snakeName}_controller.go`);
        const factoryFile = path.join(factoryDir, `${snakeName}_controller_factory.go`);
        
        await fs.promises.writeFile(controllerFile, controllerContent);
        await fs.promises.writeFile(factoryFile, factoryContent);
        
        vscode.window.showInformationMessage(`Controller '${name}' criado com sucesso!`);
        
        
        const document = await vscode.workspace.openTextDocument(controllerFile);
        await vscode.window.showTextDocument(document);
        
    } catch (error) {
        vscode.window.showErrorMessage(`Erro ao criar controller: ${error}`);
    }
}

async function createDTO(name: string, workspaceRoot: string, extensionPath: string): Promise<void> {
    try {
        const snakeName = toSnakeCase(name);
        const moduleName = await detectGoModuleName(workspaceRoot);
        const config = getConfiguration();
        
        const variables: TemplateVariables = {
            name,
            capitalizedName: capitalize(name),
            camelCaseName: toCamelCase(name),
            snakeName,
            moduleName
        };
        
        
        const dtoDir = path.join(workspaceRoot, config.paths.dtos);
        
        await ensureDirectoryExists(dtoDir);
        
        
        const dtoContent = await loadAndProcessTemplate('templates/dtos/dto.go.template', variables, extensionPath);
        
        
        const dtoFile = path.join(dtoDir, `${snakeName}_dto.go`);
        
        await fs.promises.writeFile(dtoFile, dtoContent);
        
        vscode.window.showInformationMessage(`DTO '${name}' criado com sucesso!`);
        
        
        const document = await vscode.workspace.openTextDocument(dtoFile);
        await vscode.window.showTextDocument(document);
        
    } catch (error) {
        vscode.window.showErrorMessage(`Erro ao criar DTO: ${error}`);
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Go Helper está ativo!');

    let createEntityDisposable = vscode.commands.registerCommand('goHelper.createEntity', async () => {
        const name = await vscode.window.showInputBox({
            prompt: 'Digite o nome da Entidade (ex: User, Product, Order)',
            placeHolder: 'NomeDaEntidade'
        });
        
        if (!name) {
            vscode.window.showWarningMessage('Nome da entidade é obrigatório');
            return;
        }

        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceRoot) {
            vscode.window.showErrorMessage('Nenhum workspace aberto');
            return;
        }

        await createEntity(name, workspaceRoot, context.extensionPath);
    });

    let createServiceDisposable = vscode.commands.registerCommand('goHelper.createService', async () => {
        const name = await vscode.window.showInputBox({
            prompt: 'Digite o nome do Service (ex: User, Product, Order)',
            placeHolder: 'NomeDoService'
        });

        if (!name) {
            vscode.window.showWarningMessage('Nome do service é obrigatório');
            return;
        }

        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceRoot) {
            vscode.window.showErrorMessage('Nenhum workspace aberto');
            return;
        }

        await createService(name, workspaceRoot, context.extensionPath);
    });
    
    let createRepositoryDisposable = vscode.commands.registerCommand('goHelper.createRepository', async () => {
        const name = await vscode.window.showInputBox({
            prompt: 'Digite o nome do Repository (ex: User, Product, Order)',
            placeHolder: 'NomeDoRepository'
        });

        if (!name) {
            vscode.window.showWarningMessage('Nome do repository é obrigatório');
            return;
        }

        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceRoot) {
            vscode.window.showErrorMessage('Nenhum workspace aberto');
            return;
        }

        await createRepository(name, workspaceRoot, context.extensionPath);
    });

    
    let createControllerDisposable = vscode.commands.registerCommand('goHelper.createController', async () => {
        const name = await vscode.window.showInputBox({
            prompt: 'Digite o nome do Controller (ex: User, Product, Order)',
            placeHolder: 'NomeDoController'
        });

        if (!name) {
            vscode.window.showWarningMessage('Nome do controller é obrigatório');
            return;
        }

        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceRoot) {
            vscode.window.showErrorMessage('Nenhum workspace aberto');
            return;
        }

        await createController(name, workspaceRoot, context.extensionPath);
    });

    
    let createDTODisposable = vscode.commands.registerCommand('goHelper.createDTO', async () => {
        const name = await vscode.window.showInputBox({
            prompt: 'Digite o nome do DTO (ex: User, Product, Order)',
            placeHolder: 'NomeDoDTO'
        });

        if (!name) {
            vscode.window.showWarningMessage('Nome do DTO é obrigatório');
            return;
        }

        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceRoot) {
            vscode.window.showErrorMessage('Nenhum workspace aberto');
            return;
        }

        await createDTO(name, workspaceRoot, context.extensionPath);
    });

    context.subscriptions.push(createServiceDisposable, createRepositoryDisposable, createEntityDisposable, createControllerDisposable, createDTODisposable);
}

export function deactivate() {}
