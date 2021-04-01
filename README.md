# Socket Mode

> March 2021)

## Description

This tester app uses the websocket client to handle the connection to the websocket with Slack.

Further information about socket mode can be found [Intro to Socket Mode](https://api.slack.com/apis/connections/socket)

## Requirements

- Node
- NPM
- Nodemon
- NGROK [resources]()

---

## Install

1. Clone repository and run `npm install`
2. Create a Slack app and configure as per below

## Slack app configuration

1. In the Slack App configuration, head to the **Socket Mode** tab and toggle **Enable Socket Mode**
2. Give the app-level token a name and click **Generate**
3. Note the _token_ that is generated (you can find this later under the **Basic Information** tab > **App-Level Tokens**)
4. Click on the **Event Subscriptions** and toggle **Enable Events**
5. Underneath click **Subscribe to bot events** and click **Add Bot User Event** choosing the `app_mention` event
6. In the project create a `.env` and add a `SOCKETMODE` variable: `SOCKETMODE=xapp-...`
7. Start the app by running `npm run start`
8. In Slack invite the bot to a channel(enter `/invite @[your-appname]`)
9. Mention the bot `@[your-appname]` - you should see the event come through on the socket.

#### Scopes

- https://api.slack.com/scopes/connections:write (automatically added when setting up Socket Mode)
- https://api.slack.com/scopes/app_mentions:read

---
