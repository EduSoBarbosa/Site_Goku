function cadastrar() {
    // 1. Pega os valores dos campos de cadastro
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;
    const mensagem = document.getElementById('mensagem');

    if (!user || !pass) {
        mensagem.textContent = 'Erro: Por favor, preencha todos os campos para cadastrar.';
        return;
    }

    // 2. Verificando se o usuário já existe
    if (localStorage.getItem(user)) {
        mensagem.textContent = `Erro: O usuário "${user}" já está cadastrado.`;
        return;
    }

    // 3. Armazena o usuário e a senha no LocalStorage
    // A chave é o nome de usuário e o valor é a senha. (Bem lógico por sinal)
    localStorage.setItem(user, pass);

    mensagem.textContent = `Sucesso! Usuário "${user}" cadastrado e pronto para login.`;

    //Só para limpar os campos depois do cadastro, deve ficar legal (Eu acho)
    document.getElementById('reg-user').value = '';
    document.getElementById('reg-pass').value = '';
}

function logar() {
    // 1. Pega os valores dos campos de login
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    const mensagem = document.getElementById('mensagem');

    if (!user || !pass) {
        mensagem.textContent = 'Erro: Preencha usuário e senha.';
        return;
    }

    // 2. Tenta buscar a senha salva no LocalStorage, usando o nome de usuário como chave
    const senhaSalva = localStorage.getItem(user);

    // 3. Verifica se o usuário existe (se a chave foi encontrada)
    if (senhaSalva === null) {
        mensagem.textContent = 'Erro no Login: Usuário não encontrado.';
        return;
    }

    // 4. Compara a senha digitada com a senha salva
    if (pass === senhaSalva) {
        mensagem.textContent = `Login realizado com sucesso! Bem-vindo(a), ${user}!`;
        
        // Aqui se tudo der certo mandamos o usuário para pagina principal
        localStorage.setItem('usuarioLogado', user);
       
        window.location.href = "index.html";  
    } else {
        mensagem.textContent = 'Erro no Login: Senha incorreta.';
    }
}
 
function verificarlogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        alert(`Bem-vindo de volta, ${usuarioLogado}!`);
    }       
}
function verificarStatusLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    // Elementos da Navbar
    const linkLogin = document.getElementById('link-login');
    const linkLogout = document.getElementById('link-logout');
    const saudacao = document.getElementById('saudacao-usuario');

    if (usuarioLogado) {
        // Se logado: ESCONDE o link "Entre/Cadastre-se"
        if (linkLogin) linkLogin.style.display = 'none';

        // MOSTRA o link "Sair (Logout)"
        if (linkLogout) linkLogout.style.display = 'block';
        
        // MOSTRA a saudação (opcional)
        if (saudacao) {
            saudacao.textContent = `Olá, ${usuarioLogado}!`;
            saudacao.style.display = 'block';
        }
        
    } else {
        // Uma função para quando o usuario não estiver logado o link aparecer
        if (linkLogin) linkLogin.style.display = 'block';
        if (linkLogout) linkLogout.style.display = 'none';
        if (saudacao) saudacao.style.display = 'none';


    }
}


function logout() {
    localStorage.removeItem('usuarioLogado');
    // Redireciona para o login após sair
    window.location.replace("login.html");
}

// RODA A VERIFICAÇÃO ASSIM QUE A PÁGINA TERMINA DE CARREGAR
document.addEventListener('DOMContentLoaded', verificarStatusLogin);




