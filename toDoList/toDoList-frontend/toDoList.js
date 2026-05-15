// ─── Utilitários ─────────────────────────────────────────────────────────────

function showAlert(containerId, type, message) {
    const el = document.getElementById(containerId);
    el.innerHTML = `<div class="alert alert-${type} py-2">${message}</div>`;
}

function escaparHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── Render ───────────────────────────────────────────────────────────────────

function renderizarItem(item) {
    const riscado = item.concluido ? 'text-decoration-line-through text-muted' : '';
    return `
        <li class="d-flex align-items-center gap-2 mb-1" data-item-id="${item.id}">
            <input type="checkbox" class="form-check-input mt-0 item-check" ${item.concluido ? 'checked' : ''}>
            <span class="${riscado}">${escaparHtml(item.descricao)}</span>
            <button class="btn btn-sm btn-link text-danger p-0 ms-auto item-delete" title="Remover item">×</button>
        </li>`;
}

function renderizarCard(lista) {
    return `
        <div class="col">
            <div class="card shadow h-100 position-relative" data-lista-id="${lista.id}">
                <div class="card-body">
                    <button class="btn btn-sm btn-outline-primary border-0 position-absolute btn-editar-lista"
                            style="right:2.75rem;top:0.5rem" title="Editar lista">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary btn-lixo position-absolute top-0 end-0 m-2 border-0" title="Deletar lista">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <h5 class="card-title mt-1">${escaparHtml(lista.titulo)}</h5>
                    <div class="d-flex mt-2 pb-3">
                        <input class="form-control me-2 input-novo-item" type="text" placeholder="Adicione" aria-label="Adicione um item"/>
                        <button class="btn btn-primary btn-add-item">+</button>
                    </div>
                    <ul class="list-unstyled mb-0">
                        ${lista.itens.map(renderizarItem).join('')}
                    </ul>
                </div>
            </div>
        </div>`;
}

function renderizarCategoria(cat) {
    const anchor = cat.nome.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-');
    return `
        <section class="container my-4" data-cat-id="${cat.id}">
            <div class="d-flex align-items-center gap-2 mb-3">
                <h2 id="${anchor}" class="mb-0">${escaparHtml(cat.nome)}</h2>
                <button class="btn btn-sm btn-outline-secondary border-0 btn-editar-cat"
                        data-cat-id="${cat.id}" title="Editar categoria">
                    <i class="fa-solid fa-pen fa-xs"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger border-0 btn-deletar-cat"
                        data-cat-id="${cat.id}" title="Deletar categoria">
                    <i class="fa-solid fa-trash fa-xs"></i>
                </button>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                ${cat.listas.map(renderizarCard).join('')}
                <div class="col d-flex align-items-center">
                    <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                            style="width:40px;height:40px"
                            data-bs-toggle="modal" data-bs-target="#adicionarLista"
                            data-cat-id="${cat.id}" title="Adicionar lista">+</button>
                </div>
            </div>
        </section>`;
}

function renderizarConteudo() {
    const usuario = DB.getSessao();
    const el = document.getElementById('conteudo');

    if (!usuario) {
        el.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="fa-solid fa-list-check fa-3x mb-3"></i>
                <h4>Faça login para acessar suas listas</h4>
            </div>`;
        return;
    }

    const cats = DB.getCategorias();
    if (!cats.length) {
        el.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="fa-solid fa-folder-open fa-3x mb-3"></i>
                <h4>Nenhuma categoria criada</h4>
                <p>Clique em <strong>+ Categoria</strong> na barra de navegação para começar.</p>
            </div>`;
        return;
    }

    el.innerHTML = cats.map(renderizarCategoria).join('');
}

function atualizarDropdownCategorias() {
    const dropdown = document.getElementById('dropdownCategorias');
    const cats = DB.getCategorias();
    if (!cats.length) {
        dropdown.innerHTML = '<li><span class="dropdown-item text-muted">Nenhuma categoria</span></li>';
        return;
    }
    dropdown.innerHTML = cats.map(cat => {
        const anchor = cat.nome.toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-');
        return `<li><a class="dropdown-item" href="#${anchor}">${escaparHtml(cat.nome)}</a></li>`;
    }).join('') + '<li><hr class="dropdown-divider"></li><li><a class="dropdown-item" href="#">Todas as categorias</a></li>';
}

function atualizarNavbar() {
    const usuario = DB.getSessao();
    const logado = !!usuario;

    document.getElementById('btnCadastro').style.display = logado ? 'none' : '';
    document.getElementById('btnLogin').style.display = logado ? 'none' : '';
    document.getElementById('btnAdicionarLista').style.display = logado ? '' : 'none';
    document.getElementById('btnAdicionarCategoria').style.display = logado ? '' : 'none';
    document.getElementById('navUsuario').style.display = logado ? '' : 'none';
    document.getElementById('btnSair').style.display = logado ? '' : 'none';

    if (logado) {
        document.getElementById('navUsuario').textContent = `Olá, ${usuario.nome}`;
        atualizarDropdownCategorias();
    }
}

function atualizarUI() {
    atualizarNavbar();
    renderizarConteudo();
}

// ─── Cadastro ─────────────────────────────────────────────────────────────────

document.getElementById('btnSalvarCadastro').addEventListener('click', function () {
    const nome = document.getElementById('inputNome').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const senha = document.getElementById('inputSenha').value;
    const confirmar = document.getElementById('inputConfirmarSenha').value;

    if (!nome || !email || !senha || !confirmar) {
        showAlert('cadastroAlert', 'danger', 'Preencha todos os campos.');
        return;
    }
    if (senha !== confirmar) {
        showAlert('cadastroAlert', 'danger', 'As senhas não coincidem.');
        return;
    }

    const erro = DB.cadastrar(nome, email, senha);
    if (erro) { showAlert('cadastroAlert', 'danger', erro); return; }

    showAlert('cadastroAlert', 'success', 'Cadastro realizado com sucesso!');
    setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('cadastroModal')).hide();
        document.getElementById('cadastroForm').reset();
        document.getElementById('cadastroAlert').innerHTML = '';
    }, 800);
});

document.getElementById('cadastroModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('cadastroAlert').innerHTML = '';
});

// ─── Login ────────────────────────────────────────────────────────────────────

document.getElementById('btnEntrar').addEventListener('click', function () {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;

    if (!email || !senha) {
        showAlert('loginAlert', 'danger', 'Preencha email e senha.');
        return;
    }

    const erro = DB.login(email, senha);
    if (erro) { showAlert('loginAlert', 'danger', erro); return; }

    showAlert('loginAlert', 'success', 'Login realizado!');
    setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('loginModal')).hide();
        document.getElementById('loginForm').reset();
        document.getElementById('loginAlert').innerHTML = '';
        atualizarUI();
    }, 500);
});

document.getElementById('loginModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('loginAlert').innerHTML = '';
});

// ─── Logout ───────────────────────────────────────────────────────────────────

document.getElementById('btnSair').addEventListener('click', () => {
    DB.logout();
    atualizarUI();
});

// ─── Categorias ───────────────────────────────────────────────────────────────

document.getElementById('btnSalvarCategoria').addEventListener('click', function () {
    const nome = document.getElementById('inputNovaCategoria').value.trim();
    if (!nome) { showAlert('adicionarCategoriaAlert', 'danger', 'Nome é obrigatório.'); return; }

    const erro = DB.adicionarCategoria(nome);
    if (erro) { showAlert('adicionarCategoriaAlert', 'danger', erro); return; }

    showAlert('adicionarCategoriaAlert', 'success', 'Categoria adicionada!');
    setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('adicionarCategoriaModal')).hide();
        document.getElementById('formAdicionarCategoria').reset();
        document.getElementById('adicionarCategoriaAlert').innerHTML = '';
        atualizarUI();
    }, 500);
});

document.getElementById('adicionarCategoriaModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('adicionarCategoriaAlert').innerHTML = '';
});

let catParaEditar = null;

function abrirEditarCategoria(catId) {
    const cat = DB.getCategorias().find(c => c.id === catId);
    if (!cat) return;
    catParaEditar = catId;
    document.getElementById('inputEditarCategoria').value = cat.nome;
    document.getElementById('editarCategoriaAlert').innerHTML = '';
    bootstrap.Modal.getOrCreateInstance(document.getElementById('editarCategoriaModal')).show();
}

document.getElementById('btnSalvarEdicaoCategoria').addEventListener('click', function () {
    const novoNome = document.getElementById('inputEditarCategoria').value.trim();
    if (!novoNome) { showAlert('editarCategoriaAlert', 'danger', 'Nome é obrigatório.'); return; }

    const erro = DB.editarCategoria(catParaEditar, novoNome);
    if (erro) { showAlert('editarCategoriaAlert', 'danger', erro); return; }

    showAlert('editarCategoriaAlert', 'success', 'Categoria atualizada!');
    setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('editarCategoriaModal')).hide();
        catParaEditar = null;
        atualizarUI();
    }, 500);
});

document.getElementById('editarCategoriaModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('editarCategoriaAlert').innerHTML = '';
});

let catParaDeletar = null;

document.getElementById('btnConfirmarDeleteCategoria').addEventListener('click', function () {
    if (catParaDeletar !== null) {
        DB.deletarCategoria(catParaDeletar);
        catParaDeletar = null;
    }
    bootstrap.Modal.getInstance(document.getElementById('confirmarDeleteCategoriaModal')).hide();
    atualizarUI();
});

// ─── Adicionar lista ──────────────────────────────────────────────────────────

function popularSelectCategorias(selectId, selecionado) {
    const select = document.getElementById(selectId);
    const cats = DB.getCategorias();
    select.innerHTML = '<option value="" disabled selected>Selecione uma categoria</option>';
    for (const cat of cats) {
        const opt = new Option(cat.nome, cat.id);
        if (selecionado && cat.id === selecionado) opt.selected = true;
        select.appendChild(opt);
    }
}

document.getElementById('adicionarLista').addEventListener('show.bs.modal', function (e) {
    popularSelectCategorias('categoriaLista');
    const triggerBtn = e.relatedTarget;
    if (triggerBtn && triggerBtn.dataset.catId) {
        document.getElementById('categoriaLista').value = triggerBtn.dataset.catId;
    }
    document.getElementById('listaItens').innerHTML = '';
    document.getElementById('adicionarListaAlert').innerHTML = '';
    document.getElementById('novaListaForm').reset();
});

function adicionarItemModalTemp(inputId, ulId) {
    const input = document.getElementById(inputId);
    const texto = input.value.trim();
    if (!texto) return;
    const li = document.createElement('li');
    li.className = 'd-flex align-items-center gap-2 mb-1 item-modal-temp';
    li.innerHTML = `
        <input type="checkbox" class="form-check-input mt-0" disabled>
        <span>${escaparHtml(texto)}</span>
        <button type="button" class="btn btn-sm btn-link text-danger p-0 ms-auto">×</button>`;
    li.querySelector('button').addEventListener('click', () => li.remove());
    document.getElementById(ulId).appendChild(li);
    input.value = '';
    input.focus();
}

document.getElementById('btnAdicionarItem').addEventListener('click', () =>
    adicionarItemModalTemp('inputItem', 'listaItens'));
document.getElementById('inputItem').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); adicionarItemModalTemp('inputItem', 'listaItens'); }
});

document.getElementById('btnAdicionar').addEventListener('click', function () {
    const titulo = document.getElementById('inputTitulo').value.trim();
    const catId = Number(document.getElementById('categoriaLista').value);
    const itensEl = document.getElementById('listaItens').querySelectorAll('.item-modal-temp');

    if (!titulo) { showAlert('adicionarListaAlert', 'danger', 'Adicione um título.'); return; }
    if (!catId) { showAlert('adicionarListaAlert', 'danger', 'Selecione uma categoria.'); return; }
    if (!itensEl.length) { showAlert('adicionarListaAlert', 'danger', 'Adicione pelo menos um item.'); return; }

    const erro = DB.adicionarLista(catId, titulo);
    if (erro) { showAlert('adicionarListaAlert', 'danger', erro); return; }

    const lista = DB.getCategorias().find(c => c.id === catId).listas.at(-1);
    for (const li of itensEl) DB.adicionarItem(lista.id, li.querySelector('span').textContent);

    showAlert('adicionarListaAlert', 'success', 'Lista adicionada!');
    setTimeout(() => {
        bootstrap.Modal.getOrCreateInstance(document.getElementById('adicionarLista')).hide();
        atualizarUI();
    }, 500);
});

document.getElementById('adicionarLista').addEventListener('hidden.bs.modal', () => {
    document.getElementById('adicionarListaAlert').innerHTML = '';
});

// ─── Editar lista ─────────────────────────────────────────────────────────────

function criarLiEdicao(descricao, itemId) {
    const li = document.createElement('li');
    li.className = 'd-flex align-items-center gap-2 mb-1 item-edicao';
    if (itemId) li.dataset.itemId = itemId;
    li.innerHTML = `
        <input type="checkbox" class="form-check-input mt-0" disabled>
        <span>${escaparHtml(descricao)}</span>
        <button type="button" class="btn btn-sm btn-link text-danger p-0 ms-auto">×</button>`;
    li.querySelector('button').addEventListener('click', function () {
        if (!li.dataset.itemId) { li.remove(); return; }
        if (li.dataset.removendo) {
            delete li.dataset.removendo;
            li.style.opacity = '';
            li.querySelector('span').style.textDecoration = '';
            this.textContent = '×';
        } else {
            li.dataset.removendo = 'true';
            li.style.opacity = '0.4';
            li.querySelector('span').style.textDecoration = 'line-through';
            this.textContent = '↩';
        }
    });
    return li;
}

function abrirEditarLista(listaId) {
    const cats = DB.getCategorias();
    let lista, catAtual;
    for (const cat of cats) {
        lista = cat.listas.find(l => l.id === listaId);
        if (lista) { catAtual = cat; break; }
    }
    if (!lista) return;

    document.getElementById('editarListaModal').dataset.listaId = listaId;
    document.getElementById('editarTitulo').value = lista.titulo;
    popularSelectCategorias('editarCategoriaLista', catAtual.id);

    const ul = document.getElementById('editarListaItens');
    ul.innerHTML = '';
    for (const item of lista.itens) ul.appendChild(criarLiEdicao(item.descricao, item.id));

    document.getElementById('editarListaAlert').innerHTML = '';
    bootstrap.Modal.getOrCreateInstance(document.getElementById('editarListaModal')).show();
}

document.getElementById('btnEditarAdicionarItem').addEventListener('click', () => {
    const input = document.getElementById('editarInputItem');
    const texto = input.value.trim();
    if (!texto) return;
    document.getElementById('editarListaItens').appendChild(criarLiEdicao(texto, null));
    input.value = '';
    input.focus();
});
document.getElementById('editarInputItem').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('btnEditarAdicionarItem').click(); }
});

document.getElementById('btnSalvarEdicao').addEventListener('click', function () {
    const modal = document.getElementById('editarListaModal');
    const listaId = Number(modal.dataset.listaId);
    const titulo = document.getElementById('editarTitulo').value.trim();
    const catId = Number(document.getElementById('editarCategoriaLista').value);

    if (!titulo) { showAlert('editarListaAlert', 'danger', 'Título é obrigatório.'); return; }
    if (!catId) { showAlert('editarListaAlert', 'danger', 'Selecione uma categoria.'); return; }

    for (const li of document.querySelectorAll('#editarListaItens .item-edicao[data-removendo]'))
        DB.deletarItem(Number(li.dataset.itemId));

    for (const li of document.querySelectorAll('#editarListaItens .item-edicao:not([data-item-id]):not([data-removendo])'))
        DB.adicionarItem(listaId, li.querySelector('span').textContent);

    const erro = DB.editarLista(listaId, titulo, catId);
    if (erro) { showAlert('editarListaAlert', 'danger', erro); return; }

    bootstrap.Modal.getOrCreateInstance(document.getElementById('editarListaModal')).hide();
    atualizarUI();
});

document.getElementById('editarListaModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('editarListaAlert').innerHTML = '';
});

// ─── Deletar lista ────────────────────────────────────────────────────────────

let listaParaDeletar = null;

document.getElementById('btnConfirmarDelete').addEventListener('click', function () {
    if (listaParaDeletar !== null) {
        DB.deletarLista(listaParaDeletar);
        listaParaDeletar = null;
    }
    bootstrap.Modal.getInstance(document.getElementById('confirmarDeleteModal')).hide();
    atualizarUI();
});

// ─── Event delegation no conteúdo dinâmico ────────────────────────────────────

document.getElementById('conteudo').addEventListener('click', function (e) {
    if (e.target.closest('.btn-add-item')) {
        const card = e.target.closest('[data-lista-id]');
        const input = card.querySelector('.input-novo-item');
        const desc = input.value.trim();
        if (!desc) return;
        DB.adicionarItem(Number(card.dataset.listaId), desc);
        input.value = '';
        renderizarConteudo();
        return;
    }

    if (e.target.closest('.item-delete')) {
        DB.deletarItem(Number(e.target.closest('[data-item-id]').dataset.itemId));
        renderizarConteudo();
        return;
    }

    if (e.target.matches('.item-check')) {
        const li = e.target.closest('[data-item-id]');
        DB.alternarItem(Number(li.dataset.itemId));
        const span = li.querySelector('span');
        span.classList.toggle('text-decoration-line-through', e.target.checked);
        span.classList.toggle('text-muted', e.target.checked);
        return;
    }

    if (e.target.closest('.btn-editar-lista')) {
        abrirEditarLista(Number(e.target.closest('[data-lista-id]').dataset.listaId));
        return;
    }

    if (e.target.closest('.btn-lixo')) {
        listaParaDeletar = Number(e.target.closest('[data-lista-id]').dataset.listaId);
        bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmarDeleteModal')).show();
        return;
    }

    if (e.target.closest('.btn-editar-cat')) {
        abrirEditarCategoria(Number(e.target.closest('.btn-editar-cat').dataset.catId));
        return;
    }

    if (e.target.closest('.btn-deletar-cat')) {
        catParaDeletar = Number(e.target.closest('.btn-deletar-cat').dataset.catId);
        bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmarDeleteCategoriaModal')).show();
        return;
    }
});

document.getElementById('conteudo').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches('.input-novo-item')) {
        e.preventDefault();
        e.target.closest('[data-lista-id]').querySelector('.btn-add-item').click();
    }
});

// ─── Inicializar ──────────────────────────────────────────────────────────────

atualizarUI();
