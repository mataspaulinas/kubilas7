(function(){
  const tabStateCode = String.raw`
  const SECOND_TAB_DURATION = 1800;
  function isSecondTabActive(){ return (player.secondTabTimer || 0) > 0; }
  function secondTabRatio(){ return Math.max(0, Math.min(1, (player.secondTabTimer || 0) / SECOND_TAB_DURATION)); }
  function activateSecondTab(){ player.secondTabTimer = SECOND_TAB_DURATION; }
  `;

  window.enhanceTabStateHtml = function(html){
    if(html.includes('SECOND_TAB_DURATION')) return html;

    html = html.replace(
      '  const camera = {x:0, shakeX:0, shakeY:0};',
      tabStateCode + '\n\n  const camera = {x:0, shakeX:0, shakeY:0};'
    );

    // Make meltdown/second-tab visuals depend on the active timer, not just permanent collected count.
    html = html.replaceAll('player.tabs>=2', 'isSecondTabActive()');
    html = html.replaceAll('player.tabs >= 2', 'isSecondTabActive()');

    // Full restart should clear active second-tab state.
    html = html.replace(
      "camera.x=0; camera.shakeX=0; camera.shakeY=0;\n    setMessage('Saturday morning. The forest villa ritual begins.',360);",
      "player.secondTabTimer=0;\n    camera.x=0; camera.shakeX=0; camera.shakeY=0;\n    setMessage('Saturday morning. The forest villa ritual begins.',360);"
    );

    // Timer countdown in update loop.
    html = html.replace(
      "if(player.mushroomTimer>0) player.mushroomTimer--;\n    if(player.deepLandingMessage>0) player.deepLandingMessage--;",
      "if(player.mushroomTimer>0) player.mushroomTimer--;\n    if(player.secondTabTimer>0){\n      player.secondTabTimer--;\n      if(player.secondTabTimer===0 && player.deepTripTimer<=0 && !player.completed){\n        setMessage('Second tab wears off. Reality becomes readable again.',240);\n      }\n    }\n    if(player.deepLandingMessage>0) player.deepLandingMessage--;"
    );

    // Add a small active-timer bar under the tab HUD when second tab is active.
    html = html.replace(
      "drawTab(W-238,45,.85); text(String(player.tabs)+'/3',W-200,42,22,palette.cream);",
      "drawTab(W-238,45,.85); text(String(player.tabs)+'/3',W-200,42,22,palette.cream);\n    if(isSecondTabActive()){ px(W-155,70,132,6,'#2a1a0d'); px(W-153,72,128*secondTabRatio(),3,'#ff4dff'); }"
    );

    // Replace original tab collection with stateful tab logic:
    // tab 2 starts a timer; tab 3 only causes deep-trip knockout while tab 2 is still active.
    html = html.replace(/tabs\.forEach\(\(t,i\)=>\{[\s\S]*?\n    \}\);\n\n    friends\.forEach/, String.raw`tabs.forEach((t,i)=>{
      if(t.got) return;
      if(rectsOverlap(rect,{x:t.x,y:t.y,w:30,h:30})){
        const tabNumber = i + 1;
        t.got=true;
        player.tabs = Math.max(player.tabs, tabNumber);
        player.warmFlash=90;
        audio.tabHit(player.tabs);
        if(tabNumber===1){
          setMessage('First tab dissolves. The forest starts smiling back.',280);
        }
        if(tabNumber===2){
          activateSecondTab();
          setMessage('Second tab active. Meltdown window opened — it will wear off.',340);
        }
        if(tabNumber===3){
          if(isSecondTabActive()){
            player.deepTripTimer=hasFriend('martinas') ? 360 : 500;
            setMessage(hasFriend('martinas') ? 'Third tab lands while the second is active. mArtinas holds the frequency.' : 'Third tab lands while the second is active. Blackout loading...',340);
          } else {
            setMessage('Third tab was too late. No knockout — the second tab had already worn off.',360);
          }
        }
      }
    });

    friends.forEach`);

    return html;
  };
})();
