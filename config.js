const presentedImgs = [
  "https://api.atlassian.com/ex/jira/206e0fe0-f329-4749-b219-995cfc598d83/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium",
  "https://myron228.atlassian.net/images/icons/priorities/medium.svg",
];

const getImg4Keys = {
  [presentedImgs[0]]: "10315.svg",
  [presentedImgs[1]]: "medium.svg",
};

module.exports = {
  presentedImgs,
  getImg4Keys,
};
