[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelEndpoint

# Class: ChannelEndpoint

ChannelEndpoint

Gives access to a Channel API (without needing to connect to socket)

## Hierarchy

- [`Channel`](Channel.md)

  ↳ **`ChannelEndpoint`**

## Table of contents

### Constructors

- [constructor](ChannelEndpoint.md#constructor)

### Properties

- [admin](ChannelEndpoint.md#admin)
- [adminData](ChannelEndpoint.md#admindata)
- [channelReady](ChannelEndpoint.md#channelready)
- [locked](ChannelEndpoint.md#locked)
- [motd](ChannelEndpoint.md#motd)
- [owner](ChannelEndpoint.md#owner)
- [ready](ChannelEndpoint.md#ready)
- [sb384Ready](ChannelEndpoint.md#sb384ready)
- [userName](ChannelEndpoint.md#username)
- [verifiedGuest](ChannelEndpoint.md#verifiedguest)

### Accessors

- [\_id](ChannelEndpoint.md#_id)
- [api](ChannelEndpoint.md#api)
- [channelId](ChannelEndpoint.md#channelid)
- [channelSignKey](ChannelEndpoint.md#channelsignkey)
- [exportable\_privateKey](ChannelEndpoint.md#exportable_privatekey)
- [exportable\_pubKey](ChannelEndpoint.md#exportable_pubkey)
- [keys](ChannelEndpoint.md#keys)
- [onMessage](ChannelEndpoint.md#onmessage)
- [ownerChannelId](ChannelEndpoint.md#ownerchannelid)
- [privateKey](ChannelEndpoint.md#privatekey)
- [readyFlag](ChannelEndpoint.md#readyflag)
- [sbServer](ChannelEndpoint.md#sbserver)

### Methods

- [send](ChannelEndpoint.md#send)

## Constructors

### constructor

• **new ChannelEndpoint**(`sbServer`, `key?`, `channelId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `key?` | `JsonWebKey` |
| `channelId?` | `string` |

#### Overrides

[Channel](Channel.md).[constructor](Channel.md#constructor)

## Properties

### admin

• **admin**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[admin](Channel.md#admin)

___

### adminData

• `Optional` **adminData**: `Dictionary`<`any`\>

#### Overrides

[Channel](Channel.md).[adminData](Channel.md#admindata)

___

### channelReady

• **channelReady**: `Promise`<[`Channel`](Channel.md)\>

**`Param`**

server to join

**`Param`**

key to use to join (optional)

**`Param`**

the <a href="../glossary.html#term-channel-name">Channel Name</a> to find on that server (optional)

#### Inherited from

[Channel](Channel.md).[channelReady](Channel.md#channelready)

___

### locked

• `Optional` **locked**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[locked](Channel.md#locked)

___

### motd

• `Optional` **motd**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[motd](Channel.md#motd)

___

### owner

• **owner**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[owner](Channel.md#owner)

___

### ready

• **ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[Channel](Channel.md).[ready](Channel.md#ready)

___

### sb384Ready

• **sb384Ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[Channel](Channel.md).[sb384Ready](Channel.md#sb384ready)

___

### userName

• **userName**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[userName](Channel.md#username)

___

### verifiedGuest

• **verifiedGuest**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[verifiedGuest](Channel.md#verifiedguest)

## Accessors

### \_id

• `get` **_id**(): `string`

#### Returns

`string`

#### Inherited from

Channel.\_id

___

### api

• `get` **api**(): [`ChannelApi`](ChannelApi.md)

#### Returns

[`ChannelApi`](ChannelApi.md)

#### Inherited from

Channel.api

___

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

Channel.channelId

___

### channelSignKey

• `get` **channelSignKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

Channel.channelSignKey

___

### exportable\_privateKey

• `get` **exportable_privateKey**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

Channel.exportable\_privateKey

___

### exportable\_pubKey

• `get` **exportable_pubKey**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

Channel.exportable\_pubKey

___

### keys

• `get` **keys**(): [`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Returns

[`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Inherited from

Channel.keys

___

### onMessage

• `set` **onMessage**(`_f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_f` | `CallableFunction` |

#### Returns

`void`

___

### ownerChannelId

• `get` **ownerChannelId**(): `string`

#### Returns

`string`

#### Inherited from

Channel.ownerChannelId

___

### privateKey

• `get` **privateKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

Channel.privateKey

___

### readyFlag

• `get` **readyFlag**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Channel.readyFlag

___

### sbServer

• `get` **sbServer**(): [`SBServer`](../interfaces/SBServer.md)

#### Returns

[`SBServer`](../interfaces/SBServer.md)

#### Inherited from

Channel.sbServer

## Methods

### send

▸ **send**(`_m`, `_messageType?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_m` | `string` \| [`SBMessage`](SBMessage.md) |
| `_messageType?` | ``"string"`` \| ``"SBMessage"`` |

#### Returns

`Promise`<`string`\>

#### Overrides

[Channel](Channel.md).[send](Channel.md#send)
