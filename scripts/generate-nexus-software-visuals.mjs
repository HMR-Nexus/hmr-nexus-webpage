import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/assets/software');
fs.mkdirSync(outDir, { recursive: true });

const C = {
  ink: '#0A0B0D',
  panel: '#111316',
  panel2: '#17191D',
  rule: 'rgba(245,243,238,0.14)',
  paper: '#F5F3EE',
  muted: 'rgba(245,243,238,0.56)',
  dim: 'rgba(245,243,238,0.26)',
  laser: '#FF4D2E',
  amber: '#FFB800',
  green: '#46D37A',
};

function base(title, kicker, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="800" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0A0B0D"/>
      <stop offset="0.55" stop-color="#111316"/>
      <stop offset="1" stop-color="#07080A"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" stroke="rgba(245,243,238,0.045)" stroke-width="1"/>
    </pattern>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000" flood-opacity="0.32"/>
    </filter>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <rect width="1200" height="800" fill="url(#grid)" opacity="0.9"/>
  <rect x="36" y="34" width="1128" height="732" stroke="rgba(245,243,238,0.12)"/>
  <text x="72" y="88" fill="${C.laser}" font-family="JetBrains Mono, monospace" font-size="18" letter-spacing="3">NEXUS SOFTWARE</text>
  <text x="72" y="137" fill="${C.paper}" font-family="Space Grotesk, Arial, sans-serif" font-size="56" font-weight="500" letter-spacing="-2.2">${title}</text>
  <text x="75" y="174" fill="${C.muted}" font-family="Inter, Arial, sans-serif" font-size="20">${kicker}</text>
  ${body}
  <text x="72" y="724" fill="rgba(245,243,238,0.32)" font-family="JetBrains Mono, monospace" font-size="14" letter-spacing="1.6">DESIGNED SYSTEM VISUAL · REAL PRODUCT SCOPE · NO STOCK CLAIMS</text>
</svg>`;
}

const line = (x1,y1,x2,y2,color=C.rule,w=1,dash='') => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`;
const rect = (x,y,w,h,fill=C.panel,stroke=C.rule) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}"/>`;
const text = (x,y,t,size=16,fill=C.paper,fam='JetBrains Mono, monospace',weight='400') => `<text x="${x}" y="${y}" fill="${fill}" font-family="${fam}" font-size="${size}" font-weight="${weight}">${t}</text>`;
const chip = (x,y,t,color=C.laser) => `${rect(x,y,118,34,'rgba(245,243,238,0.035)','rgba(245,243,238,0.16)')}<circle cx="${x+18}" cy="${y+17}" r="4" fill="${color}"/>${text(x+32,y+22,t,12,C.muted)}`;

const lumen = base('LUMEN', 'Fiber operations control layer: orders, crews, materials and certifications.', `
  <g filter="url(#soft)">
    ${rect(70,230,655,405,'rgba(17,19,22,0.92)')}
    ${rect(92,254,274,68,'rgba(245,243,238,0.035)')}
    ${text(116,282,'ACTIVE WORK ORDERS',13,C.dim)}${text(116,308,'NE4 · splice · QA',22,C.paper,'Space Grotesk, Arial, sans-serif','500')}
    ${rect(388,254,315,68,'rgba(245,243,238,0.026)')}
    ${text(414,282,'CERTIFICATION CHECK',13,C.dim)}${text(414,308,'crew / device / protocol',22,C.paper,'Space Grotesk, Arial, sans-serif','500')}
    ${line(122,385,280,330,C.laser,4)}${line(280,330,426,430,C.laser,4)}${line(426,430,636,356,C.laser,4)}
    <circle cx="122" cy="385" r="13" fill="${C.laser}"/><circle cx="280" cy="330" r="9" fill="${C.paper}"/><circle cx="426" cy="430" r="9" fill="${C.paper}"/><circle cx="636" cy="356" r="13" fill="${C.laser}"/>
    ${text(104,424,'DP',14,C.paper)}${text(256,310,'TEAM',12,C.muted)}${text(395,466,'QA',12,C.muted)}${text(610,336,'HÜP',14,C.paper)}
    ${rect(92,510,194,72,'rgba(245,243,238,0.026)')}${text(114,538,'MATERIAL',12,C.dim)}${text(114,565,'cable · ONT · photos',18,C.paper,'Space Grotesk, Arial, sans-serif','500')}
    ${rect(306,510,188,72,'rgba(245,243,238,0.026)')}${text(328,538,'CREW',12,C.dim)}${text(328,565,'assigned / certified',18,C.paper,'Space Grotesk, Arial, sans-serif','500')}
    ${rect(514,510,189,72,'rgba(245,243,238,0.026)')}${text(536,538,'HANDOVER',12,C.dim)}${text(536,565,'photos + protocol',18,C.paper,'Space Grotesk, Arial, sans-serif','500')}
  </g>
  <g filter="url(#soft)">
    ${rect(782,230,330,405,'rgba(17,19,22,0.86)')}
    ${text(812,272,'FIELD VIEW',13,C.laser)}
    ${chip(812,298,'NE3',C.laser)} ${chip(950,298,'NE4',C.green)}
    ${line(832,398,1050,398,C.rule,1)}${line(832,454,1050,454,C.rule,1)}${line(832,510,1050,510,C.rule,1)}
    ${text(832,384,'order #142',15,C.paper)}${text(980,384,'ready',13,C.green)}
    ${text(832,440,'photos',15,C.paper)}${text(982,440,'12/12',13,C.muted)}
    ${text(832,496,'materials',15,C.paper)}${text(970,496,'reserved',13,C.amber)}
    ${text(832,552,'handover',15,C.paper)}${text(954,552,'pending',13,C.dim)}
  </g>
`);

const work = base('Work Manager', 'Lightweight PWA for field teams, daily work and offline-first execution.', `
  <g filter="url(#soft)">
    ${rect(102,230,300,430,'rgba(17,19,22,0.93)')}
    ${text(132,272,'TODAY',13,C.laser)}${text(132,312,'Field route',38,C.paper,'Space Grotesk, Arial, sans-serif','500')}
    ${rect(132,348,220,58,'rgba(245,243,238,0.035)')}${text(154,383,'08:30 · Calle 14',16,C.paper)}
    ${rect(132,424,220,58,'rgba(245,243,238,0.026)')}${text(154,459,'10:15 · DP check',16,C.muted)}
    ${rect(132,500,220,58,'rgba(245,243,238,0.026)')}${text(154,535,'14:00 · photos QA',16,C.muted)}
    ${rect(132,592,102,34,'rgba(255,77,46,0.14)','rgba(255,77,46,0.55)')}${text(154,615,'SYNC',13,C.laser)}
    ${rect(250,592,102,34,'rgba(245,243,238,0.026)')}${text(272,615,'OFFLINE',13,C.dim)}
  </g>
  <g filter="url(#soft)">
    ${rect(452,230,645,430,'rgba(17,19,22,0.88)')}
    ${text(492,278,'OPERATIONS BOARD',13,C.laser)}
    ${line(492,326,1050,326,C.rule,1)}${line(492,398,1050,398,C.rule,1)}${line(492,470,1050,470,C.rule,1)}${line(492,542,1050,542,C.rule,1)}
    ${text(492,364,'crew',13,C.dim)}${text(602,364,'task',13,C.dim)}${text(850,364,'status',13,C.dim)}
    ${text(492,434,'A02',20,C.paper)}${text(602,434,'NE4 home install',20,C.paper,'Space Grotesk, Arial, sans-serif','500')}${text(850,434,'in progress',16,C.green)}
    ${text(492,506,'B07',20,C.paper)}${text(602,506,'material pickup',20,C.paper,'Space Grotesk, Arial, sans-serif','500')}${text(850,506,'queued',16,C.amber)}
    ${text(492,578,'Q01',20,C.paper)}${text(602,578,'photo review',20,C.paper,'Space Grotesk, Arial, sans-serif','500')}${text(850,578,'done',16,C.muted)}
  </g>
`);

const fin = base('FinControl', 'Cashflow, costs and project control for small operational companies.', `
  <g filter="url(#soft)">
    ${rect(76,230,506,405,'rgba(17,19,22,0.92)')}
    ${text(112,278,'CASHFLOW',13,C.laser)}${text(112,330,'€',58,C.paper,'Space Grotesk, Arial, sans-serif','500')}${text(166,330,'month view',36,C.paper,'Space Grotesk, Arial, sans-serif','500')}
    ${line(118,552,520,552,C.rule,1)}${line(118,500,520,500,C.rule,1)}${line(118,448,520,448,C.rule,1)}${line(118,396,520,396,C.rule,1)}
    <path d="M120 530 C180 490 214 512 260 462 C322 396 380 430 436 362 C468 326 492 314 520 288" fill="none" stroke="${C.laser}" stroke-width="5"/>
    <path d="M120 572 C190 554 240 584 304 548 C374 510 436 540 520 492" fill="none" stroke="${C.green}" stroke-width="3" stroke-dasharray="12 10" opacity="0.8"/>
    ${text(122,596,'income',13,C.green)}${text(222,596,'costs',13,C.laser)}${text(320,596,'forecast',13,C.muted)}
  </g>
  <g filter="url(#soft)">
    ${rect(634,230,488,405,'rgba(17,19,22,0.88)')}
    ${text(674,278,'PROJECT CONTROL',13,C.laser)}
    ${rect(674,320,132,210,'rgba(255,77,46,0.16)','rgba(255,77,46,0.45)')}${rect(834,378,132,152,'rgba(245,243,238,0.06)','rgba(245,243,238,0.18)')}${rect(994,350,72,180,'rgba(70,211,122,0.14)','rgba(70,211,122,0.42)')}
    ${text(674,568,'planned',14,C.dim)}${text(834,568,'actual',14,C.dim)}${text(994,568,'margin',14,C.dim)}
    ${text(676,614,'Invoices · costs · payroll · liquidity',21,C.paper,'Space Grotesk, Arial, sans-serif','500')}
  </g>
`);

const bot = base('Kundenbot', 'Customer assistant for appointment intake, handover questions and internal triage.', `
  <g filter="url(#soft)">
    ${rect(92,230,480,405,'rgba(17,19,22,0.92)')}
    ${text(128,278,'CONVERSATION FLOW',13,C.laser)}
    ${rect(128,320,302,54,'rgba(245,243,238,0.045)')}${text(154,354,'Kunde: Termin verschieben?',16,C.paper)}
    ${rect(198,400,306,64,'rgba(255,77,46,0.13)','rgba(255,77,46,0.45)')}${text(224,432,'Bot: Ich prüfe freie Slots.',16,C.paper)}${text(224,452,'Technikteam bleibt informiert.',12,C.muted)}
    ${rect(128,502,326,54,'rgba(245,243,238,0.035)')}${text(154,536,'Operator: übernehmen / schließen',16,C.paper)}
  </g>
  <g filter="url(#soft)">
    ${rect(626,230,482,405,'rgba(17,19,22,0.88)')}
    ${text(666,278,'TRIAGE PANEL',13,C.laser)}
    ${line(666,330,1064,330,C.rule,1)}${line(666,396,1064,396,C.rule,1)}${line(666,462,1064,462,C.rule,1)}${line(666,528,1064,528,C.rule,1)}
    ${text(666,374,'appointment',18,C.paper,'Space Grotesk, Arial, sans-serif','500')}${text(950,374,'human',14,C.amber)}
    ${text(666,440,'handover docs',18,C.paper,'Space Grotesk, Arial, sans-serif','500')}${text(950,440,'auto',14,C.green)}
    ${text(666,506,'technical issue',18,C.paper,'Space Grotesk, Arial, sans-serif','500')}${text(950,506,'escalate',14,C.laser)}
    ${rect(666,568,158,34,'rgba(255,77,46,0.14)','rgba(255,77,46,0.55)')}${text(690,591,'TELEGRAM API',13,C.laser)}
  </g>
`);

const files = {
  'lumen-ops.svg': lumen,
  'work-manager.svg': work,
  'fincontrol.svg': fin,
  'kundenbot.svg': bot,
};
for (const [name, svg] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, name), svg);
  console.log(path.join(outDir, name));
}
