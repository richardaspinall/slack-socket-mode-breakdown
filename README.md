# Socket Mode

> March 2021

## Description

This tester app showcases a [Socket Mode](https://api.slack.com/apis/connections/socket) connection with Slack via the [WebSocket](https://www.npmjs.com/package/websocket) client.

Specifically the app will listen to app mentions in a channel that the associated bot is part of and log the event.

## Requirements

- Node
- NPM
- Nodemon
- NGROK

---

## Installation

1. Clone repository and run `npm install`
2. Create a Slack app from [here](https://api.slack.com/apps) and configure as per below

## Slack app configuration

1. In the Slack App configuration, head to the **Socket Mode** tab and toggle **Enable Socket Mode**
2. Give the app-level token a name of **SOCKETMODE** (or anything you like) and click **Generate**
3. Note the _token_ that is generated (you can find this later under the **Basic Information** tab > **App-Level Tokens**)
4. Click on the **Event Subscriptions** tab and toggle **Enable Events**
5. Underneath click **Subscribe to bot events** and click **Add Bot User Event** choosing the `app_mention` event
6. Click on the **Install App** tab and click through the **Install to Workspace** options
7. In the project code, create a `.env` file and add a `SOCKETMODE` variable: `SOCKETMODE=xapp-...`
8. Start the app by running `npm run start`
9. In Slack invite the bot to a channel(enter `/invite @[your-appname]`)
10. Mention the bot `@[your-appname]` - you should see the event come through on the socket displayed in your terminal.

### Scope requirements

- https://api.slack.com/scopes/connections:write (automatically added when setting up Socket Mode)
- https://api.slack.com/scopes/app_mentions:read

---
