// TODO : Built for only one board for now

// -----------------------------------------------------------------
//  The Public Function
// -----------------------------------------------------------------
// TEMP : Created to make a dummy board as an anchor for the ver1
function newBoard({ title, label }) {
  //const uuid = uuidGenerator();
  const board = { title, label };
  commit("board", board);
}

function newLane({ title, lable }): Hash {
  const uuid: string = uuidGenerator();
  const lane = { uuid, title, lable }
  const hash: string = commit("lane", lane);

  //TEMP :  add to pregenerated Board
  const BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });

  commit("lane_link", { Links: [{ Base: BOARD_HASH, Link: hash, Tag: "lane_tag" }] });
  return hash;
}

function getLanes(): GetLinksResponse[] {
  //TEMP :  add to pregenerated Board
  const BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });

  const lanes = getLinks(BOARD_HASH, "lane_tag", { Load: true });
  // let lane_entry = lanes.map((lane) => {
  //   return lane.Entry;
  // });

  debug(`All the lanes: ` + JSON.stringify(lanes));
  return lanes;
}
function getLaneHash(lane_id: string):Hash {
  const lanes:GetLinksResponse[]=getLanes();
  let filtered = lanes.filter((lane)=>{
    return lane.Entry.id==lane_id;
  });
  return filtered[0].Hash;
}

function newCard({ uuid, title, description, lane_id }) {
  const lane_hash = getLaneHash(lane_id);
  // const uuid = uuidGenerator();
  const card = { title, description, uuid };
  const hash = commit("card", card);
  commit("card_link", { Links: [{ Base: lane_hash, Link: hash, Tag: "lane_tag" }] });
  return hash;
}

//------------------------------
// Helper Functions
//------------------------------

//Generates new UUID ()
function uuidGenerator() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// -----------------------------------------------------------------
//  The Genesis Function
// -----------------------------------------------------------------

function genesis() {
  newBoard({ title: "First_Board", label: "" })
  return true;
}

// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------

function validateCommit(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  return validate(entryName, entry, header, pkg, sources);
}

function validate(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  switch (entryName) {
    case "board":
      return true;
    case "lane":
      return true;
    case "lane_link":
      return true;
    case "card":
      return true;
    case "card_link":
      return true;
    default:
      return false;
  }
}

function validateLink(entryName: any, baseHash: any, links: any, pkg: any, sources: any): boolean {
  //debug("entryName: "+entryName+" baseHash: "+ baseHash+" links: "+ links+" sources: "+ sources);
  switch (entryName) {
    case "lane_link":
      return true;
    default:
      return false;
  }
}

function validatePut(entryName: any, entry: any, header: any, pkg: any, sources: any): boolean {
  return true;
}

function validateMod(entryName: any, entry: any, header: any, replaces: any, pkg: any, sources: any): boolean {
  // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "replaces: " + replaces + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
  switch (entryName) {
    case "":
      return false;
    default:
      return false;
  }
}

function validateDel(entryName: any, hash: any, pkg: any, sources: any): boolean { return false; }

function validatePutPkg(entryName) { return null; }

function validateModPkg(entryName) { return null; }

function validateDelPkg(entryName) { return null; }

function validateLinkPkg(entryName) { return null; }
