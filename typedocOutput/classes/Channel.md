[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / Channel

# Class: Channel

Channel Class

Join a channel, returns channel object.

Currently, you must have an identity when connecting, because every single
message is signed by sender. TODO is to look at how to provide a 'listening'
mode on channels.

Most classes in SB follow the "ready" template: objects can be used
right away, but they decide for themselves if they're ready or not.

## Hierarchy

- [`SB384`](SB384.md)

  ↳ **`Channel`**

  ↳↳ [`ChannelEndpoint`](ChannelEndpoint.md)

  ↳↳ [`ChannelSocket`](ChannelSocket.md)

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Properties

- [admin](Channel.md#admin)
- [adminData](Channel.md#admindata)
- [channelReady](Channel.md#channelready)
- [locked](Channel.md#locked)
- [motd](Channel.md#motd)
- [owner](Channel.md#owner)
- [ready](Channel.md#ready)
- [sb384Ready](Channel.md#sb384ready)
- [userName](Channel.md#username)
- [verifiedGuest](Channel.md#verifiedguest)

### Accessors

- [\_id](Channel.md#_id)
- [api](Channel.md#api)
- [channelId](Channel.md#channelid)
- [channelSignKey](Channel.md#channelsignkey)
- [exportable\_privateKey](Channel.md#exportable_privatekey)
- [exportable\_pubKey](Channel.md#exportable_pubkey)
- [keys](Channel.md#keys)
- [ownerChannelId](Channel.md#ownerchannelid)
- [privateKey](Channel.md#privatekey)
- [readyFlag](Channel.md#readyflag)
- [sbServer](Channel.md#sbserver)

### Methods

- [send](Channel.md#send)

## Constructors

### constructor

• **new Channel**(`sbServer`, `key?`, `channelId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `key?` | `JsonWebKey` |
| `channelId?` | `string` |

#### Overrides

[SB384](SB384.md).[constructor](SB384.md#constructor)

## Properties

### admin

• **admin**: `boolean` = `false`

___

### adminData

• `Optional` `Abstract` **adminData**: `Dictionary`<`any`\>

___

### channelReady

• **channelReady**: `Promise`<[`Channel`](Channel.md)\>

**`Param`**

server to join

**`Param`**

key to use to join (optional)

**`Param`**

the <a href="../glossary.html#term-channel-name">Channel Name</a> to find on that server (optional)

___

### locked

• `Optional` **locked**: `boolean` = `false`

___

### motd

• `Optional` **motd**: `string` = `''`

___

### owner

• **owner**: `boolean` = `false`

___

### ready

• **ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[SB384](SB384.md).[ready](SB384.md#ready)

___

### sb384Ready

• **sb384Ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[SB384](SB384.md).[sb384Ready](SB384.md#sb384ready)

___

### userName

• **userName**: `string` = `''`

___

### verifiedGuest

• **verifiedGuest**: `boolean` = `false`

## Accessors

### \_id

• `get` **_id**(): `string`

#### Returns

`string`

#### Inherited from

SB384.\_id

___

### api

• `get` **api**(): [`ChannelApi`](ChannelApi.md)

#### Returns

[`ChannelApi`](ChannelApi.md)

___

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### channelSignKey

• `get` **channelSignKey**(): `CryptoKey`

#### Returns

`CryptoKey`

___

### exportable\_privateKey

• `get` **exportable_privateKey**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SB384.exportable\_privateKey

___

### exportable\_pubKey

• `get` **exportable_pubKey**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SB384.exportable\_pubKey

___

### keys

• `get` **keys**(): [`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Returns

[`ChannelKeys`](../interfaces/ChannelKeys.md)

___

### ownerChannelId

• `get` **ownerChannelId**(): `string`

#### Returns

`string`

#### Inherited from

SB384.ownerChannelId

___

### privateKey

• `get` **privateKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SB384.privateKey

___

### readyFlag

• `get` **readyFlag**(): `boolean`

#### Returns

`boolean`

#### Overrides

SB384.readyFlag

___

### sbServer

• `get` **sbServer**(): [`SBServer`](../interfaces/SBServer.md)

#### Returns

[`SBServer`](../interfaces/SBServer.md)

## Methods

### send

▸ `Abstract` **send**(`m`, `messageType?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `string` \| [`SBMessage`](SBMessage.md) |
| `messageType?` | ``"string"`` \| ``"SBMessage"`` |

#### Returns

`Promise`<`string`\>
