[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / Snackabra

# Class: Snackabra

Snackabra

## Table of contents

### Constructors

- [constructor](Snackabra.md#constructor)

### Properties

- [channelServer](Snackabra.md#channelserver)
- [storageServer](Snackabra.md#storageserver)

### Accessors

- [crypto](Snackabra.md#crypto)
- [storage](Snackabra.md#storage)
- [version](Snackabra.md#version)

### Methods

- [attach](Snackabra.md#attach)
- [connect](Snackabra.md#connect)
- [create](Snackabra.md#create)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new Snackabra**(`sbServerOrChannelServer`, `setDBG?`, `setDBG2?`): [`Snackabra`](Snackabra.md)

class Snackabra

Main class. It corresponds to a single channel server. Most apps
will only be talking to one channel server, but it is possible
to have multiple instances of Snackabra, each talking to a
different channel server.

SB 2.0 prefers a single parameter, the URL to the channel server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServerOrChannelServer` | `string` \| [`SBServer`](../interfaces/SBServer.md) |
| `setDBG?` | `boolean` |
| `setDBG2?` | `boolean` |

#### Returns

[`Snackabra`](Snackabra.md)

**`Example`**

```typescript
    const sb = new Snackabra('http://localhost:3845')
```

Websocket server is always the same server (just different protocol),
storage server is now provided by '/api/info' endpoint, and shard
servers are orthogonal anyway (any shard server can talk to any
storage server).

Note that 'new Snackabra()' is guaranteed synchronous.

SB 1.x interface was to provide a set of servers, eg:

**`Example`**

```typescript
    const sb = new Snackabra({
      channel_server: 'http://localhost:3845',
      channel_ws: 'ws://localhost:3845',
      storage_server: 'http://localhost:3843',
      shard_server: 'http://localhost:3841',
    })
```

## Properties

### <a id="channelserver" name="channelserver"></a> channelServer

• **channelServer**: `string`

___

### <a id="storageserver" name="storageserver"></a> storageServer

• **storageServer**: `string`

## Accessors

### <a id="crypto" name="crypto"></a> crypto

• `get` **crypto**(): [`SBCrypto`](SBCrypto.md)

Returns the crypto API.

#### Returns

[`SBCrypto`](SBCrypto.md)

___

### <a id="storage" name="storage"></a> storage

• `get` **storage**(): `StorageApi`

Returns the storage API.

#### Returns

`StorageApi`

___

### <a id="version" name="version"></a> version

• `get` **version**(): `string`

#### Returns

`string`

## Methods

### <a id="attach" name="attach"></a> attach

▸ **attach**(`handle`): `Promise`\<[`Channel`](Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |

#### Returns

`Promise`\<[`Channel`](Channel.md)\>

___

### <a id="connect" name="connect"></a> connect

▸ **connect**(`handle`, `onMessage?`): [`ChannelSocket`](ChannelSocket.md)

Connects to :term:`Channel Name` on this SB config.
Returns a channel socket promise right away, but it
will not be ready until the ``ready`` promise is resolved.

Note that if you have a preferred server then the channel
object will be returned right away, but the ``ready`` promise
will still be pending. If you do not have a preferred server,
then the ``ready`` promise will be resolved when at least
one of the known servers is responding and ready.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |
| `onMessage?` | (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void` |

#### Returns

[`ChannelSocket`](ChannelSocket.md)

a channel object

___

### <a id="create" name="create"></a> create

▸ **create**(`ownerKeys`, `budgetChannel`): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

Creates a new channel.
Returns a promise to a ''SBChannelHandle'' object.
Note that this method does not connect to the channel,
it just creates (authorizes) it and allocates storage budget.

New (2.0) interface:

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownerKeys` | [`SB384`](SB384.md) | - |
| `budgetChannel` | [`Channel`](Channel.md) | NECESSARY unless local/dev; provides a channel to pay for storage |

#### Returns

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

▸ **create**(`sbServer`, `serverSecretOrBudgetChannel?`, `keys?`): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `serverSecretOrBudgetChannel?` | `string` \| [`Channel`](Channel.md) |
| `keys?` | `JsonWebKey` |

#### Returns

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>
