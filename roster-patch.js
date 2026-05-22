(function(){
  function addCssPatch(html, cssPatch){
    if(!cssPatch || html.includes('touch-landscape-control-fix')) return html;
    return html.replace('</head>', cssPatch + '</head>');
  }

  function patchRoster(html){
    const roster = String.raw`const friends = [
    {id:'jetta',name:'Jetta',short:'Jetta',x:1245,y:260,w:48,h:86,kind:'ranger',color:'#d23743',collected:false,fx:0,fy:0,line:'I brought what matters. Mushroom supply upgraded.',tubLine:'Medicine delivered.'},
    {id:'komisaras',name:'Komisaras',short:'Komisaras',x:3305,y:214,w:44,h:76,kind:'apprentice',color:'#ffd274',collected:false,fx:0,fy:0,line:'Learning from the best. Bonus jump unlocked.',tubLine:'I told you I got it.'},
    {id:'lastas',name:'Ląstas',short:'Ląstas',x:6905,y:390,w:62,h:34,kind:'crawler',color:'#efe0b6',collected:false,fx:0,fy:0,line:'Sometimes walking is optional. Low route sense unlocked.',tubLine:'I found the low road.'},
    {id:'plikas',name:'Plikas',short:'Plikas',x:8750,y:380,w:44,h:70,kind:'fire',color:'#ff8a2a',collected:false,fx:0,fy:0,line:'Gems and chaos. Diamond tolerance increased.',tubLine:'Nothing burned. Mostly.'},
    {id:'griga',name:'Griga',short:'Griga',x:9360,y:232,w:44,h:76,kind:'glitch',color:'#78b7ff',collected:false,fx:0,fy:0,line:'I think reality is buffering. Glitch sense active.',tubLine:'System stable.'},
    {id:'martinas',name:'mArtinas',short:'mArtinas',x:10470,y:260,w:54,h:78,kind:'frequency',color:'#b277ff',collected:false,fx:0,fy:0,line:'Hold the frequency. Psytrance stabiliser active.',tubLine:'Frequency restored.'}
  ];`;

    const accessory = String.raw`function drawCharacterAccessory(f,x,y){
    if(!f) return;
    if(f.id==='jetta'){
      px(x-8,y+7,64,9,'#16141a'); px(x+4,y-9,42,18,'#201d24'); px(x+13,y-14,24,6,'#2d2931');
      px(x+14,y+18,28,7,'#111');
      px(x+14,y+18,6,7,'#39ff72'); px(x+20,y+18,6,7,'#ffd274'); px(x+26,y+18,6,7,'#ff4d7d'); px(x+32,y+18,6,7,'#4aa5ff');
      px(x+5,y+54,42,13,'#9b1828');
    }
    if(f.id==='komisaras'){
      px(x+8,y-5,34,8,'#1e1f2a'); px(x+32,y-2,18,5,'#1e1f2a'); px(x+15,y-9,18,5,'#323545');
      text('!',x+48,y+8,16,'#ffd274','center');
    }
    if(f.id==='lastas'){
      px(x+4,y+8,50,12,'#3b2418'); px(x+12,y+2,7,18,'#2b1712'); px(x+25,y+4,6,17,'#2b1712');
      px(x+10,y+31,44,8,'#efe0b6');
    }
    if(f.id==='plikas'){
      px(x+20,y-1,18,5,'#ffc582'); px(x+25,y+3,7,4,'#fff0bd');
      px(x+48,y+48,8,18,'#7a1d0d'); px(x+45,y+42,14,13,'#ff8a2a'); px(x+49,y+38,7,12,'#ffd274');
      drawGem(x-4,y+50,.65);
    }
    if(f.id==='griga'){
      px(x+7,y+36,8,22,'#11131a'); px(x+39,y+36,8,22,'#11131a');
      px(x-8,y+8,3,3,'#4aa5ff'); px(x+54,y+18,3,3,'#ff4dff'); px(x+48,y-5,3,3,'#78b7ff');
      text('...',x+24,y-24,10,'#78b7ff','center');
    }
    if(f.id==='martinas'){
      px(x+8,y+15,40,10,'#08090d'); px(x+10,y+16,36,5,'#111827'); px(x+9,y+54,40,26,'#8fb2d8');
      px(x+13,y-4,7,28,'#101016'); px(x+28,y-5,7,30,'#101016'); px(x+42,y-2,6,24,'#101016');
      text('♪',x+57,y+2,20,'#b277ff','center');
    }
  }`;

    const friendOpts = String.raw`function friendOpts(f){
    if(f.id==='jetta') return {kind:'normal',shirt:'#aa1f33',hair:'#2b1814',skin2:'#d88b52',eye:'#111'};
    if(f.id==='komisaras') return {kind:'normal',shirt:'#efe0b6',hair:'#382214',skin2:'#ef9e59',eye:'#111'};
    if(f.id==='lastas') return {kind:'mud',skin2:'#ef9e59',hair:'#2b1814'};
    if(f.id==='plikas') return {kind:'normal',shirt:'#8a4c22',hair:'#ef9e59',skin2:'#ef9e59',eye:'#111'};
    if(f.id==='griga') return {kind:'normal',shirt:'#11131a',hair:'#151018',skin2:'#e69150',eye:'#ff5c9a'};
    if(f.id==='martinas') return {kind:'dj',shirt:'#9eb7d9',skin2:'#c77741',eye:'#111'};
    return {kind:'normal'};
  }`;

    const helpers = String.raw`function hasFriend(id){ return friends.some(f=>f.id===id && f.collected); }
  function takeoverMessage(id){
    const lines={
      martinas:'Gudras is gone. mArtinas holds the frequency.',
      jetta:'Gudras is offline. Jetta now guides the caravan.',
      griga:'Gudras has left the control room. Griga is now running diagnostics.',
      komisaras:'Komisaras takes the lead. He has watched enough tutorials.',
      plikas:'Plikas takes the lead. Fire safety has left the forest.',
      lastas:'Ląstas takes the lead. The route is now mostly horizontal.'
    };
    return lines[id] || 'Someone takes the lead. Gudras glows in the back.';
  }`;

    html = html.replace(/const friends = \[[\s\S]*?\n  \];\n\n  const heroFollower/, roster + '\n\n  const heroFollower');
    html = html.replace(/function friendOpts\(f\)\{[\s\S]*?\n  \}\n\n  function drawFriend/, accessory + '\n\n  ' + friendOpts + '\n\n  function drawFriend');
    html = html.replace('drawCharacterBase(x,y,opts,1);\n    if(label){', 'drawCharacterBase(x,y,opts,1);\n    drawCharacterAccessory(f,x,y);\n    if(label){');
    html = html.replace('  function activeLeadObject(){', '  ' + helpers + '\n\n  function activeLeadObject(){');

    html = html.replace(
      "camera.shakeX = player.tabs>=2 ? Math.sin(now()/23)*7 + Math.cos(now()/37)*4 : 0;\n    camera.shakeY = player.tabs>=2 ? Math.cos(now()/31)*5 : 0;",
      "const tripStability = (hasFriend('griga') ? .68 : 1) * (hasFriend('martinas') ? .55 : 1);\n    camera.shakeX = player.tabs>=2 ? (Math.sin(now()/23)*7 + Math.cos(now()/37)*4) * tripStability : 0;\n    camera.shakeY = player.tabs>=2 ? Math.cos(now()/31)*5 * tripStability : 0;"
    );

    html = html.replace(
      "if(player.invuln<=0 && rectsOverlap(rect,b)){\n        player.vx*=-.6; player.vy=-6; player.invuln=50; setMessage('Low branch disagreed with your forehead.',120);\n      }",
      "if(player.invuln<=0 && rectsOverlap(rect,b)){\n        if(hasFriend('lastas')){ player.vx*=.72; player.vy=Math.min(player.vy,-2); player.invuln=45; setMessage('Ląstas shows the low route. Forehead saved.',120); }\n        else { player.vx*=-.6; player.vy=-6; player.invuln=50; setMessage('Low branch disagreed with your forehead.',120); }\n      }"
    );

    html = html.replace(
      "const leadCandidate = friends.find(f=>f.collected);\n        if(leadCandidate){\n          player.activeLead=leadCandidate.id;\n          heroFollower.fx=player.x-80; heroFollower.fy=player.y+20;\n          setMessage(leadCandidate.short+' takes the lead. Original hero is now a glowing passenger.',360);\n        } else {\n          setMessage('No friend was steady enough to take over. Hero returns, barely.',300);\n        }",
      "const takeoverPriority=['martinas','jetta','griga','komisaras','plikas','lastas'];\n        const leadCandidate = takeoverPriority.map(id=>friends.find(f=>f.id===id && f.collected)).find(Boolean);\n        if(leadCandidate){\n          player.activeLead=leadCandidate.id;\n          heroFollower.fx=player.x-80; heroFollower.fy=player.y+20;\n          setMessage(takeoverMessage(leadCandidate.id),360);\n        } else {\n          setMessage('No friend was steady enough to take over. Hero returns, barely.',300);\n        }"
    );

    html = html.replace(
      "const mushroom = player.mushroomTimer>0;\n    const speedBoost",
      "if(typeof player.airJumps !== 'number') player.airJumps=0;\n    const mushroom = player.mushroomTimer>0;\n    const speedBoost"
    );

    html = html.replace(
      "if(keys.jumpPressed&&player.onGround){ player.vy=jumpPower; player.onGround=false; }\n    keys.jumpPressed=false;",
      "if(player.onGround) player.airJumps = hasFriend('komisaras') ? 1 : 0;\n    if(keys.jumpPressed){\n      if(player.onGround){ player.vy=jumpPower; player.onGround=false; player.airJumps = hasFriend('komisaras') ? 1 : 0; }\n      else if(hasFriend('komisaras') && player.airJumps>0){ player.vy=jumpPower*.92; player.airJumps--; setMessage('Komisaras copies the move. Bonus jump.',80); }\n    }\n    keys.jumpPressed=false;"
    );

    html = html.replace(
      "if(player.diamonds===15 && !player.overdoseUsed){",
      "const overloadLimit = hasFriend('plikas') ? 26 : 15;\n        if(player.diamonds>=overloadLimit && !player.overdoseUsed){"
    );
    html = html.replace(
      "setMessage('15 diamonds. Euphoria overflow. Floor mode activated.',320);",
      "setMessage(hasFriend('plikas') ? 'Even Plikas says that is enough gems. Floor mode activated.' : '15 diamonds. Euphoria overflow. Floor mode activated.',320);"
    );

    html = html.replace(
      "m.got=true; player.mushrooms++; player.mushroomTimer=1500; player.warmFlash=80;\n        setMessage('Magic mushroom: floaty jump, slippery joy, breathing trees.',260);",
      "m.got=true; player.mushrooms++; player.mushroomTimer=hasFriend('jetta') ? 2350 : 1500; player.warmFlash=80;\n        setMessage(hasFriend('jetta') ? 'Jetta handles the supply. Mushroom mode lasts longer.' : 'Magic mushroom: floaty jump, slippery joy, breathing trees.',260);"
    );

    html = html.replace(
      "if(player.tabs===3){ player.deepTripTimer=500; setMessage('Third tab. Ego death loading...',300); }",
      "if(player.tabs===3){ player.deepTripTimer=hasFriend('martinas') ? 360 : 500; setMessage(hasFriend('martinas') ? 'Third tab. mArtinas holds the frequency.' : 'Third tab. Ego death loading...',300); }"
    );

    html = html.replace(
      "MISSION COMPLETE. ALL SEVEN ARE IN THE TUB.",
      "MISSION COMPLETE. ALL 7 LEGENDS ARE IN THE TUB."
    );
    html = html.replace(
      "All seven legends made it. The empty tub is now full.",
      "MISSION COMPLETE. GUDRAS AND THE SIX ARE IN THE TUB."
    );

    return html;
  }

  window.patchHotTubHeroHtml = function(html, cssPatch){
    return patchRoster(addCssPatch(html, cssPatch));
  };
})();
