[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelSocket

# Class: ChannelSocket

ChannelSocket

 Class managing connections

## Hierarchy

- [`Channel`](Channel.md)

  ↳ **`ChannelSocket`**

## Table of contents

### Constructors

- [constructor](ChannelSocket.md#constructor)

### Properties

- [admin](ChannelSocket.md#admin)
- [adminData](ChannelSocket.md#admindata)
- [channelReady](ChannelSocket.md#channelready)
- [locked](ChannelSocket.md#locked)
- [motd](ChannelSocket.md#motd)
- [owner](ChannelSocket.md#owner)
- [ready](ChannelSocket.md#ready)
- [sb384Ready](ChannelSocket.md#sb384ready)
- [userName](ChannelSocket.md#username)
- [verifiedGuest](ChannelSocket.md#verifiedguest)

### Accessors

- [\_id](ChannelSocket.md#_id)
- [api](ChannelSocket.md#api)
- [channelId](ChannelSocket.md#channelid)
- [channelSignKey](ChannelSocket.md#channelsignkey)
- [enableTrace](ChannelSocket.md#enabletrace)
- [exportable\_owner\_pubKey](ChannelSocket.md#exportable_owner_pubkey)
- [exportable\_privateKey](ChannelSocket.md#exportable_privatekey)
- [exportable\_pubKey](ChannelSocket.md#exportable_pubkey)
- [keys](ChannelSocket.md#keys)
- [onMessage](ChannelSocket.md#onmessage)
- [ownerChannelId](ChannelSocket.md#ownerchannelid)
- [privateKey](ChannelSocket.md#privatekey)
- [readyFlag](ChannelSocket.md#readyflag)
- [sbServer](ChannelSocket.md#sbserver)
- [status](ChannelSocket.md#status)

### Methods

- [close](ChannelSocket.md#close)
- [send](ChannelSocket.md#send)

## Constructors

### constructor

• **new ChannelSocket**(`sbServer`, `onMessage`, `key?`, `channelId?`)

ChannelSocket

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `onMessage` | (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void` |
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

• `Optional` **adminData**: [`ChannelAdminData`](../interfaces/ChannelAdminData.md)

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

• **ready**: `Promise`<[`ChannelSocket`](ChannelSocket.md)\>

#### Overrides

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

### enableTrace

• `set` **enableTrace**(`b`): `void`

Enables debug output

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `boolean` |

#### Returns

`void`

___

### exportable\_owner\_pubKey

• `get` **exportable_owner_pubKey**(): ``null`` \| `JsonWebKey`

#### Returns

``null`` \| `JsonWebKey`

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

• `get` **onMessage**(): (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void`

#### Returns

`fn`

▸ (`m`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `m` | [`ChannelMessage`](../interfaces/ChannelMessage.md) |

##### Returns

`void`

• `set` **onMessage**(`f`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void` |

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

___

### status

• `get` **status**(): ``"CLOSED"`` \| ``"CONNECTING"`` \| ``"OPEN"`` \| ``"CLOSING"``

#### Returns

``"CLOSED"`` \| ``"CONNECTING"`` \| ``"OPEN"`` \| ``"CLOSING"``

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

___

### send

▸ **send**(`msg`): `Promise`<`string`\>

ChannelSocket.send()

Returns a promise that resolves to "success" when sent,
or an error message if it fails.

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` \| [`SBMessage`](SBMessage.md) |

#### Returns

`Promise`<`string`\>

#### Overrides

[Channel](Channel.md).[send](Channel.md#send)
