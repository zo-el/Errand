// TODO : Built for only one board for now
// -----------------------------------------------------------------
//  The Public Function
// -----------------------------------------------------------------
// TEMP : Created to make a dummy board as an anchor for the ver1
function newBoard(_a) {
    var title = _a.title, label = _a.label;
    //const uuid = uuidGenerator();
    var board = { title: title, label: label };
    commit("board", board);
}
function newLane(_a) {
    var title = _a.title, lable = _a.lable;
    var uuid = uuidGenerator();
    var lane = { uuid: uuid, title: title, lable: lable };
    var hash = commit("lane", lane);
    //TEMP :  add to pregenerated Board
    var BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });
    commit("lane_link", { Links: [{ Base: BOARD_HASH, Link: hash, Tag: "lane_tag" }] });
    return hash;
}
function getLanes(_a) {
    //TEMP :  add to pregenerated Board
    var BOARD_HASH = makeHash("board", { title: "First_Board", label: "" });
    var lanes = getLinks(BOARD_HASH, "lane_tag", { Load: true });
    // let lane_entry = lanes.map((lane) => {
    //   return lane.Entry;
    // });
    debug("All the lanes: " + JSON.stringify(lanes));
    return lanes;
}
function newCard(_a) {
    var title = _a.title, description = _a.description, lane_hash = _a.lane_hash;
    debug(lane_hash);
    var uuid = uuidGenerator();
    var card = { title: title, description: description, uuid: uuid };
    var hash = commit("card", card);
    commit("card_link", { Links: [{ Base: lane_hash, Link: hash, Tag: "lane_tag" }] });
    return hash;
}
//------------------------------
// Helper Functions
//------------------------------
//Generates new UUID ()
function uuidGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// -----------------------------------------------------------------
//  The Genesis Function
// -----------------------------------------------------------------
function genesis() {
    newBoard({ title: "First_Board", label: "" });
    return true;
}
// -----------------------------------------------------------------
//  Validation functions for every change to the local chain or DHT
// -----------------------------------------------------------------
function validateCommit(entryName, entry, header, pkg, sources) {
    // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
    return validate(entryName, entry, header, pkg, sources);
}
function validate(entryName, entry, header, pkg, sources) {
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
function validateLink(entryName, baseHash, links, pkg, sources) {
    //debug("entryName: "+entryName+" baseHash: "+ baseHash+" links: "+ links+" sources: "+ sources);
    switch (entryName) {
        case "lane_link":
            return true;
        default:
            return false;
    }
}
function validatePut(entryName, entry, header, pkg, sources) {
    return true;
}
function validateMod(entryName, entry, header, replaces, pkg, sources) {
    // debug("entry_type:" + entryName + "entry" + JSON.stringify(entry) + "header" + JSON.stringify(header) + "replaces: " + replaces + "PKG: " + JSON.stringify(pkg) + "sources" + sources);
    switch (entryName) {
        case "":
            return false;
        default:
            return false;
    }
}
function validateDel(entryName, hash, pkg, sources) { return false; }
function validatePutPkg(entryName) { return null; }
function validateModPkg(entryName) { return null; }
function validateDelPkg(entryName) { return null; }
function validateLinkPkg(entryName) { return null; }
