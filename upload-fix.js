(()=>{
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  async function publishVideo(){
    const sb=window.vibeSupabase;
    if(!sb){alert('VIBE: Supabase не подключён');return}
    const u=(await sb.auth.getUser()).data?.user;
    if(!u){window.openAuth?.();return}
    const f=$('mediaFile')?.files?.[0];
    const cap=$('mediaCaption')?.value?.trim()||'';
    const st=$('uploadStatus'),btn=$('uploadBtn');
    if(!f){window.vibe?.toast?.('Сначала выбери видео');return}
    if(!f.type.startsWith('video/')){alert('Для Reels выбери видеофайл.');return}
    if(f.size>100*1024*1024){alert('Максимальный размер видео — 100 МБ.');return}
    if(btn){btn.disabled=true;btn.textContent='Загрузка…'}
    if(st)st.innerHTML='<b>Загрузка видео…</b><span>Пожалуйста, не закрывай приложение.</span>';
    try{
      const safe=f.name.replace(/[^a-zA-Z0-9._-]/g,'_');
      const path=`${u.id}/${Date.now()}-${crypto.randomUUID()}-${safe}`;
      const up=await sb.storage.from('vibe-media').upload(path,f,{contentType:f.type,upsert:false,cacheControl:'3600'});
      if(up.error)throw new Error('Storage: '+up.error.message);
      const pub=sb.storage.from('vibe-media').getPublicUrl(path).data?.publicUrl;
      if(!pub)throw new Error('Не удалось получить ссылку на видео');
      const ins=await sb.from('posts').insert({user_id:u.id,media_url:pub,media_type:'video',caption:cap,category:'vibe',status:'published',is_adult:false}).select().single();
      if(ins.error)throw new Error('Публикация: '+ins.error.message);
      if(st)st.innerHTML='<b>✓ Reels опубликован!</b><span>Видео появилось в ленте VIBE.</span>';
      if($('mediaFile'))$('mediaFile').value='';
      if($('mediaCaption'))$('mediaCaption').value='';
      if(typeof window.vibe?.loadFeed==='function')await window.vibe.loadFeed();
      setTimeout(()=>{const p=$('uploadPanel');if(p)p.style.display='none';if(st)st.innerHTML=''},1000);
    }catch(e){
      console.error(e);
      if(st)st.innerHTML='<b>Ошибка</b><span>'+esc(e.message)+'</span>';
      alert('VIBE: '+e.message);
    }finally{if(btn){btn.disabled=false;btn.textContent='Опубликовать'}}
  }
  function init(){const b=$('uploadBtn');if(!b)return;b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();publishVideo()},true)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
