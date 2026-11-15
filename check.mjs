import assert from 'node:assert/strict';
import {analyze,formatMetric,TIERS} from './dist/metrics.mjs';
assert.throws(()=>analyze([],100,100));
const p=Array.from({length:478},()=>({x:.5,y:.5}));
for(const [i,x,y]of[[10,.5,.1],[152,.5,.9],[234,.2,.5],[454,.8,.5],[33,.3,.35],[133,.4,.35],[362,.6,.35],[263,.7,.35],[98,.45,.6],[327,.55,.6],[61,.4,.7],[291,.6,.7],[172,.3,.75],[397,.7,.75],[2,.5,.6],[1,.5,.5]])p[i]={x,y};
const r=analyze(p,1000,1000);assert.equal(r.landmarkCount,478);assert.ok(Math.abs(r.values.faceRatio-.75)<1e-9);assert.ok(r.features.find(m=>m.id==='asymmetry').value<1e-9);assert.equal(r.warnings.length,0);assert.ok(r.score>=0&&r.score<=8);assert.ok(TIERS.some(t=>t.name===r.tier.name));
const angle=.15,rot=p.map(({x,y})=>({x:.5+(x-.5)*Math.cos(angle)-(y-.5)*Math.sin(angle),y:.5+(x-.5)*Math.sin(angle)+(y-.5)*Math.cos(angle)}));const rr=analyze(rot,1000,1000);assert.ok(Math.abs(r.values.faceRatio-rr.values.faceRatio)<1e-9);assert.ok(Math.abs(rr.values.tiltLeft)<1e-9);assert.equal(formatMetric({value:5.123,unit:'°'}),'5.1°');
const stretched=p.map(a=>({x:a.x,y:a.y/2}));assert.ok(Math.abs(analyze(stretched,1000,2000).values.eyeSpacing-r.values.eyeSpacing)<1e-9);
console.log('Geometry checks passed: roll correction, aspect ratio, symmetry, score bounds, validation and formatting.');
