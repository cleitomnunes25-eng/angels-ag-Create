// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FUNÇÃO ENVIAR =====
function enviar() {
    const nick = document.getElementById('nick').value.trim();
    const rank = document.getElementById('rank').value.trim();
    const id = document.getElementById('id').value.trim();
    
    // Validação dos campos
    if (!nick || !rank || !id) {
        alert('⚠️ Preencha todos os campos para continuar!');
        return false;
    }
    
    // Validação do ID (apenas números)
    if (!/^\d+$/.test(id)) {
        alert('⚠️ O ID deve conter apenas números!');
        return false;
    }
    
    // Salvar no localStorage
    const inscricao = {
        nick: nick,
        rank: rank,
        id: id,
        data: new Date().toLocaleString('pt-BR')
    };
    
    // Recuperar inscrições existentes
    let inscricoes = JSON.parse(localStorage.getItem('inscricoes_ag') || '[]');
    inscricoes.push(inscricao);
    localStorage.setItem('inscricoes_ag', JSON.stringify(inscricoes));
    
    // Mostrar mensagem de sucesso
    const msg = document.getElementById('msg');
    msg.classList.remove('hidden');
    
    // Redirecionar para o WhatsApp com a mensagem
    const mensagem = 'Olá, quero fazer teste na AG hoje as 19:00H! Meu nick é: ' + nick + ' | Rank: ' + rank + ' | ID: ' + id;
    
    setTimeout(() => {
        window.open('https://wa.me/5511910813256?text=' + encodeURIComponent(mensagem));
    }, 1500);
    
    // Limpar o formulário
    document.getElementById('formInscricao').reset();
    
    return false;
}

// ===== EVENT LISTENER DO FORMULÁRIO =====
document.getElementById('formInscricao').addEventListener('submit', function(e) {
    e.preventDefault();
    enviar();
});

// ===== ANIMAÇÃO DE ENTRADA AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(168, 85, 247, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ===== CONTADOR REGRESSIVO PARA O TESTE =====
const atualizarContagem = () => {
    const agora = new Date();
    const hoje = new Date();
    hoje.setHours(19, 0, 0, 0);
    
    // Calcular diferença em horas
    const diff = hoje - agora;
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Atualizar se existir elemento de contagem
    const el = document.getElementById('countdown');
    if (el) {
        if (diff > 0) {
            el.textContent = horas + 'h ' + minutos + 'm ' + segundos + 's';
        } else {
            el.textContent = '🔥 TESTE ACONTECENDO AGORA!';
        }
    }
};

// Atualizar a cada segundo
setInterval(atualizarContagem, 1000);
atualizarContagem();