[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / Snackabra

# Class: Snackabra

Snackabra is the main class for interacting with the Snackable backend.

It is a singleton, so you can only have one instance of it.
It is guaranteed to be synchronous, so you can use it right away.
It is also guaranteed to be thread-safe, so you can use it from multiple
threads.

Constructor expects an object with the names of the matching servers, for example
below shows the miniflare local dev config. Note that 'new Snackabra()' is
guaranteed synchronous, so can be 'used' right away. You can optionally call
without a parameter in which case SB will ping known servers.

**`Example`**

```typescript
    const sb = new Snackabra({
      channel_server: 'http://127.0.0.1:4001',
      channel_ws: 'ws://127.0.0.1:4001',
      storage_server: 'http://127.0.0.1:4000'
    })
```

Testing glossary links:

* glossary.html

## Table of contents

### Constructors

- [constructor](Snackabra.md#constructor)

### Accessors

- [channel](Snackabra.md#channel)
- [crypto](Snackabra.md#crypto)
- [storage](Snackabra.md#storage)

### Methods

- [connect](Snackabra.md#connect)
- [create](Snackabra.md#create)

## Constructors

### constructor

• **new Snackabra**(`args?`, `DEBUG?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `args?` | [`SBServer`](../interfaces/SBServer.md) | `undefined` | optional object with the names of the matching servers, for example below shows the miniflare local dev config. Note that 'new Snackabra()' is guaranteed synchronous, so can be 'used' right away. You can optionally call without a parameter in which case SB will ping known servers. |
| `DEBUG` | `boolean` | `false` | optional boolean to enable debug logging |

## Accessors

### channel

• `get` **channel**(): [`Channel`](Channel.md)

Connects to a channel.

#### Returns

[`Channel`](Channel.md)

___

### crypto

• `get` **crypto**(): [`SBCrypto`](SBCrypto.md)

Returns the crypto API.

#### Returns

[`SBCrypto`](SBCrypto.md)

___

### storage

• `get` **storage**(): `StorageApi`

Returns the storage API.

#### Returns

`StorageApi`

## Methods

### connect

▸ **connect**(`onMessage`, `key?`, `channelId?`): `Promise`<[`ChannelSocket`](ChannelSocket.md)\>

Connects to :term:`Channel Name` on this SB config.
Returns a channel socket promise right away, but it
will not be ready until the ``ready`` promise is resolved.
Note that if you have a preferred server then the channel
object will be returned right away, but the ``ready`` promise
will still be pending. If you do not have a preferred server,
then the ``ready`` promise will be resolved when a least
one of the known servers is ready.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onMessage` | (`m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void` | - |
| `key?` | `JsonWebKey` | optional key to use for encryption/decryption |
| `channelId?` | `string` | optional channel id to use for encryption/decryption |

#### Returns

`Promise`<[`ChannelSocket`](ChannelSocket.md)\>

a channel object

___

### create

▸ **create**(`sbServer`, `serverSecret`, `keys?`): `Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

Creates a new channel. Currently uses trivial authentication.
Returns a promise to a ''SBChannelHandle'' object
(which includes the :term:`Channel Name`).
Note that this method does not connect to the channel,
it just creates (authorizes) it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) | the server to use |
| `serverSecret` | `string` | the server secret |
| `keys?` | `JsonWebKey` | optional keys to use for encryption/decryption |

#### Returns

`Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>
