export const manifest = {
  screens: {
    scr_ijn4jm: { name: "Accueil", route: "/", position: { "x": 160, "y": 220 } },
    scr_f8x5k9: { name: "À propos", route: "/a-propos", position: { "x": 1560, "y": 220 } },
    scr_9y8moa: { name: "Les 10 ans de Mahola", route: "/mahola", position: { "x": 2960, "y": 220 } },
    scr_j9f7lw: { name: "Programme — complet", route: "/programme", position: { "x": 160, "y": 2200 } },
    scr_v1576t: { name: "Programme — Jour 1", route: "/programme", state: { "day": "Jour 1" }, position: { "x": 1560, "y": 2200 } },
    scr_csy386: { name: "Programme — Jour 2", route: "/programme", state: { "day": "Jour 2" }, position: { "x": 2960, "y": 2200 } },
    scr_4f5pmw: { name: "Programme — Jour 3", route: "/programme", state: { "day": "Jour 3" }, position: { "x": 4360, "y": 2200 } },
    scr_9vujj2: { name: "Programme — Ateliers", route: "/programme", state: { "type": "Atelier" }, position: { "x": 5760, "y": 2200 } },
    scr_yjn7na: { name: "Speakers", route: "/speakers", position: { "x": 160, "y": 4180 } },
    scr_bs360d: { name: "Speakers — Santé numérique", route: "/speakers", state: { "domain": "Santé numérique" }, position: { "x": 1560, "y": 4180 } },
    scr_k0p152: { name: "Speakers — Aucun résultat", route: "/speakers", state: { "query": "chirurgie robotique" }, position: { "x": 2960, "y": 4180 } }
  },
  sections: {
    sec_emv3rx: { name: "Main navigation", x: 0, y: 0, width: 4320, height: 1180 },
    sec_ayfp50: { name: "Programme flow", x: 0, y: 1980, width: 7120, height: 1180 },
    sec_hkdvdf: { name: "Speakers flow", x: 0, y: 3960, width: 4320, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_emv3rx", children: [
    { kind: "screen", id: "scr_ijn4jm" },
    { kind: "screen", id: "scr_f8x5k9" },
    { kind: "screen", id: "scr_9y8moa" }]
  },
  { kind: "section", id: "sec_ayfp50", children: [
    { kind: "screen", id: "scr_j9f7lw" },
    { kind: "screen", id: "scr_v1576t" },
    { kind: "screen", id: "scr_csy386" },
    { kind: "screen", id: "scr_4f5pmw" },
    { kind: "screen", id: "scr_9vujj2" }]
  },
  { kind: "section", id: "sec_hkdvdf", children: [
    { kind: "screen", id: "scr_yjn7na" },
    { kind: "screen", id: "scr_bs360d" },
    { kind: "screen", id: "scr_k0p152" }]
  }]

};