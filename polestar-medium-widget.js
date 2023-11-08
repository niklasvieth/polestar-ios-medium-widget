// icon-color: green; icon-glyph: battery-half;

/**
 * This widget has been developed by Niklas Vieth.
 * Installation and configuration details can be found at https://github.com/niklasvieth/polestar-ios-medium-widget
 */

// Config
const TIBBER_EMAIL = "EMAIL_ADDRESS";
const TIBBER_PASSWORD = "PASSWORD";
const LAST_SEEN_RELATIVE_DATE = true; // false

const TIBBER_BASE_URL = "https://app.tibber.com";
const POLESTAR_ICON = "https://www.polestar.com/w3-assets/coast-228x228.png";

// Check that params are set
if (TIBBER_EMAIL === "EMAIL_ADDRESS") {
  throw new Error("Parameter TIBBER_EMAIL is not configured");
}
if (TIBBER_PASSWORD === "PASSWORD") {
  throw new Error("Parameter TIBBER_PASSWORD is not configured");
}

// You can run the script in the app to preview the widget or you can go to the Home Screen, add a new Scriptable widget and configure the widget to run this script.
// You can also try creating a shortcut that runs this script. Running the shortcut will show widget.
const tibberData = await fetchTibberData();
const widget = await createPolestarWidget(tibberData);

if (config.runsInWidget) {
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget);
} else {
  // The script runs inside the app, so we preview the widget.
  widget.presentMedium();
}
Script.complete();

// Create polestar widget
async function createPolestarWidget(tibberData) {
  const appIcon = await loadImage(POLESTAR_ICON);
  const title = tibberData.name;
  const widget = new ListWidget();
  widget.url = "polestar-explore://";

  // Add background gradient
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color("141414"), new Color("13233F")];
  widget.backgroundGradient = gradient;

  // Show app icon and title
  const titleStack = widget.addStack();
  const titleElement = titleStack.addText(title);
  titleElement.textColor = Color.white();
  titleElement.textOpacity = 0.7;
  titleElement.font = Font.mediumSystemFont(14);
  titleStack.addSpacer();
  const appIconElement = titleStack.addImage(appIcon);
  appIconElement.imageSize = new Size(30, 30);
  appIconElement.cornerRadius = 4;
  widget.addSpacer(12);

  // Center Stack
  const contentStack = widget.addStack();
  const carImage = await loadImage(tibberData.imgUrl);
  const carImageElement = contentStack.addImage(carImage);
  carImageElement.imageSize = new Size(150, 100);
  contentStack.addSpacer();

  // Battery Info
  const batteryInfoStack = contentStack.addStack();
  batteryInfoStack.layoutVertically();
  batteryInfoStack.addSpacer();

  // Battery Percent Value
  const batteryPercent = tibberData.battery.percent;
  const isCharging = tibberData.battery.isCharging;
  const batteryPercentStack = batteryInfoStack.addStack();
  batteryPercentStack.addSpacer();
  batteryPercentStack.centerAlignContent();
  const batterySymbol = getBatteryPercentIcon(batteryPercent, isCharging);
  const batterySymbolElement = batteryPercentStack.addImage(
    batterySymbol.image
  );
  batterySymbolElement.imageSize = new Size(40, 40);
  batterySymbolElement.tintColor = getBatteryPercentColor(batteryPercent);
  batteryPercentStack.addSpacer(8);

  const batteryPercentText = batteryPercentStack.addText(`${batteryPercent} %`);
  batteryPercentText.textColor = getBatteryPercentColor(batteryPercent);
  batteryPercentText.font = Font.boldSystemFont(24);

  // Footer
  const footerStack = batteryInfoStack.addStack();
  footerStack.addSpacer();

  // Add last seen indicator
  const lastSeenDate = new Date(tibberData.lastSeen);
  const lastSeenText = lastSeenDate.toLocaleString();
  let lastSeenElement;
  if (LAST_SEEN_RELATIVE_DATE) {
    lastSeenElement = footerStack.addDate(lastSeenDate);
    lastSeenElement.applyRelativeStyle();
  } else {
    lastSeenElement = footerStack.addText(lastSeenText);
  }
  lastSeenElement.textColor = Color.white();
  lastSeenElement.font = Font.mediumSystemFont(10);
  lastSeenElement.textOpacity = 0.5;
  lastSeenElement.minimumScaleFactor = 0.5;
  lastSeenElement.rightAlignText();

  return widget;
}

/********************
 * Tibber API helpers
 ********************/
async function fetchTibberToken() {
  const tokenUrl = `${TIBBER_BASE_URL}/login.credentials`;
  const body = {
    "@type": "login",
    email: TIBBER_EMAIL,
    password: TIBBER_PASSWORD,
  };
  const req = new Request(tokenUrl);
  req.method = "POST";
  req.body = JSON.stringify(body);
  req.headers = {
    "Content-Type": "application/json",
    charset: "utf-8",
  };
  const response = await req.loadJSON();
  return response.token;
}

async function fetchTibberData() {
  const tibberToken = await fetchTibberToken();
  const url = `${TIBBER_BASE_URL}/v4/gql`;
  const body = {
    query:
      "{me{homes{electricVehicles{lastSeen imgUrl name shortName battery{percent chargeLimit isCharging percentColor}}}}}",
  };
  const req = new Request(url);
  req.method = "POST";
  req.body = JSON.stringify(body);
  req.headers = {
    "Content-Type": "application/json",
    charset: "utf-8",
    Authorization: `Bearer ${tibberToken}`,
  };
  const response = await req.loadJSON();
  return response.data.me.homes[0].electricVehicles[0];
}

async function loadImage(url) {
  const req = new Request(url);
  return req.loadImage();
}

/*************
 * Formatters
 *************/
function getBatteryPercentColor(percent) {
  if (percent > 60) {
    return Color.green();
  } else if (percent > 30) {
    return Color.orange();
  } else {
    return Color.red();
  }
}

function getBatteryPercentIcon(percent, isCharging) {
  if (isCharging) {
    return SFSymbol.named(`battery.100percent.bolt`);
  }
  let percentRounded = 0;

  if (percent > 90) {
    percentRounded = 100;
  } else if (percent > 60) {
    percentRounded = 75;
  } else if (percent > 40) {
    percentRounded = 50;
  } else if (percent > 10) {
    percentRounded = 25;
  }
  return SFSymbol.named(`battery.${percentRounded}`);
}
