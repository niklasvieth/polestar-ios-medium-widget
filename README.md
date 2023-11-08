# Polestar SoC iOS Medium Widget

An iOS medium widget to display the current state of charge (SoC) of your Polestar 2.

<img src="./images/polestar_medium_widget_relative.jpeg" width="300" alt="Polestar Medium Widget Relative Date"/>

<img src="./images/polestar_medium_widget.jpeg" width="300" alt="Polestar Medium Widget"/>

<img src="./images/polestar_medium_widget_relative_low.jpeg" width="300" alt="Polestar Medium Widget Relative Date Low"/>

## Background

Since the official Polestar App does not support any kind of widgets for iOS, I developed my own with the help of [Scriptable](https://scriptable.app/). Without an official public Polestar API being released yet, the widget relies on the [Tibber GraphQL API](https://developer.tibber.com/docs/overview) as proxy to get the current state of charge of the battery. Thus, you will also need Tibber Account to get access to the SoC data.

## Prerequisites

1. Free Tibber Account with configured Polestar Power-Up
    > :warning: You **don't** need an electricity contract, you can just proceed with the free account.
    - Install [Tibber App](https://apps.apple.com/de/app/tibber-%C3%B6kostrom/id1127805969) on your iPhone and follow the registration instructions. Make sure to remember the email & password used to create the Tibber account.
    - [Configure Polestar Power-Up](https://support.tibber.com/en/articles/6675026-smart-charge-your-polestar-with-tibber#:~:text=How%20do%20I%20connect%20my%20Polestar%20to%20Tibber%3F)
2. Install [Scriptable](https://apps.apple.com/de/app/scriptable/id1405459188) on your iPhone
3. [Optional but recommended] Follow the [ScriptDude installation steps](https://scriptdu.de/#installation)

## Installation

1. Make sure you have followed all mandatory steps described in [Prerequisites](./README.md#Prerequisites).

2. There are two options to install the widget:
    - [Recommended] Click on the following button to install via `ScriptDude` (make sure that you have followed step 3 of [Prerequisites](./README.md#Prerequisites)). ScriptDude will automatically receive updates of new versions of this widget
        [![Download with ScriptDude](https://scriptdu.de/download.svg)](https://scriptdu.de/?name=Polestar+Medium+SoC+Widget&source=https%3A%2F%2Fgist.githubusercontent.com%2Fniklasvieth%2F159c13dd7ef94bd608358ce964b66c7c%2Fraw%2Fe05830e0f1b572089b99e73344ac192e8d7f808d%2Fpolestar-medium-widget.js&docs=https%3A%2F%2Fgithub.com%2Fniklasvieth%2Fpolestar-ios-medium-widget%2Fblob%2Fmain%2FREADME.md#generator)

    - Copy the content of [polestar-medium-widget.js](https://gist.github.com/niklasvieth/159c13dd7ef94bd608358ce964b66c7c), create a new script in `Scriptable`, paste the content and rename it to `Polestar Medium SoC Widget`.

3. Replace the placeholder values for `TIBBER_EMAIL` and `TIBBER_PASSWORD` with your Tibber login credentials.

    ```js
    // Config
    const TIBBER_EMAIL = "<EMAIL_ADDRESS>";
    const TIBBER_PASSWORD = "<PASSWORD>";
    ```

4. [Optional] You can decide if you prefer the relative live counter or the absolute timestamp for the last seen date in the widget footer. Default is the relative format. Change the value to `false` if you prefer the absolute date.

    ```js
    const LAST_SEEN_RELATIVE_DATE = true; // false
    ```

5. Add the medium `Scriptable` widget to your homescreen. See [Apple How-To guide](https://support.apple.com/en-us/HT207122#:~:text=How%20to%20add%20widgets%20to%20your%20Home%20Screen).

    <img src="./images/scriptable_medium_widget.jpeg" width="200" alt="Scriptable Medium Widget"/>

6. Tab on the widget to configure the widget. Select `Polestar Medium SoC Widget` as script, leave everything else blank.

7. You should now be able to see the :battery: SoC of your Polestar on you homescreen. By clicking on the widget you will be navigated to the Polestar App.

## Additional comments

There might be a minor lag or difference of the SoC compared to value displayed in the Polestar App because of the following reasons:

- The widget is relying on the Tibber API which syncs regularly with the actual Polestar API.
- The refresh interval of the widget is determined by iOS itself.

### Appreciation

- Thanks @simonbs for the awesome [Scriptable](https://scriptable.app/) app.

### Support me

<a href="https://www.paypal.me/niklasvieth" >
  <img src="https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png" alt="Donate with PayPal" width="200px" />
</a>
