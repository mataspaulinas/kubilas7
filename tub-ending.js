(function(){
  const tubEndingPatchCode = String.raw`
  function tubCrewIds(){
    const collected = friends.filter(f=>f.collected).map(f=>f.id);
    return ['gudras'].concat(collected).slice(0,7);
  }
  function drawTubCrew(x,y,w){
    const ids = player.trueEnding
      ? ['gudras','jetta','komisaras','lastas','plikas','griga','martinas']
      : tubCrewIds();
    const startX = x + Math.max(8, (w - ids.length * 34) / 2);
    ids.forEach((id,i)=>{
      const bob=Math.sin(now()/230+i)*4;
      const poseY = y + 12 + bob;
      if(typeof drawCrewCharacter === 'function') drawCrewCharacter(id,startX+i*34,poseY,'tub',.52,false);
      else {
        const skin=i%2?'#dc8b4d':'#f2a865', hair=i%3===0?'#27242b':'#5d3922';
        px(startX+i*34,poseY+15,22,22,skin); px(startX+i*34+3,poseY+10,16,7,hair);
      }
    });
  }
  function drawFollowers(){
    if(player.completed) return;
    followersList().forEach((f,i)=>{
      const id=typeof crewId==='function' ? crewId(f) : f.id;
      const y=f.fy + Math.sin(now()/180+i)*(id==='martinas'?2:4);
      if(typeof drawCrewCharacter === 'function') drawCrewCharacter(f,sx(f.fx),sy(y),'follower',id==='gudras'?.82:.86,false);
      else if(f.id==='heroFollower') drawCharacterBase(sx(f.fx),sy(y),{kind:'heroFollower',eye:'#ff38f5'},.82);
      else drawFriend(f,sx(f.fx),sy(y),false);
      if(i%3===0 && id==='komisaras') text('I saw that.',sx(f.fx)+22,sy(y)-18,9,'#ffd274','center');
    });
  }
  function drawPlayer(){
    if(player.completed) return;
    if(player.overdoseTimer>0){
      if(typeof drawCrewCharacter === 'function') drawCrewCharacter('gudras',sx(player.x),sy(player.y+34+Math.sin(now()/50)*4),'collapsed',1,false);
      else drawCharacterBase(sx(player.x),sy(player.y+60+Math.sin(now()/50)*4), {kind:'mud',skin2:'#ef9e59'}, 1);
      text('too many diamonds',sx(player.x)+35,sy(player.y+38),12,'#ffb7ff','center');
      return;
    }
    const lead=activeLeadObject();
    const state = !player.onGround ? 'jump' : Math.abs(player.vx)>.7 ? 'walk' : (lead ? 'leader' : 'idle');
    if(typeof drawCrewCharacter === 'function'){
      if(lead) drawCrewCharacter(lead,sx(player.x),sy(player.y),state,1,false);
      else drawCrewCharacter('gudras',sx(player.x),sy(player.y),state,1,false);
    } else {
      if(lead) drawFriend(lead,sx(player.x),sy(player.y),false);
      else drawCharacterBase(sx(player.x),sy(player.y),{kind:'hero'},1);
    }
  }
  `;

  function replaceFunction(html, name, replacement){
    const start = html.indexOf(`function ${name}(`);
    if(start < 0) return html;
    const open = html.indexOf('{', start);
    if(open < 0) return html;
    let depth = 0;
    for(let i=open;i<html.length;i++){
      const ch = html[i];
      if(ch === '{') depth++;
      if(ch === '}') depth--;
      if(depth === 0){
        return html.slice(0,start) + replacement + html.slice(i+1);
      }
    }
    return html;
  }

  window.enhanceTubEndingHtml = function(html){
    if(html.includes('function tubCrewIds()')) return html;
    html = html.replace('  function drawHotTub(){', tubEndingPatchCode + '\n\n  function drawHotTub(){');

    html = replaceFunction(html, 'drawFollowers', `function drawFollowers(){
    if(player.completed) return;
    followersList().forEach((f,i)=>{
      const id=typeof crewId==='function' ? crewId(f) : f.id;
      const y=f.fy + Math.sin(now()/180+i)*(id==='martinas'?2:4);
      if(typeof drawCrewCharacter === 'function') drawCrewCharacter(f,sx(f.fx),sy(y),'follower',id==='gudras'?.82:.86,false);
      else if(f.id==='heroFollower') drawCharacterBase(sx(f.fx),sy(y),{kind:'heroFollower',eye:'#ff38f5'},.82);
      else drawFriend(f,sx(f.fx),sy(y),false);
      if(i%3===0 && id==='komisaras') text('I saw that.',sx(f.fx)+22,sy(y)-18,9,'#ffd274','center');
    });
  }`);

    html = replaceFunction(html, 'drawPlayer', `function drawPlayer(){
    if(player.completed) return;
    if(player.overdoseTimer>0){
      if(typeof drawCrewCharacter === 'function') drawCrewCharacter('gudras',sx(player.x),sy(player.y+34+Math.sin(now()/50)*4),'collapsed',1,false);
      else drawCharacterBase(sx(player.x),sy(player.y+60+Math.sin(now()/50)*4), {kind:'mud',skin2:'#ef9e59'}, 1);
      text('too many diamonds',sx(player.x)+35,sy(player.y+38),12,'#ffb7ff','center');
      return;
    }
    const lead=activeLeadObject();
    const state = !player.onGround ? 'jump' : Math.abs(player.vx)>.7 ? 'walk' : (lead ? 'leader' : 'idle');
    if(typeof drawCrewCharacter === 'function'){
      if(lead) drawCrewCharacter(lead,sx(player.x),sy(player.y),state,1,false);
      else drawCrewCharacter('gudras',sx(player.x),sy(player.y),state,1,false);
    } else {
      if(lead) drawFriend(lead,sx(player.x),sy(player.y),false);
      else drawCharacterBase(sx(player.x),sy(player.y),{kind:'hero'},1);
    }
  }`);

    html = html.replace(
      /if\(player\.completed\)\{[\s\S]*?\n    \} else \{\n      text\('EMPTY TUB WAITING'/,
      "if(player.completed){\n      drawTubCrew(x,y,tub.w);\n    } else {\n      text('EMPTY TUB WAITING'"
    );

    html = html.replace(
      "player.x=13930; player.y=348; player.vx=0; player.vy=0; player.warmFlash=120;",
      "player.x=13930; player.y=348; player.vx=0; player.vy=0; player.warmFlash=120; updateFollowers();"
    );

    return html;
  };
})();
