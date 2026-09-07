const toast=document.getElementById('toast');
const searchInput=document.getElementById('searchInput');
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(window.t);window.t=setTimeout(()=>toast.classList.remove('show'),1800)}

document.querySelectorAll('[data-like]').forEach(btn=>btn.addEventListener('click',()=>{
  btn.textContent=btn.textContent==='♡'?'♥':'♡';
  showToast(btn.textContent==='♥'?'Лайк поставлен ❤️':'Лайк убран');
}));

document.querySelectorAll('.nav-item,.bottom-nav button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.nav-item,.bottom-nav button').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('[data-tab="'+btn.dataset.tab+'"]').forEach(x=>x.classList.add('active'));
  if(btn.dataset.tab!=='home'){
    if(btn.dataset.tab==='profile') openAuth();
    else showToast(btn.dataset.tab==='create'?'Открываем создание видео…':'Раздел VIBE скоро будет здесь');
  }
}));

document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  tab.classList.add('active');
  showToast('Лента: '+tab.textContent);
}));

searchInput?.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&searchInput.value.trim())showToast('Поиск: '+searchInput.value.trim());
});
document.getElementById('searchBox')?.addEventListener('click',()=>searchInput?.focus());
document.getElementById('themeBtn')?.addEventListener('click',()=>showToast('VIBE 2.0 сейчас в тёмной теме'));

const authModal=document.getElementById('authModal');
const authForm=document.getElementById('authForm');
const emailInput=document.getElementById('authEmail');
const passwordInput=document.getElementById('authPassword');

function openAuth(){
  if(!authModal)return;
  authModal.classList.add('open');
  authModal.setAttribute('aria-hidden','false');
  setTimeout(()=>emailInput?.focus(),50);
}
function closeAuth(){
  if(!authModal)return;
  authModal.classList.remove('open');
  authModal.setAttribute('aria-hidden','true');
  authForm?.reset();
}

document.querySelector('.avatar')?.addEventListener('click',openAuth);
document.querySelectorAll('[data-close-auth]').forEach(x=>x.addEventListener('click',closeAuth));

authForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const email=emailInput.value.trim().toLowerCase();
  const password=passwordInput.value;
  if(!email||!emailInput.checkValidity())return showToast('Введи правильный Email');
  if(password.length<6)return showToast('Пароль должен быть не менее 6 символов');
  const saved=JSON.parse(localStorage.getItem('vibeUser')||'null');
  if(!saved||saved.email!==email||saved.password!==password)return showToast('Неверный Email или пароль');
  const avatar=document.querySelector('.avatar');
  if(avatar)avatar.textContent=(saved.username||'R').charAt(0).toUpperCase();
  showToast('Вход выполнен 👋');
  closeAuth();
});

const params=new URLSearchParams(location.search);
if(params.get('login')==='1')setTimeout(openAuth,150);
if(params.get('registered')==='1')setTimeout(()=>showToast('Регистрация успешна 🎉 Теперь войди в аккаунт.'),250);

const savedUser=JSON.parse(localStorage.getItem('vibeUser')||'null');
if(savedUser){
  const avatar=document.querySelector('.avatar');
  if(avatar)avatar.textContent=(savedUser.username||'R').charAt(0).toUpperCase();
}