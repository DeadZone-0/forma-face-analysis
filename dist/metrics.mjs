export const TIERS=[{name:'LTN',full:'Low-tier normie',min:0,max:4},{name:'MTN',full:'Mid-tier normie',min:4,max:5},{name:'HTN',full:'High-tier normie',min:5,max:6},{name:'Chadlite',full:'Chadlite',min:6,max:7},{name:'Chad',full:'Chad',min:7,max:8}];
export function analyze(landmarks,width,height){
 if(!landmarks||landmarks.length<468||!(width>0&&height>0))throw Error('Complete facial landmarks and valid image dimensions are required.');
 const raw=landmarks.map(p=>({x:p.x*width,y:p.y*height}));
 if(raw.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))throw Error('Invalid facial coordinates.');
 const mid=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
 const eyeA=mid(raw[33],raw[133]),eyeB=mid(raw[362],raw[263]),origin=mid(eyeA,eyeB);
 const roll=Math.atan2(eyeB.y-eyeA.y,eyeB.x-eyeA.x),c=Math.cos(roll),s=Math.sin(roll);
 const p=raw.map(a=>({x:(a.x-origin.x)*c+(a.y-origin.y)*s,y:-(a.x-origin.x)*s+(a.y-origin.y)*c}));
 const d=(a,b)=>Math.hypot(p[a].x-p[b].x,p[a].y-p[b].y),v=(a,b)=>Math.abs(p[a].y-p[b].y);
 const fw=d(234,454),fh=v(10,152),eyeW=(d(33,133)+d(362,263))/2;
 if(Math.min(fw,fh,eyeW)<1)throw Error('Face is too small to measure. Use a closer, sharper portrait.');
 const tilt=(outer,inner)=>Math.atan2(p[inner].y-p[outer].y,Math.abs(p[inner].x-p[outer].x))*180/Math.PI;
 const values={faceRatio:fw/fh,eyeSpacing:d(133,362)/eyeW,noseRatio:d(98,327)/d(61,291),lowerFace:v(2,152)/fh,mouthRatio:d(61,291)/fw,jawRatio:d(172,397)/fw,tiltLeft:tilt(33,133),tiltRight:tilt(263,362)};
 const pairs=[[33,263],[133,362],[61,291],[98,327],[172,397],[234,454]];
 const center=(p[10].x+p[152].x)/2;
 const asymmetry=pairs.reduce((sum,[a,b])=>sum+Math.hypot((p[a].x-center)+(p[b].x-center),p[a].y-p[b].y),0)/pairs.length/fw*100;
 const yaw=Math.abs(d(1,234)-d(1,454))/fw;
 const features=[
 {id:'faceRatio',name:'Facial width / height',value:values.faceRatio,unit:'ratio',detail:'Cheek width ÷ upper-forehead landmark to chin. This is not the anthropometric fWHR.',segments:[[234,454],[10,152]]},
 {id:'eyeSpacing',name:'Eye spacing',value:values.eyeSpacing,unit:'×',detail:'Inner-eye gap ÷ average eye width.',segments:[[133,362],[33,133],[362,263]]},
 {id:'tiltLeft',name:'Image-left canthal tilt',value:values.tiltLeft,unit:'°',detail:'Outer-to-inner eye angle after correcting for head roll.',segments:[[33,133]]},
 {id:'tiltRight',name:'Image-right canthal tilt',value:values.tiltRight,unit:'°',detail:'Positive means the outer corner sits higher in the image.',segments:[[362,263]]},
 {id:'noseRatio',name:'Nose / mouth width',value:values.noseRatio,unit:'ratio',detail:'Nostril landmark span ÷ mouth-corner span.',segments:[[98,327],[61,291]]},
 {id:'lowerFace',name:'Lower-face share',value:values.lowerFace*100,unit:'%',detail:'Nose base to chin ÷ upper-forehead landmark to chin. Not a true hairline-based facial third.',segments:[[2,152],[10,152]]},
 {id:'mouthRatio',name:'Mouth / face width',value:values.mouthRatio,unit:'ratio',detail:'Mouth-corner span ÷ cheek width.',segments:[[61,291],[234,454]]},
 {id:'jawRatio',name:'Lower-jaw / cheek width',value:values.jawRatio,unit:'ratio',detail:'Visible lower-jaw landmark span ÷ cheek width. Soft tissue and pose affect this.',segments:[[172,397],[234,454]]},
 {id:'asymmetry',name:'Paired-landmark mismatch',value:asymmetry,unit:'%',detail:'Mean mirrored displacement of six landmark pairs, as a share of face width. Lower means closer alignment in this photo.',segments:pairs}
 ];
 // shortcut: illustrative geometry references, replace with validated calibration before making accuracy claims.
 const references=[['faceRatio',.78,.25],['eyeSpacing',1,.6],['noseRatio',.65,.5],['lowerFace',.36,.2],['mouthRatio',.38,.2]];
 const score=Math.max(0,Math.min(8,8*references.reduce((sum,[key,target,tolerance])=>sum+Math.max(0,1-Math.abs(values[key]-target)/tolerance),0)/references.length));
 const tier=TIERS.find(t=>score<t.max)||TIERS.at(-1);
 const warnings=[];if(yaw>.12)warnings.push('Head appears turned; use a straight-on photo.');if(Math.abs(roll)>12*Math.PI/180)warnings.push('Strong head roll detected; keep your head upright.');if(fw<180)warnings.push('Face resolution is low; upload a closer portrait.');
 return {features,values,score,tier,warnings,roll:roll*180/Math.PI,yaw,references,landmarkCount:landmarks.length};
}
export function formatMetric(m){return `${m.value.toFixed(m.unit==='°'||m.unit==='%'?1:2)}${m.unit==='ratio'?'':m.unit}`}
