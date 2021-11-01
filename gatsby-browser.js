require("prismjs/themes/prism-solarizedlight.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

// https://stackoverflow.com/questions/58225352/need-to-refresh-previously-vistied-gatsby-site-to-view-changes
// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload();