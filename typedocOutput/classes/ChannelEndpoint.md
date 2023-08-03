[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelEndpoint

# Class: ChannelEndpoint

ChannelEndpoint

Gives access to a Channel API (without needing to connect to socket).
It's fully functional except it won't send or receive messages
(obviously, that's what a socket is for, but we might add send/receive
in the future for non-socket use cases)

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
- [hash](ChannelEndpoint.md#hash)
- [keys](ChannelEndpoint.md#keys)
- [onMessage](ChannelEndpoint.md#onmessage)
- [ownerChannelId](ChannelEndpoint.md#ownerchannelid)
- [privateKey](ChannelEndpoint.md#privatekey)
- [readyFlag](ChannelEndpoint.md#readyflag)
- [sbServer](ChannelEndpoint.md#sbserver)

### Methods

- [acceptVisitor](ChannelEndpoint.md#acceptvisitor)
- [authorize](ChannelEndpoint.md#authorize)
- [budd](ChannelEndpoint.md#budd)
- [downloadData](ChannelEndpoint.md#downloaddata)
- [getAdminData](ChannelEndpoint.md#getadmindata)
- [getCapacity](ChannelEndpoint.md#getcapacity)
- [getJoinRequests](ChannelEndpoint.md#getjoinrequests)
- [getLastMessageTimes](ChannelEndpoint.md#getlastmessagetimes)
- [getMother](ChannelEndpoint.md#getmother)
- [getOldMessages](ChannelEndpoint.md#getoldmessages)
- [getStorageLimit](ChannelEndpoint.md#getstoragelimit)
- [isLocked](ChannelEndpoint.md#islocked)
- [lock](ChannelEndpoint.md#lock)
- [ownerKeyRotation](ChannelEndpoint.md#ownerkeyrotation)
- [postPubKey](ChannelEndpoint.md#postpubkey)
- [send](ChannelEndpoint.md#send)
- [setMOTD](ChannelEndpoint.md#setmotd)
- [storageRequest](ChannelEndpoint.md#storagerequest)
- [updateCapacity](ChannelEndpoint.md#updatecapacity)
- [uploadChannel](ChannelEndpoint.md#uploadchannel)

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

#### Inherited from

[Channel](Channel.md).[adminData](Channel.md#admindata)

___

### channelReady

• **channelReady**: `Promise`<[`Channel`](Channel.md)\>

Channel Class

This is the main work horse for channels. However, it is ABSTRACT,
meaning you need a 'concrete' class to use it.

Currently you have two options:

You can create a ChannelEndpoint object. That can do everything against
a channel except send/receive messages synchronously.

The other option is ChannelSocket, which does everything ChannelEndpoint
does, but ALSO connects with a web socket.

So unless you're actually connecting with intent on interactive, fast
messaging, an endpoint is sufficient. In fact, UNLESS you are going to
do send/receive, you should use ChannelEndpoint, not ChannelSocket.

In our current thinking, 'Channel' captures pretty much everything, 
except how you want (instant) messaging to be hooked up. So for example, our
next class might be 'ChannelP2P', which would be setting up webrtc
data channel connections in a mesh.

Note that you don't need to worry about what API calls involve race
conditions and which don't, jslib will do that for you.

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

• `get` **api**(): `this`

#### Returns

`this`

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

### hash

• `get` **hash**(): `string`

Returns a unique identifier for external use, that will be unique
for any class or object that uses SB384 as it's root.

This is deterministic, used to identify users, channels, etc.

The hash is base64 encoding of the SHA-384 hash of the public key,
taking the 'x' and 'y' fields. Note that it is slightly restricted, it only
allows [A-Za-z0-9], eg does not allow the '_' or '-' characters. This makes the
encoding more practical for end-user interactions like copy-paste. This
is accomplished by simply re-hashing until the result is valid. This 
reduces the entropy of the channel ID by a neglible amount. 

Note this is not b62 encoding, which we use for 256-bit entities. This
is still ~384 bits (e.g. x and y fields are each 384 bits, but of course
the underlying total entropy isn't that, see <insert lots of fun math crypto
study material heh>).

NOTE: if you ever need to COMPARE hashes, well short version is that
you cannot do so in the general case. You can use sbCrypto.compareHashWithKey()
to compare a hash with a key, but you cannot compare two hashes. See the
comparison function for more details.

#### Returns

`string`

#### Inherited from

Channel.hash

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

### acceptVisitor

▸ **acceptVisitor**(`pubKey`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubKey` | `string` |

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[Channel](Channel.md).[acceptVisitor](Channel.md#acceptvisitor)

___

### authorize

▸ **authorize**(`ownerPublicKey`, `serverSecret`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ownerPublicKey` | `Dictionary`<`any`\> |
| `serverSecret` | `string` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[authorize](Channel.md#authorize)

___

### budd

▸ **budd**(): `Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

"budd" will spin a channel off an existing one.
You need to provide one of the following combinations of info:

- nothing: create new channel and transfer all storage budget
- just storage amount: creates new channel with that amount, returns new channel
- just a target channel: moves all storage budget to that channel
- just keys: creates new channel with those keys and transfers all storage budget
- keys and storage amount: creates new channel with those keys and that storage amount

In the first (special) case you can just call budd(), in the other
cases you need to fill out the 'options' object.

Another way to remember the above: all combinations are valid except
both a target channel and assigning keys.

Note: if you're specifying the target channel, then the return values will
not include the private key (that return value will be empty).

Same channels as mother and target will be a no-op, regardless of other
parameters.

Note: if you provide a value for 'storage', it cannot be undefined. If you
wish it to be Infinity, then you need to omit the property from options.

Future: negative amount of storage leaves that amount behind, the rest is transferred

#### Returns

`Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Inherited from

[Channel](Channel.md).[budd](Channel.md#budd)

▸ **budd**(`options`): `Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keys?` | `JsonWebKey` |
| `options.storage?` | `number` |
| `options.targetChannel?` | `string` |

#### Returns

`Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Inherited from

[Channel](Channel.md).[budd](Channel.md#budd)

___

### downloadData

▸ **downloadData**(): `Promise`<`unknown`\>

Channel.downloadData

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[Channel](Channel.md).[downloadData](Channel.md#downloaddata)

___

### getAdminData

▸ **getAdminData**(): `Promise`<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

Channel.getAdminData

#### Returns

`Promise`<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

#### Inherited from

[Channel](Channel.md).[getAdminData](Channel.md#getadmindata)

___

### getCapacity

▸ **getCapacity**(): `Promise`<`any`\>

getCapacity

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[getCapacity](Channel.md#getcapacity)

___

### getJoinRequests

▸ **getJoinRequests**(): `Promise`<`any`\>

getJoinRequests

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[getJoinRequests](Channel.md#getjoinrequests)

___

### getLastMessageTimes

▸ **getLastMessageTimes**(): `Promise`<`unknown`\>

Channel.getLastMessageTimes

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[Channel](Channel.md).[getLastMessageTimes](Channel.md#getlastmessagetimes)

___

### getMother

▸ **getMother**(): `Promise`<`any`\>

getMother

Get the channelID from which this channel was budded. Note that
this is only accessible by Owner (as well as hosting server)

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[getMother](Channel.md#getmother)

___

### getOldMessages

▸ **getOldMessages**(`currentMessagesLength?`, `paginate?`): `Promise`<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

Channel.getOldMessages

Will return most recent messages from the channel.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `currentMessagesLength` | `number` | `100` | number to fetch (default 100) |
| `paginate` | `boolean` | `false` | if true, will paginate from last request (default false) |

#### Returns

`Promise`<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

#### Inherited from

[Channel](Channel.md).[getOldMessages](Channel.md#getoldmessages)

___

### getStorageLimit

▸ **getStorageLimit**(): `Promise`<`any`\>

getStorageLimit (current storage budget)

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[getStorageLimit](Channel.md#getstoragelimit)

___

### isLocked

▸ **isLocked**(): `Promise`<`boolean`\>

isLocked

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Channel](Channel.md).[isLocked](Channel.md#islocked)

___

### lock

▸ **lock**(): `Promise`<`unknown`\>

Channel.lock()

Locks the channel, so that new visitors need an "ack" to join..

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[Channel](Channel.md).[lock](Channel.md#lock)

___

### ownerKeyRotation

▸ **ownerKeyRotation**(): `void`

#### Returns

`void`

#### Inherited from

[Channel](Channel.md).[ownerKeyRotation](Channel.md#ownerkeyrotation)

___

### postPubKey

▸ **postPubKey**(`_exportable_pubKey`): `Promise`<{ `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_exportable_pubKey` | `JsonWebKey` |

#### Returns

`Promise`<{ `success`: `boolean`  }\>

#### Inherited from

[Channel](Channel.md).[postPubKey](Channel.md#postpubkey)

___

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

___

### setMOTD

▸ **setMOTD**(`motd`): `Promise`<`any`\>

Set message of the day

#### Parameters

| Name | Type |
| :------ | :------ |
| `motd` | `string` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[setMOTD](Channel.md#setmotd)

___

### storageRequest

▸ **storageRequest**(`byteLength`): `Promise`<`Dictionary`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteLength` | `number` |

#### Returns

`Promise`<`Dictionary`<`any`\>\>

#### Inherited from

[Channel](Channel.md).[storageRequest](Channel.md#storagerequest)

___

### updateCapacity

▸ **updateCapacity**(`capacity`): `Promise`<`any`\>

Update (set) the capacity of the channel; Owner only

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[updateCapacity](Channel.md#updatecapacity)

___

### uploadChannel

▸ **uploadChannel**(`channelData`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelData` | [`ChannelData`](../interfaces/ChannelData.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[uploadChannel](Channel.md#uploadchannel)
