const DB = (() => {
    const CHAVE = 'todoListDB';

    function _carregar() {
        const raw = localStorage.getItem(CHAVE);
        return raw ? JSON.parse(raw) : { usuarios: [], proximo: 1, sessao: null };
    }

    function _salvar(d) {
        localStorage.setItem(CHAVE, JSON.stringify(d));
    }

    function _novoId(d) {
        return d.proximo++;
    }

    return {
        // ── Sessão ──────────────────────────────────────────────────────────
        getSessao() {
            const d = _carregar();
            if (!d.sessao) return null;
            return d.usuarios.find(u => u.id === d.sessao) || null;
        },

        // ── Usuários ────────────────────────────────────────────────────────
        cadastrar(nome, email, senha) {
            if (!nome.trim()) return 'Nome é obrigatório.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido.';
            if (senha.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
            const d = _carregar();
            if (d.usuarios.some(u => u.email.toLowerCase() === email.toLowerCase()))
                return 'Email já cadastrado.';
            d.usuarios.push({ id: _novoId(d), nome, email, senha, categorias: [] });
            _salvar(d);
            return null;
        },

        login(email, senha) {
            const d = _carregar();
            const u = d.usuarios.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
            );
            if (!u) return 'Email ou senha incorretos.';
            d.sessao = u.id;
            _salvar(d);
            return null;
        },

        logout() {
            const d = _carregar();
            d.sessao = null;
            _salvar(d);
        },

        // ── Categorias ──────────────────────────────────────────────────────
        getCategorias() {
            const u = this.getSessao();
            return u ? u.categorias : [];
        },

        adicionarCategoria(nome) {
            if (!nome.trim()) return 'Nome é obrigatório.';
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            if (u.categorias.some(c => c.nome.toLowerCase() === nome.trim().toLowerCase()))
                return 'Categoria já existe.';
            u.categorias.push({ id: _novoId(d), nome: nome.trim(), listas: [] });
            _salvar(d);
            return null;
        },

        editarCategoria(catId, novoNome) {
            if (!novoNome.trim()) return 'Nome é obrigatório.';
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            const cat = u.categorias.find(c => c.id === catId);
            if (!cat) return 'Categoria não encontrada.';
            cat.nome = novoNome.trim();
            _salvar(d);
            return null;
        },

        deletarCategoria(catId) {
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            const idx = u.categorias.findIndex(c => c.id === catId);
            if (idx === -1) return 'Categoria não encontrada.';
            u.categorias.splice(idx, 1);
            _salvar(d);
            return null;
        },

        // ── Listas ──────────────────────────────────────────────────────────
        adicionarLista(catId, titulo) {
            if (!titulo.trim()) return 'Título é obrigatório.';
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            const cat = u.categorias.find(c => c.id === catId);
            if (!cat) return 'Categoria não encontrada.';
            cat.listas.push({ id: _novoId(d), titulo: titulo.trim(), itens: [] });
            _salvar(d);
            return null;
        },

        editarLista(listaId, novoTitulo, novaCatId) {
            if (!novoTitulo.trim()) return 'Título é obrigatório.';
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            for (const cat of u.categorias) {
                const idx = cat.listas.findIndex(l => l.id === listaId);
                if (idx !== -1) {
                    const lista = cat.listas[idx];
                    lista.titulo = novoTitulo.trim();
                    if (novaCatId !== cat.id) {
                        const novaCat = u.categorias.find(c => c.id === novaCatId);
                        if (novaCat) {
                            cat.listas.splice(idx, 1);
                            novaCat.listas.push(lista);
                        }
                    }
                    _salvar(d);
                    return null;
                }
            }
            return 'Lista não encontrada.';
        },

        deletarLista(listaId) {
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            for (const cat of u.categorias) {
                const idx = cat.listas.findIndex(l => l.id === listaId);
                if (idx !== -1) {
                    cat.listas.splice(idx, 1);
                    _salvar(d);
                    return null;
                }
            }
            return 'Lista não encontrada.';
        },

        // ── Itens ────────────────────────────────────────────────────────────
        adicionarItem(listaId, descricao) {
            if (!descricao.trim()) return 'Descrição é obrigatória.';
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            for (const cat of u.categorias) {
                const lista = cat.listas.find(l => l.id === listaId);
                if (lista) {
                    lista.itens.push({ id: _novoId(d), descricao: descricao.trim(), concluido: false });
                    _salvar(d);
                    return null;
                }
            }
            return 'Lista não encontrada.';
        },

        alternarItem(itemId) {
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            for (const cat of u.categorias) {
                for (const lista of cat.listas) {
                    const item = lista.itens.find(i => i.id === itemId);
                    if (item) {
                        item.concluido = !item.concluido;
                        _salvar(d);
                        return null;
                    }
                }
            }
            return 'Item não encontrado.';
        },

        deletarItem(itemId) {
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            for (const cat of u.categorias) {
                for (const lista of cat.listas) {
                    const idx = lista.itens.findIndex(i => i.id === itemId);
                    if (idx !== -1) {
                        lista.itens.splice(idx, 1);
                        _salvar(d);
                        return null;
                    }
                }
            }
            return 'Item não encontrado.';
        },

        editarItem(itemId, novaDescricao) {
            if (!novaDescricao.trim()) return 'Descrição é obrigatória.';
            const d = _carregar();
            const u = d.usuarios.find(u => u.id === d.sessao);
            if (!u) return 'Não autenticado.';
            for (const cat of u.categorias) {
                for (const lista of cat.listas) {
                    const item = lista.itens.find(i => i.id === itemId);
                    if (item) {
                        item.descricao = novaDescricao.trim();
                        _salvar(d);
                        return null;
                    }
                }
            }
            return 'Item não encontrado.';
        },
    };
})();
