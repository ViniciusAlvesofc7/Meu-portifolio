// Abre e fecha o modal do menu
let modalMenu = document.getElementById('modal-menu') 
let fadeMenu = document.getElementById('fade-menu')
let menu = document.querySelector('.menu')
let menuClose = document.querySelector('.menu-close')

menu.addEventListener('click',()=>{
    fadeMenu.style.display = 'flex'
    modalMenu.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    
    menu.classList.remove('menu')
    menuClose.style.display = 'block'
    menu.classList.add('menu-close')
})

menuClose.addEventListener('click', ()=>{
    fecharModal();
})

function fecharModal() {
    fadeMenu.style.display = 'none'
    modalMenu.style.display = 'none'
    document.body.style.overflow = ''

    
    menu.classList.remove('menu-close')
    menuClose.style.display = 'none'
    menu.classList.add('menu')
}

// Sroll suave dos links 

document.querySelectorAll('#modal-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', e =>{
        e.preventDefault()
        const alvo = document.querySelector(link.getAttribute('href'))

        fecharModal()

        setTimeout(() =>{
            alvo.scrollIntoView({ behavior: 'smooth', block: 'start'})
        }, 500)
    })
})

// Cria modo light
let lightButton = document.querySelector('.light')

lightButton.addEventListener('click', ()=>{
    if(lightButton.classList.contains('light')){
        lightButton.classList.remove('light')
        lightButton.classList.add('light-active')
        document.body.classList.add('mode-light')
    } else{
        lightButton.classList.remove('light-active')
        lightButton.classList.add('light')
        document.body.classList.remove('mode-light')
    }
})



// Animação de scroll
const hiddenObserver = new IntersectionObserver((elements) =>{
    elements.forEach((secoes) => {
        if(secoes.isIntersecting){
            secoes.target.classList.add('section-show')
        } else{
            secoes.target.classList.remove('section-show')
        }
    })
})

const sectionHidden = document.querySelectorAll('.hidden')

sectionHidden.forEach((section) => hiddenObserver.observe(section))

// Muda a ordem dos projetos
const container = document.querySelector('#projeto-group');
const items = Array.from(container.children);
items.reverse().forEach(item => container.appendChild(item));


// Ativa e desativa o overley em animação
// document.querySelectorAll('.projeto-single').forEach( projeto =>{
//     const overley = projeto.querySelector('.projeto-overley');
//     const projetoDescricao = projeto.querySelector('.projeto-descricao');


//     projeto.addEventListener('mouseenter', () =>{
//         overley.style.opacity = 0;
//         projetoDescricao.style.opacity = 1;
//         projetoDescricao.style.display = 'flex';
//     })

//     projeto.addEventListener('mouseleave', () =>{
//         overley.style.opacity = 1;
//         projetoDescricao.style.opacity = 0;
//         projetoDescricao.style.display = 'none';
//     })
    
// })

document.querySelectorAll('.projeto-single').forEach(projeto => {
    const overley = projeto.querySelector('.projeto-overley');
    const projetoDescricao = projeto.querySelector('.projeto-descricao');

    const mostrar = () => {
        overley.style.opacity = 0;
        projetoDescricao.style.opacity = 1;
        projetoDescricao.style.display = 'flex';
    };

    const esconder = () => {
        overley.style.opacity = 1;
        projetoDescricao.style.opacity = 0;
        projetoDescricao.style.display = 'none';
    };

    // Desktop
    projeto.addEventListener('mouseenter', mostrar);
    projeto.addEventListener('mouseleave', esconder);

    // Mobile
    projeto.addEventListener('touchstart', e => {
        // impede clique duplo estranho
        e.stopPropagation();
        if (projetoDescricao.style.display === 'flex') {
            esconder();
        } else {
            mostrar();
        }
    });

    // Fecha se tocar fora
    document.addEventListener('touchstart', e => {
        if (!projeto.contains(e.target)) {
            esconder();
        }
    });
});