const toast=document.getElementById('toast');
const searchInput=document.getElementById('searchInput');
const sb=window.vibeSupabase;
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(window.t);window.t=setTimeout(()=>toast.classList.remove('show'),2200)}
function esc(s=''){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;','\\':'&#39;'}[c]))}

async function loadFeed(){
  const box=document.getElementById('realFeed'); if(!box||!sb)return;
  const {data,error}=await sb.from('posts').select('*').order('created_at',{ascending:false}).limit(30);
  if(error){console.error(error);return;}
  box.innerHTML=(data||[]).map(p=>{
    const url=p.media_url||''; const video=p.media_type==='video'||/\.(mp4|webm|mov)(\?|$)/i.test(url);
    return `<article class="video-card real-post"><div class="video-visual" style="background:#09090d">${video?`<video src="${esc(url)}" controls playsinline style="width:100%;height:100%;object-fit:cover"></video>`:`<img src="${esc(url)}" alt="VIBE post" style="width:100%;height:100%;object-fit:cover">`}</div><div class="video-info"><p>${esc(p.caption||'')}</p><div class="sound">♫ VIBE</div></div></article>`;
  }).join('');
}

async function currentUser(){const {data}=await sb.auth.getUser();return data?.user||null}
async function openAuth(){const u=await currentUser();if(u){showToast('Ты уже вошёл в VIBE 👋');return} const m=document.getElementById('authModal');if(m){m.classList.add('open');m.setAttribute('aria-hidden','false');setTimeout(()=>document.getElementById('authEmail')?.focus(),50)}}
function closeAuth(){const m=document.getElementById('authModal');if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true');document.getElementById('authForm')?.reset()}}

document.querySelectorAll('[data-like]').forEach(btn=>btn.addEventListener('click',()=>{btn.textContent=btn.textContent==='♡'?'♥':'♡';showToast(btn.textContent==='♥'?'Лайк поставлен ❤️':'Лайк убран')}));
document.querySelectorAll('.nav-item,.bottom-nav button').forEach(btn=>btn.addEventListener('click',async()=>{document.querySelectorAll('.nav-item,.bottom-nav button').forEach(x=>x.classList.remove('active'));document.querySelectorAll('[data-tab="'+btn.dataset.tab+'"]').forEach(x=>x.classList.add('active'));if(btn.dataset.tab==='create'){const u=await currentUser();if(!u)return openAuth();document.getElementById('uploadPanel')?.style.setProperty('display','block');document.getElementById('mediaFile')?.focus()}else if(btn.dataset.tab==='profile')openAuth();else if(btn.dataset.tab!=='home')showToast('Раздел VIBE скоро будет здесь')}));
document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));tab.classList.add('active')}));
searchInput?.addEventListener('keydown',e=>{if(e.key==='Enter'&&searchInput.value.trim())showToast('Поиск: '+searchInput.value.trim())});
document.getElementById('searchBox')?.addEventListener('click',()=>searchInput?.focus());
document.getElementById('themeBtn')?.addEventListener('click',()=>showToast('VIBE 2.0 сейчас в тёмной теме'));
document.querySelector('.avatar')?.addEventListener('click',openAuth);document.querySelectorAll('[data-close-auth]').forEach(x=>x.addEventListener('click',closeAuth));

const authForm=document.getElementById('authForm');
authForm?.addEventListener('submit',async e=>{e.preventDefault();const email=document.getElementById('authEmail').value.trim().toLowerCase(),password=document.getElementById('authPassword').value;if(!email||password.length<6)return showToast('Проверь Email и пароль');const {error}=await sb.auth.signInWithPassword({email,password});if(error)return showToast(error.message.includes('Invalid login')?'Неверный Email или пароль':error.message);showToast('Вход выполнен 👋');closeAuth();updateAvatar();});
async function updateAvatar(){const u=await currentUser();const a=document.querySelector('.avatar');if(a&&u){const n=u.user_metadata?.username||u.email||'R';a.textContent=n.charAt(0).toUpperCase()}}

document.getElementById('uploadBtn')?.addEventListener('click',async()=>{const u=await currentUser();if(!u)return openAuth();const file=document.getElementById('mediaFile')?.files?.[0],caption=document.getElementById('mediaCaption')?.value.trim()||'',status=document.getElementById('uploadStatus');if(!file)return showToast('Выбери фото или видео');if(file.size>100*1024*1024)return showToast('Максимальный размер — 100 МБ');if(!file.type.startsWith('image/')&&!file.type.startsWith('video/'))return showToast('Можно загружать только фото или видео');status.textContent='Загрузка…';const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'_');const path=`${u.id}/${crypto.randomUUID()}-${safe}`;const {error:up}=await sb.storage.from('vibe-media').upload(path,file,{contentType:file.type,upsert:false});if(up){status.textContent='';return showToast('Ошибка загрузки: '+up.message)}const {data:pub}=sb.storage.from('vibe-media').getPublicUrl(path);const {error:ins}=await sb.from('posts').insert({user_id:u.id,media_url:pub.publicUrl,media_type:file.type.startsWith('video/')?'video':'image',caption,category:'vibe'});if(ins){status.textContent='';return showToast('Ошибка публикации: '+ins.message)}document.getElementById('mediaFile').value='';document.getElementById('mediaCaption').value='';status.textContent='Опубликовано ✅';showToast('Публикация добавлена 🎉');await loadFeed()});

const params=new URLSearchParams(location.search);if(params.get('login')==='1')setTimeout(openAuth,150);if(params.get('registered')==='1')setTimeout(()=>showToast('Регистрация завершена 🎉'),300);
sb?.auth.onAuthStateChange(()=>updateAvatar());
loadFeed();updateAvatar();