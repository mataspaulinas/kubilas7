(function(){
  const crewSystemCode = String.raw`
  const CREW_PROFILES = {
    gudras:{name:'Gudras',short:'Gudras',spacing:62,bob:4,speed:210,scale:1},
    jetta:{name:'Jetta',short:'Jetta',spacing:64,bob:2,speed:330,scale:1},
    komisaras:{name:'Komisaras',short:'Komisaras',spacing:56,bob:7,speed:150,scale:.96},
    lastas:{name:'Ląstas',short:'Ląstas',spacing:76,bob:3,speed:185,scale:1},
    plikas:{name:'Plikas',short:'Plikas',spacing:60,bob:2,speed:230,scale:1},
    griga:{name:'Griga',short:'Griga',spacing:60,bob:3,speed:160,scale:1},
    martinas:{name:'mArtinas',short:'mArtinas',spacing:68,bob:2,speed:260,scale:1}
  };
  function crewProfile(id){ return CREW_PROFILES[id] || CREW_PROFILES.gudras; }
  function crewId(entity){ return entity && entity.id==='heroFollower' ? 'gudras' : (typeof entity==='string' ? entity : (entity && entity.id) || 'gudras'); }
  function rp(x,y,w,h,c,s){ px(x*s,y*s,w*s,h*s,c); }
  function crewShadow(x,y,w,s){ px(x+4*s,y+90*s,w*s,8*s,'rgba(0,0,0,.28)'); }
  function crewFace(x,y,s,eye,mouth){
    rp(x+18,y+15,4,4,eye,s); rp(x+32,y+15,4,4,eye,s);
    rp(x+26,y+18,3,7,'#cf7f45',s); rp(x+27,y+23,4,2,'#b86835',s);
    if(mouth==='grin'){ rp(x+20,y+28,18,3,'#7f2f24',s); rp(x+23,y+28,10,1,'#ffd7b2',s); }
    else if(mouth==='open'){ rp(x+23,y+27,13,7,'#32100d',s); rp(x+25,y+29,9,2,'#a94c35',s); }
    else if(mouth==='stern'){ rp(x+21,y+28,15,3,'#54231c',s); }
    else { rp(x+23,y+27,12,2,'#7f2f24',s); }
  }
  function crewBaseStanding(x,y,s,skin,shirt,pants,eye,mouth){
    crewShadow(x,y,50,s);
    rp(x+13,y+58,12,30,pants,s); rp(x+31,y+58,12,30,'#1d326c',s);
    rp(x+11,y+53,34,10,shirt,s); rp(x+10,y+33,36,29,shirt,s);
    rp(x+7,y+38,7,26,skin,s); rp(x+43,y+38,7,26,skin,s);
    rp(x+9,y+83,14,10,skin,s); rp(x+33,y+83,14,10,skin,s);
    rp(x+12,y+4,32,28,skin,s); rp(x+14,y+6,28,10,'#ffc582',s);
    rp(x+10,y+12,4,12,'#c77741',s); rp(x+42,y+12,4,12,'#c77741',s);
    crewFace(x,y,s,eye||'#111',mouth||'flat');
  }
  function drawGudras(x,y,state,s){
    const wobble = player.tabs>0 ? Math.sin(now()/120)*2 : 0;
    const eye = player.tabs>0 ? (player.tabs>=2 ? '#ff38f5' : '#de342d') : '#3a2415';
    crewBaseStanding(x,y+wobble,s,'#ef9e59','#355dc4','#2c4ea8',eye,'stern');
    rp(x+10,y-3+wobble,32,8,'#26252d',s); rp(x+14,y-7+wobble,22,5,'#44424c',s);
    if(player.face>0){ rp(x+38,y+1+wobble,16,6,'#26252d',s); rp(x+32,y+5+wobble,10,4,'#44424c',s); }
    else { rp(x+2,y+1+wobble,16,6,'#26252d',s); rp(x+14,y+5+wobble,10,4,'#44424c',s); }
    rp(x+17,y+23+wobble,20,8,'#5d3c2a',s); rp(x+14,y+27+wobble,26,5,'#6c4531',s);
    if(state==='follower'){ rp(x+46,y+10,3,3,'#ff38f5',s); rp(x+50,y+14,3,3,'#00fff0',s); }
  }
  function drawJetta(x,y,state,s){
    crewBaseStanding(x,y,s,'#d88b52','#151923','#202842','#111','flat');
    rp(x+10,y+50,36,16,'#a51d32',s); rp(x+8,y+42,40,14,'#20242e',s);
    rp(x-8,y+6,68,10,'#16141a',s); rp(x+5,y-10,42,20,'#201d24',s); rp(x+13,y-15,24,6,'#2d2931',s);
    rp(x+12,y+17,32,8,'#111',s);
    const colors=['#39ff72','#ffd274','#ff4d7d','#4aa5ff','#b277ff'];
    for(let i=0;i<5;i++) rp(x+14+i*6,y+18,5,6,colors[i],s);
    if(state==='follower'||player.mushroomTimer>0){ rp(x-5,y+82,7,4,'#ff4d7d',s); rp(x+55,y+80,6,4,'#ffd274',s); }
  }
  function drawKomisaras(x,y,state,s){
    const bounce = state==='walk' || state==='follower' ? Math.sin(now()/110)*3 : 0;
    crewBaseStanding(x,y+bounce,s,'#ef9e59','#efe0b6','#2c4ea8','#111','grin');
    rp(x+8,y-5+bounce,34,8,'#1e1f2a',s); rp(x+32,y-2+bounce,18,5,'#1e1f2a',s); rp(x+15,y-9+bounce,18,5,'#323545',s);
    rp(x+8,y+36+bounce,7,23,'#ef9e59',s); rp(x+43,y+36+bounce,7,23,'#ef9e59',s);
    if(state==='jump'){ text('easy',x+24*s,y-24*s,10*s,'#ffd274','center'); }
  }
  function drawLastas(x,y,state,s){
    const low = state==='leader' || state==='walk' || state==='follower' || state==='idle';
    const yy = low ? y+36 : y+20;
    px(x+4*s,yy+44*s,70*s,8*s,'rgba(0,0,0,.30)');
    rp(x+8,yy+20,45,18,'#efe0b6',s); rp(x+4,yy+31,26,8,'#c77741',s); rp(x+45,yy+31,24,8,'#c77741',s);
    rp(x+36,yy+5,26,22,'#ef9e59',s); rp(x+39,yy+1,16,8,'#2b1712',s); rp(x+46,yy-4,6,14,'#2b1712',s);
    rp(x+43,yy+13,4,4,'#111',s); rp(x+54,yy+13,4,4,'#111',s); rp(x+44,yy+21,14,3,'#7f2f24',s); rp(x+47,yy+21,8,1,'#ffd7b2',s);
    if(state==='follower'||state==='walk'){ rp(x+2,yy+30,8,6,'#6b4324',s); rp(x+62,yy+29,8,6,'#6b4324',s); }
  }
  function drawPlikas(x,y,state,s){
    crewBaseStanding(x,y,s,'#ef9e59','#8a4c22','#433021','#111','open');
    rp(x+13,y+3,30,20,'#ef9e59',s); rp(x+16,y+10,24,4,'#c77741',s);
    rp(x+16,y+13,8,3,'#3a2415',s); rp(x+31,y+13,8,3,'#3a2415',s);
    rp(x+48,y+48,8,18,'#7a1d0d',s); rp(x+45,y+42,14,13,'#ff8a2a',s); rp(x+49,y+38,7,12,'#ffd274',s);
    drawGem(x-6*s,y+49*s,.65*s);
  }
  function drawGriga(x,y,state,s){
    const glitch = Math.sin(now()/80)>0 ? 1 : -1;
    crewBaseStanding(x,y,s,'#e69150','#11131a','#10131d','#ff5c9a','open');
    rp(x+10,y-1,34,8,'#151018',s); rp(x+12,y+2,30,8,'#20151d',s);
    rp(x+7,y+35,9,25,'#090a0e',s); rp(x+40,y+35,9,25,'#090a0e',s);
    rp(x+17,y+28,20,4,'#3b221d',s);
    px(x+(54+glitch*2)*s,y+18*s,3*s,3*s,'#ff4dff'); px(x+(-6+glitch)*s,y+8*s,3*s,3*s,'#4aa5ff'); px(x+48*s,y-5*s,3*s,3*s,'#78b7ff');
    if(player.tabs>=2||state==='follower') text('...',x+24*s,y-24*s,10*s,'#78b7ff','center');
  }
  function drawMartinas(x,y,state,s){
    const pulse = Math.sin(now()/180)*2;
    crewBaseStanding(x,y+Math.max(0,pulse),s,'#c77741','#8fb2d8','#202842','#111','flat');
    rp(x+12,y+2+pulse,32,24,'#c77741',s); rp(x+13,y-4+pulse,7,29,'#101016',s); rp(x+28,y-5+pulse,7,30,'#101016',s); rp(x+42,y-2+pulse,6,24,'#101016',s);
    rp(x+8,y+15+pulse,40,11,'#08090d',s); rp(x+10,y+16+pulse,36,5,'#111827',s);
    rp(x+17,y+27+pulse,22,8,'#2b1814',s);
    rp(x+7,y+49,44,30,'#9eb7d9',s); rp(x+9,y+51,7,22,'#d9f1ff',s); rp(x+29,y+52,7,20,'#d9f1ff',s); rp(x+43,y+53,5,18,'#6a7eaa',s);
    text('♪',x+58*s,y+2*s,18*s,'#b277ff','center');
  }
  function drawCrewParticles(id,x,y,s,state){
    if(id==='griga'){
      for(let i=0;i<4;i++){ const ox=Math.sin(now()/90+i)*20; const oy=Math.cos(now()/110+i)*18; px(x+(28+ox)*s,y+(18+oy)*s,2*s,2*s,i%2?'#ff4dff':'#4aa5ff'); }
    }
    if(id==='martinas'){
      for(let i=0;i<3;i++){ const ox=48+i*9; const oy=6+Math.sin(now()/170+i)*7; text('♪',x+ox*s,y+oy*s,11*s,i%2?'#b277ff':'#4aa5ff','center'); }
    }
    if(id==='plikas' && Math.sin(now()/130)>0){ px(x+58*s,y+40*s,5*s,9*s,'#ffd274'); px(x+56*s,y+45*s,9*s,11*s,'#ff8a2a'); }
    if(id==='jetta' && player.mushroomTimer>0){ drawMushroom(x+56*s,y+76*s,.55*s); }
  }
  function drawCrewCharacter(entity,x,y,state='idle',scale=1,label=false){
    const id = crewId(entity); const f = typeof entity==='object' ? entity : friends.find(ff=>ff.id===id) || {id:id,name:crewProfile(id).name,short:crewProfile(id).short};
    const profile = crewProfile(id); const s = scale * (profile.scale || 1);
    drawCrewParticles(id,x,y,s,state);
    if(id==='gudras') drawGudras(x,y,state,s);
    else if(id==='jetta') drawJetta(x,y,state,s);
    else if(id==='komisaras') drawKomisaras(x,y,state,s);
    else if(id==='lastas') drawLastas(x,y,state,s);
    else if(id==='plikas') drawPlikas(x,y,state,s);
    else if(id==='griga') drawGriga(x,y,state,s);
    else if(id==='martinas') drawMartinas(x,y,state,s);
    else drawCharacterBase(x,y,friendOpts(f),s);
    if(label){ text(f.name || profile.name,x+28*s,y-31*s,12,'#ffe3a6','center'); }
  }
  function drawFriend(f, x, y, label=false){
    drawCrewCharacter(f,x,y,'idle',1,label);
  }
  function drawSceneryForFriend(f,x,y){
    if(f.id==='jetta'){
      px(x-72,y+70,58,24,'#8f1020'); px(x-63,y+58,34,16,'#b31d2d'); px(x-66,y+78,12,12,'#111'); px(x-31,y+78,12,12,'#111'); px(x-56,y+62,18,7,'#ffd274');
    }
    if(f.id==='griga'){
      px(x-38,y+44,36,28,'#10131d'); px(x-34,y+48,28,16,'#1a2b3d'); px(x-31,y+51,5,4,'#4aa5ff'); px(x-21,y+55,5,4,'#ff4dff'); px(x-10,y+51,5,4,'#78b7ff');
    }
    if(f.id==='plikas'){
      px(x-24,y+62,16,20,'#5b2b16'); px(x-26,y+50,20,16,'#ff8a2a'); px(x-20,y+44,9,13,'#ffd274'); drawGem(x-45,y+62,.65);
    }
    if(f.id==='martinas'){
      px(x-36,y+58,24,34,'#11131a'); px(x-31,y+64,14,14,'#333345'); px(x-28,y+68,8,8,'#0b0b10');
      px(x+58,y+58,24,34,'#11131a'); px(x+63,y+64,14,14,'#333345'); px(x+66,y+68,8,8,'#0b0b10');
    }
    if(f.id==='lastas'){
      px(x-40,y+82,108,14,'#3b2312'); px(x-18,y+74,60,8,'#6b4324');
    }
  }
  function drawCrewTubPose(id,x,y,s,i){
    const bob = Math.sin(now()/230+i)*4;
    const yy = y+bob;
    if(id==='gudras'){ drawGudras(x,yy, 'tub', .55*s); }
    else if(id==='jetta'){ drawJetta(x,yy, 'tub', .55*s); }
    else if(id==='komisaras'){ drawKomisaras(x,yy, 'tub', .52*s); }
    else if(id==='lastas'){ drawLastas(x-8,yy-18, 'tub', .55*s); }
    else if(id==='plikas'){ drawPlikas(x,yy, 'tub', .55*s); }
    else if(id==='griga'){ drawGriga(x,yy, 'tub', .55*s); }
    else if(id==='martinas'){ drawMartinas(x,yy, 'tub', .55*s); }
  }
  function drawTubCrew(x,y,w){
    const ids = ['gudras'].concat(friends.filter(f=>f.collected).map(f=>f.id));
    const shown = player.trueEnding ? ['gudras','jetta','komisaras','lastas','plikas','griga','martinas'] : ids.slice(0,7);
    shown.forEach((id,i)=>drawCrewTubPose(id,x+14+i*35,y+10,1,i));
  }
  `;

  window.enhanceCrewSystemHtml = function(html){
    if(html.includes('CREW_PROFILES')) return html;
    html = html.replace('  function activeLeadObject(){', crewSystemCode + '\n\n  function activeLeadObject(){');

    html = html.replace(/function drawFriend\(f, x, y, label=false\)\{[\s\S]*?\n  \}\n\n  function activeLeadObject/, 'function drawFriend(f, x, y, label=false){\n    drawCrewCharacter(f,x,y,\'idle\',1,label);\n  }\n\n  function activeLeadObject');

    html = html.replace(/function drawPlayer\(\)\{[\s\S]*?\n  \}\n\n  function followersList/, String.raw`function drawPlayer(){
    if(player.overdoseTimer>0){
      drawCrewCharacter('gudras',sx(player.x),sy(player.y+34+Math.sin(now()/50)*4),'collapsed',1,false);
      text('too many diamonds',sx(player.x)+35,sy(player.y+38),12,'#ffb7ff','center');
      return;
    }
    const lead=activeLeadObject();
    const state = !player.onGround ? 'jump' : Math.abs(player.vx)>.7 ? 'walk' : (lead ? 'leader' : 'idle');
    if(lead) drawCrewCharacter(lead,sx(player.x),sy(player.y),state,1,false);
    else drawCrewCharacter('gudras',sx(player.x),sy(player.y),state,1,false);
  }

  function followersList`);

    html = html.replace(/function updateFollowers\(\)\{[\s\S]*?\n  \}\n\n  function drawFollowers\(\)\{[\s\S]*?\n  \}\n\n  function drawUncollectedFriends/, String.raw`function updateFollowers(){
    const list=followersList();
    let tx=player.x - player.face*58, ty=player.y+10;
    list.forEach((f,i)=>{
      const id=crewId(f), profile=crewProfile(id);
      if(!Number.isFinite(f.fx)){ f.fx=tx; f.fy=ty; }
      const crawlDrop = id==='lastas' ? 24 : 0;
      const spacing = (profile.spacing || 58) + i*7;
      const desiredX=tx - player.face*spacing;
      const desiredY=ty + crawlDrop + Math.sin(now()/(profile.speed||220)+i)*((profile.bob||4)+2);
      const followEase = id==='gudras' ? .055 : id==='jetta' ? .065 : id==='martinas' ? .06 : id==='komisaras' ? .11 : .08;
      f.fx += (desiredX - f.fx)*followEase;
      f.fy += (desiredY - f.fy)*followEase;
      tx=f.fx; ty=f.fy-crawlDrop;
    });
  }

  function drawFollowers(){
    followersList().forEach((f,i)=>{
      const id=crewId(f);
      const y=f.fy + Math.sin(now()/180+i)*(id==='martinas'?2:4);
      drawCrewCharacter(f,sx(f.fx),sy(y),'follower',id==='gudras'?.82:.86,false);
      if(i%3===0 && id==='komisaras') text('I saw that.',sx(f.fx)+22,sy(y)-18,9,'#ffd274','center');
    });
  }

  function drawUncollectedFriends`);

    html = html.replace(/function drawUncollectedFriends\(\)\{[\s\S]*?\n  \}\n\n  function drawHotTub/, String.raw`function drawUncollectedFriends(){
    friends.forEach(f=>{
      if(f.collected) return;
      let bob=Math.sin(now()/300+f.x)*5;
      drawSceneryForFriend(f,sx(f.x),sy(f.y+bob));
      drawCrewCharacter(f,sx(f.x),sy(f.y+bob),'idle',1,true);
    });
  }

  function drawHotTub`);

    html = html.replace(/if\(player\.completed\)\{\n      const collected = friends\.filter\(f=>f\.collected\);[\s\S]*?    \} else \{\n      text\('EMPTY TUB WAITING'/, "if(player.completed){\n      drawTubCrew(x,y,tub.w);\n    } else {\n      text('EMPTY TUB WAITING'");

    return html;
  };
})();
