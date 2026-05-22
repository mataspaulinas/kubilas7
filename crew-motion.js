(function(){
  const crewMotionCode = String.raw`
  const CREW_PROFILES = {
    gudras:{name:'Gudras',short:'Gudras',spacing:62,bob:5,speed:210,scale:1},
    jetta:{name:'Jetta',short:'Jetta',spacing:66,bob:2,speed:340,scale:1},
    komisaras:{name:'Komisaras',short:'Komisaras',spacing:56,bob:8,speed:145,scale:.96},
    lastas:{name:'Ląstas',short:'Ląstas',spacing:76,bob:3,speed:180,scale:1},
    plikas:{name:'Plikas',short:'Plikas',spacing:60,bob:2,speed:230,scale:1},
    griga:{name:'Griga',short:'Griga',spacing:60,bob:3,speed:160,scale:1},
    martinas:{name:'mArtinas',short:'mArtinas',spacing:70,bob:2,speed:260,scale:1}
  };
  function crewId(entity){ return entity && entity.id==='heroFollower' ? 'gudras' : (typeof entity==='string' ? entity : (entity && entity.id) || 'gudras'); }
  function crewProfile(id){ return CREW_PROFILES[id] || CREW_PROFILES.gudras; }
  function cp(x,y,w,h,c,s=1){ px(x*s,y*s,w*s,h*s,c); }
  function drawLastasCrawl(x,y,s,label){
    const yy=y+36;
    px(x+4*s,yy+44*s,70*s,8*s,'rgba(0,0,0,.30)');
    cp(x+8,yy+20,45,18,'#efe0b6',s); cp(x+4,yy+31,26,8,'#c77741',s); cp(x+45,yy+31,24,8,'#c77741',s);
    cp(x+36,yy+5,26,22,'#ef9e59',s); cp(x+39,yy+1,16,8,'#2b1712',s); cp(x+46,yy-4,6,14,'#2b1712',s);
    cp(x+43,yy+13,4,4,'#111',s); cp(x+54,yy+13,4,4,'#111',s); cp(x+44,yy+21,14,3,'#7f2f24',s); cp(x+47,yy+21,8,1,'#ffd7b2',s);
    cp(x+2,yy+30,8,6,'#6b4324',s); cp(x+62,yy+29,8,6,'#6b4324',s);
    if(label) text('Ląstas',x+30*s,y+2*s,12,'#ffe3a6','center');
  }
  function drawCrewMotionParticles(id,x,y,s,state){
    if(id==='griga'){
      for(let i=0;i<4;i++){ const ox=Math.sin(now()/90+i)*20; const oy=Math.cos(now()/110+i)*18; px(x+(28+ox)*s,y+(18+oy)*s,2*s,2*s,i%2?'#ff4dff':'#4aa5ff'); }
    }
    if(id==='martinas'){
      for(let i=0;i<3;i++){ const ox=48+i*9; const oy=6+Math.sin(now()/170+i)*7; text('♪',x+ox*s,y+oy*s,11*s,i%2?'#b277ff':'#4aa5ff','center'); }
    }
    if(id==='plikas' && Math.sin(now()/130)>0){ px(x+58*s,y+40*s,5*s,9*s,'#ffd274'); px(x+56*s,y+45*s,9*s,11*s,'#ff8a2a'); }
    if(id==='jetta' && player.mushroomTimer>0){ drawMushroom(x+56*s,y+76*s,.55*s); }
    if(id==='gudras' && player.tabs>0){ px(x+50*s,y+5*s,3*s,3*s,'#ff38f5'); px(x+55*s,y+11*s,3*s,3*s,'#00fff0'); }
  }
  function drawCrewCharacter(entity,x,y,state='idle',scale=1,label=false){
    const id=crewId(entity); const f = typeof entity==='object' ? entity : friends.find(ff=>ff.id===id) || {id:id,name:crewProfile(id).name,short:crewProfile(id).short};
    const profile=crewProfile(id); const s=scale*(profile.scale||1);
    const bob = state==='walk'||state==='follower' ? Math.sin(now()/(profile.speed||200))*profile.bob : 0;
    drawCrewMotionParticles(id,x,y+bob,s,state);
    if(id==='lastas'){
      drawLastasCrawl(x,y+bob,s,label);
      return;
    }
    if(id==='gudras'){
      drawCharacterBase(x,y+bob,{kind:'hero',eye:player.tabs>0?(player.tabs>=2?'#ff38f5':'#de342d'):'#de342d'},s);
      if(state==='follower') text('?',x+50*s,y+4*s,14*s,'#ffb7ff','center');
    } else {
      drawCharacterBase(x,y+bob,friendOpts(f),s);
      if(typeof drawCharacterAccessory==='function') drawCharacterAccessory(f,x,y+bob);
    }
    if(id==='komisaras' && state==='jump') text('easy',x+25*s,y-22*s,10*s,'#ffd274','center');
    if(id==='griga' && (state==='follower'||player.tabs>=2)) text('...',x+24*s,y-24*s,10*s,'#78b7ff','center');
    if(label) text(f.name||profile.name,x+28*s,y-31*s,12,'#ffe3a6','center');
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
  function drawCrewTubPose(id,x,y,i){
    const bob=Math.sin(now()/230+i)*4;
    drawCrewCharacter(id,x,y+bob,'tub',.54,false);
  }
  function drawTubCrew(x,y,w){
    const ids = player.trueEnding ? ['gudras','jetta','komisaras','lastas','plikas','griga','martinas'] : ['gudras'].concat(friends.filter(f=>f.collected).map(f=>f.id)).slice(0,7);
    ids.forEach((id,i)=>drawCrewTubPose(id,x+14+i*35,y+10,i));
  }
  `;

  window.enhanceCrewMotionHtml = function(html){
    if(html.includes('CREW_PROFILES')) return html;
    html = html.replace('  function activeLeadObject(){', crewMotionCode + '\n\n  function activeLeadObject(){');

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
