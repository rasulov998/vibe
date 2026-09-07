const toast=document.getElementById('toast');
const searchInput=document.getElementById('searchInput');
const sb=window.vibeSupabase;
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(window.t);window.t=setTimeout(()=>toast.classList.remove('show'),2200)}
function esc(s=''){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;','\\':'&#39;'}[c]))}

async function currentUser(){const {data}=await sb.auth.getUser();return data?.user||null}
async function ensureProfile(u){if(!u||!sb)return;const username=u.user_metadata?.username||u.email?.split('@')[0]||'vibe_user';await sb.from('profiles').upsert({id:u.id,username,display_name:u.user_metadata?.display_name||username,bio:u.user_metadata?.bio||'',avatar_url:u.user_metadata?.avatar_url||'',cover_url:u.user_metadata?.cover_url||''},{onConflict:'id'});}

async function loadFeed(){
  const box=document.getElementById('realFeed'); if(!box||!sb)return;
  const {data,error}=await sb.from('posts').select('*').order('created_at',{ascending:false}).limit(30);
  if(error){console.error(error);return;}
  box.innerHTML=(data||[]).map(p=>{const url=p.media_url||'';const video=p.media_type==='video'||/\.(mp4|webm|mov)(\?|$)/i.test(url);return `<article class="video-card real-post"><div class="video-visual" style="background:#09090d">${video?`<video src="${esc(url)}" controls playsinline style="width:100%;height:100%;object-fit:cover"></video>`:`<img src="${esc(url)}" alt="VIBE post" style="width:100%;height:100%;object-fit:cover">`}</div><div class="video-info"><p>${esc(p.caption||'')}</p><div class="sound">♫ VIBE</div></div></article>`}).join('');
}

let profileData=null;
async function openProfile(){
  const u=await currentUser();
  if(!u){openAuth();return}
  await ensureProfile(u);
  const [{data:profile},{data:posts},{count:followers},{count:following},{data:stories}]=await Promise.all([
    sb.from('profiles').select('*').eq('id',u.id).maybeSingle(),
    sb.from('posts').select('*').eq('user_id',u.id).order('created_at',{ascending:false}),
    sb.from('follows').select('*',{count:'exact',head:true}).eq('following_id',u.id),
    sb.from('follows').select('*',{count:'exact',head:true}).eq('follower_id',u.id),
    sb.from('stories').select('*').eq('user_id',u.id).gt('expires_at',new Date().toISOString()).order('created_at',{ascending:false})
  ]);
  profileData={profile:profile||{},posts:posts||[],stories:stories||[]};
  document.getElementById('profileUsername').textContent='@'+(profile?.username||u.email?.split('@')[0]||'username');
  document.getElementById('profileDisplayName').textContent=profile?.display_name||profile?.username||u.email||'VIBE user';
  document.getElementById('profileBio').textContent=profile?.bio||'Добавь описание профиля в настройках аккаунта.';
  document.getElementById('profilePostsCount').textContent=posts?.length||0;
  document.getElementById('profileFollowersCount').textContent=followers||0;
  document.getElementById('profileFollowingCount').textContent=following||0;
  const av=document.getElementById('profileAvatar');if(profile?.avatar_url)av.innerHTML=`<img src="${esc(profile.avatar_url)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;else av.textContent=(profile?.username||'R').charAt(0).toUpperCase();
  const cover=document.getElementById('profileCover');if(profile?.cover_url)cover.style.backgroundImage=`url("${esc(profile.cover_url)}")`;
  renderStories();renderProfileContent('posts');
  const m=document.getElementById('profileModal');m.classList.add('open');m.setAttribute('aria-hidden','false');
}
function closeProfile(){const m=document.getElementById('profileModal');m.classList.remove('open');m.setAttribute('aria-hidden','true')}
function renderStories(){const box=document.getElementById('storyList');box.innerHTML=(profileData?.stories||[]).slice(0,6).map(s=>`<button class="story-item" data-story-url="${esc(s.media_url)}"><span>${s.media_type==='video'?'▶':'✦'}</span><small>История</small></button>`).join('')||'<span class="no-stories">Пока нет историй</span>';box.querySelectorAll('[data-story-url]').forEach(x=>x.onclick=()=>window.open(x.dataset.storyUrl,'_blank'))}
function renderProfileContent(tab){const box=document.getElementById('profileContent');document.querySelectorAll('[data-profile-tab]').forEach(x=>x.classList.toggle('active',x.dataset.profileTab===tab));const posts=profileData?.posts||[];if(tab==='posts'){box.className='profile-grid';box.innerHTML=posts.length?posts.map(p=>{const v=p.media_type==='video';return `<button class="profile-post" data-url="${esc(p.media_url)}">${v?`<video src="${esc(p.media_url)}" muted playsinline></video><span>▶</span>`:`<img src="${esc(p.media_url)}" alt="">`}</button>`}).join(''):'<div class="profile-empty">Здесь появятся твои посты 📸</div>'}else if(tab==='stories'){box.className='profile-list';box.innerHTML=(profileData?.stories||[]).length?(profileData.stories.map(s=>`<div class="profile-story-card"><span>${s.media_type==='video'?'🎬':'📷'}</span><div><b>История</b><small>Доступна 24 часа</small></div><button onclick="window.open('${esc(s.media_url)}','_blank')">Открыть</button></div>`).join('')):'<div class="profile-empty">Нет активных историй</div>'}else{box.className='highlights';box.innerHTML='<div class="highlight-card"><div>🔥</div><b>Избранное</b><small>Твои лучшие моменты</small></div><div class="highlight-card"><div>🎬</div><b>Видео</b><small>Все публикации</small></div><div class="highlight-card"><div>⭐</div><b>Актуальное</b><small>Сохрани сюда истории</small></div>'}}

async function openAuth(){const u=await currentUser();if(u){showToast('Ты уже вошёл в VIBE 👋');return}const m=document.getElementById('authModal');if(m){m.classList.add('open');m.setAttribute('aria-hidden','false');setTimeout(()=>document.getElementById('authEmail')?.focus(),50)}}
function closeAuth(){const m=document.getElementById('authModal');if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true');document.getElementById('authForm')?.reset()}}

document.querySelectorAll('[data-like]').forEach(btn=>btn.addEventListener('click',()=>{btn.textContent=btn.textContent==='♡'?'♥':'♡';showToast(btn.textContent==='♥'?'Лайк поставлен ❤️':'Лайк убран')}));
document.querySelectorAll('.nav-item,.bottom-nav button').forEach(btn=>btn.addEventListener('click',async()=>{document.querySelectorAll('.nav-item,.bottom-nav button').forEach(x=>x.classList.remove('active'));document.querySelectorAll('[data-tab="'+btn.dataset.tab+'"]').forEach(x=>x.classList.add('active'));if(btn.dataset.tab==='create'){const u=await currentUser();if(!u)return openAuth();document.getElementById('uploadPanel')?.style.setProperty('display','block');document.getElementById('mediaFile')?.focus()}else if(btn.dataset.tab==='profile')openProfile();else if(btn.dataset.tab!=='home')showToast('Раздел VIBE скоро будет здесь')}));
document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));tab.classList.add('active')}));
searchInput?.addEventListener('keydown',e=>{if(e.key==='Enter'&&searchInput.value.trim())showToast('Поиск: '+searchInput.value.trim())});
document.getElementById('searchBox')?.addEventListener('click',()=>searchInput?.focus());
document.getElementById('themeBtn')?.addEventListener('click',()=>showToast('VIBE 2.0 сейчас в тёмной теме'));document.querySelector('.avatar')?.addEventListener('click',openProfile);document.querySelectorAll('[data-close-auth]').forEach(x=>x.addEventListener('click',closeAuth));document.querySelectorAll('[data-close-profile]').forEach(x=>x.addEventListener('click',closeProfile));document.getElementById('sideProfileBtn')?.addEventListener('click',openProfile);document.querySelectorAll('[data-profile-tab]').forEach(x=>x.addEventListener('click',()=>renderProfileContent(x.dataset.profileTab)));

document.getElementById('storyAdd')?.addEventListener('click',()=>showToast('Добавление истории — следующий шаг VIBE'));document.getElementById('profileEditBtn')?.addEventListener('click',()=>showToast('Редактор профиля добавим следующим шагом'));
document.getElementById('profileContent')?.addEventListener('click',e=>{const b=e.target.closest('[data-url]');if(b)window.open(b.dataset.url,'_blank')});

const authForm=document.getElementById('authForm');
authForm?.addEventListener('submit',async e=>{e.preventDefault();const email=document.getElementById('authEmail').value.trim().toLowerCase(),password=document.getElementById('authPassword').value;if(!email||password.length<6)return showToast('Проверь Email и пароль');const {data,error}=await sb.auth.signInWithPassword({email,password});if(error)return showToast(error.message.includes('Invalid login')?'Неверный Email или пароль':error.message);await ensureProfile(data.user);showToast('Вход выполнен 👋');closeAuth();updateAvatar()});
async function updateAvatar(){const u=await currentUser();const a=document.querySelector('.avatar');if(a&&u){const n=u.user_metadata?.username||u.email||'R';a.textContent=n.charAt(0).toUpperCase()}}

document.getElementById('uploadBtn')?.addEventListener('click',async()=>{const u=await currentUser();if(!u)return openAuth();const file=document.getElementById('mediaFile')?.files?.[0],caption=document.getElementById('mediaCaption')?.value.trim()||'',status=document.getElementById('uploadStatus');if(!file)return showToast('Выбери фото или видео');if(file.size>100*1024*1024)return showToast('Максимальный размер — 100 МБ');if(!file.type.startsWith('image/')&&!file.type.startsWith('video/'))return showToast('Можно загружать только фото или видео');status.textContent='Загрузка…';const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'_');const path=`${u.id}/${crypto.randomUUID()}-${safe}`;const {error:up}=await sb.storage.from('vibe-media').upload(path,file,{contentType:file.type,upsert:false});if(up){status.textContent='';return showToast('Ошибка загрузки: '+up.message)}const {data:pub}=sb.storage.from('vibe-media').getPublicUrl(path);const {error:ins}=await sb.from('posts').insert({user_id:u.id,media_url:pub.publicUrl,media_type:file.type.startsWith('video/')?'video':'image',caption,category:'vibe'});if(ins){status.textContent='';return showToast('Ошибка публикации: '+ins.message)}document.getElementById('mediaFile').value='';document.getElementById('mediaCaption').value='';status.textContent='Опубликовано ✅';showToast('Публикация добавлена 🎉');await loadFeed()});

const params=new URLSearchParams(location.search);if(params.get('login')==='1')setTimeout(openAuth,150);if(params.get('registered')==='1')setTimeout(()=>showToast('Регистрация завершена 🎉'),300);
sb?.auth.onAuthStateChange((event,session)=>{if(session?.user)ensureProfile(session.user);updateAvatar()});loadFeed();updateAvatar();