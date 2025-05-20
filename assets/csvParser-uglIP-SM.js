const c=o=>{const a=o.split(`
`).filter(s=>s.trim()!==""),t=[];return a.forEach((s,e)=>{if(e===0&&isNaN(parseFloat(s.split(",")[0])))return;const i=s.split(",");for(const l of i){const r=parseFloat(l.trim());if(!isNaN(r)){t.push(r);break}}}),t};export{c as parseCSV};
