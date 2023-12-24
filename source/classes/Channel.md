[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / Channel

# Class: Channel

Channel

## Hierarchy

- `SBChannelKeys`

  ↳ **`Channel`**

  ↳↳ [`ChannelSocket`](ChannelSocket.md)

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Properties

- [adminData](Channel.md#admindata)
- [channelReady](Channel.md#channelready)
- [locked](Channel.md#locked)
- [motd](Channel.md#motd)
- [ready](Channel.md#ready)
- [sb384Ready](Channel.md#sb384ready)
- [sbChannelKeysReady](Channel.md#sbchannelkeysready)
- [verifiedGuest](Channel.md#verifiedguest)

### Accessors

- [api](Channel.md#api)
- [channelData](Channel.md#channeldata)
- [channelId](Channel.md#channelid)
- [channelServer](Channel.md#channelserver)
- [channelSignKey](Channel.md#channelsignkey)
- [encryptionKey](Channel.md#encryptionkey)
- [exportable\_pubKey](Channel.md#exportable_pubkey)
- [hash](Channel.md#hash)
- [jwk](Channel.md#jwk)
- [key](Channel.md#key)
- [keys](Channel.md#keys)
- [owner](Channel.md#owner)
- [ownerChannelId](Channel.md#ownerchannelid)
- [private](Channel.md#private)
- [readyFlag](Channel.md#readyflag)
- [userId](Channel.md#userid)
- [userKeyString](Channel.md#userkeystring)

### Methods

- [acceptVisitor](Channel.md#acceptvisitor)
- [authorize](Channel.md#authorize)
- [budd](Channel.md#budd)
- [deCryptChannelMessage](Channel.md#decryptchannelmessage)
- [downloadData](Channel.md#downloaddata)
- [getAdminData](Channel.md#getadmindata)
- [getCapacity](Channel.md#getcapacity)
- [getJoinRequests](Channel.md#getjoinrequests)
- [getLastMessageTimes](Channel.md#getlastmessagetimes)
- [getMother](Channel.md#getmother)
- [getOldMessages](Channel.md#getoldmessages)
- [getStorageLimit](Channel.md#getstoragelimit)
- [getStorageToken](Channel.md#getstoragetoken)
- [isLocked](Channel.md#islocked)
- [lock](Channel.md#lock)
- [ownerKeyRotation](Channel.md#ownerkeyrotation)
- [postPubKey](Channel.md#postpubkey)
- [send](Channel.md#send)
- [setMOTD](Channel.md#setmotd)
- [storageRequest](Channel.md#storagerequest)
- [updateCapacity](Channel.md#updatecapacity)
- [uploadChannel](Channel.md#uploadchannel)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new Channel**(`handle`): [`Channel`](Channel.md)

Join a channel, taking a channel handle. Returns channel object.

You must have an identity when connecting, because every single
message is signed by sender.

Most classes in SB follow the "ready" template: objects can be used
right away, but they decide for themselves if they're ready or not.
The SB384 state is the *user* of the channel, not the channel
itself; it has an Owner (also SB384 object), which can be the
same as the user/visitor, but that requires finalizing creating
the channel to find out (from the channel server).

The Channel class communicates asynchronously with the channel.

The ChannelSocket class is a subclass of Channel, and it communicates
synchronously (via websockets).

Note that you don't need to worry about what API calls involve race
conditions and which don't, the library will do that for you.

Current (2.x) interface:

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`SBChannelHandle`](../interfaces/SBChannelHandle.md) |

#### Returns

[`Channel`](Channel.md)

#### Overrides

SBChannelKeys.constructor

• **new Channel**(`sbServer`, `userKey`, `channelId`): [`Channel`](Channel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sbServer` | [`SBServer`](../interfaces/SBServer.md) |
| `userKey` | `JsonWebKey` |
| `channelId` | `string` |

#### Returns

[`Channel`](Channel.md)

#### Overrides

SBChannelKeys.constructor

## Properties

### <a id="admindata" name="admindata"></a> adminData

• `Optional` **adminData**: `Dictionary`\<`any`\>

___

### <a id="channelready" name="channelready"></a> channelReady

• **channelReady**: `Promise`\<[`Channel`](Channel.md)\>

___

### <a id="locked" name="locked"></a> locked

• `Optional` **locked**: `boolean` = `false`

___

### <a id="motd" name="motd"></a> motd

• `Optional` **motd**: `string` = `''`

___

### <a id="ready" name="ready"></a> ready

• **ready**: `Promise`\<[`Channel`](Channel.md)\>

#### Overrides

SBChannelKeys.ready

___

### <a id="sb384ready" name="sb384ready"></a> sb384Ready

• **sb384Ready**: `Promise`\<[`SB384`](SB384.md)\>

#### Inherited from

SBChannelKeys.sb384Ready

___

### <a id="sbchannelkeysready" name="sbchannelkeysready"></a> sbChannelKeysReady

• **sbChannelKeysReady**: `Promise`\<`SBChannelKeys`\>

#### Inherited from

SBChannelKeys.sbChannelKeysReady

___

### <a id="verifiedguest" name="verifiedguest"></a> verifiedGuest

• **verifiedGuest**: `boolean` = `false`

## Accessors

### <a id="api" name="api"></a> api

• `get` **api**(): `this`

#### Returns

`this`

___

### <a id="channeldata" name="channeldata"></a> channelData

• `get` **channelData**(): [`ChannelData`](../interfaces/ChannelData.md)

#### Returns

[`ChannelData`](../interfaces/ChannelData.md)

#### Inherited from

SBChannelKeys.channelData

___

### <a id="channelid" name="channelid"></a> channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

SBChannelKeys.channelId

___

### <a id="channelserver" name="channelserver"></a> channelServer

• `get` **channelServer**(): `string`

#### Returns

`string`

#### Inherited from

SBChannelKeys.channelServer

• `set` **channelServer**(`channelServer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelServer` | `string` |

#### Returns

`void`

#### Inherited from

SBChannelKeys.channelServer

___

### <a id="channelsignkey" name="channelsignkey"></a> channelSignKey

• `get` **channelSignKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.channelSignKey

___

### <a id="encryptionkey" name="encryptionkey"></a> encryptionKey

• `get` **encryptionKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.encryptionKey

___

### <a id="exportable_pubkey" name="exportable_pubkey"></a> exportable\_pubKey

• `get` **exportable_pubKey**(): `JsonWebKey`

For 'jwk' format use cases.

#### Returns

`JsonWebKey`

#### Inherited from

SBChannelKeys.exportable\_pubKey

___

### <a id="hash" name="hash"></a> hash

• `get` **hash**(): `string`

Returns a unique identifier for external use, that will be unique
for any class or object that uses SB384 as it's root.

This is deterministic. Important use case is to translate a user id
into a channel id (eg the channel that any user id is inherently
the owner of).

The hash is base64 encoding of the SHA-384 hash of the public key,
taking the 'x' and 'y' fields. Note that it is slightly restricted, it only
allows [A-Za-z0-9], eg does not allow the '_' or '-' characters. This makes the
encoding more practical for end-user interactions like copy-paste. This
is accomplished by simply re-hashing until the result is valid. This 
reduces the entropy of the channel ID by a neglible amount. 

Note this is not b62 encoding, which we use for 256-bit entities. This
is still ~384 bits (e.g. x and y fields are each 384 bits, but of course
the underlying total entropy isn't that (exercise left to the reader).

NOTE: if you ever need to COMPARE hashes, the short version is that
you cannot do so in the general case: you need to use sbCrypto.compareHashWithKey()

#### Returns

`string`

#### Inherited from

SBChannelKeys.hash

___

### <a id="jwk" name="jwk"></a> jwk

• `get` **jwk**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

SBChannelKeys.jwk

___

### <a id="key" name="key"></a> key

• `get` **key**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

SBChannelKeys.key

___

### <a id="keys" name="keys"></a> keys

• `get` **keys**(): [`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Returns

[`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Inherited from

SBChannelKeys.keys

___

### <a id="owner" name="owner"></a> owner

• `get` **owner**(): `boolean`

#### Returns

`boolean`

#### Inherited from

SBChannelKeys.owner

___

### <a id="ownerchannelid" name="ownerchannelid"></a> ownerChannelId

• `get` **ownerChannelId**(): `string`

ChannelID that corresponds to this, if it's an owner

#### Returns

`string`

#### Inherited from

SBChannelKeys.ownerChannelId

___

### <a id="private" name="private"></a> private

• `get` **private**(): `boolean`

Returns true if this is a private key, otherwise false.
Will throw an exception if the object is not ready.

#### Returns

`boolean`

#### Inherited from

SBChannelKeys.private

___

### <a id="readyflag" name="readyflag"></a> readyFlag

• `get` **readyFlag**(): `boolean`

#### Returns

`boolean`

#### Overrides

SBChannelKeys.readyFlag

___

### <a id="userid" name="userid"></a> userId

• `get` **userId**(): `string`

Somewhat confusing at times, the string version of the user key per se is
different from "hash" (the full public key can be recovered from SBUserId).
Eg this is the public identifier.

#### Returns

`string`

#### Inherited from

SBChannelKeys.userId

___

### <a id="userkeystring" name="userkeystring"></a> userKeyString

• `get` **userKeyString**(): `string`

Wire format of full info of key (eg private key).

#### Returns

`string`

#### Inherited from

SBChannelKeys.userKeyString

## Methods

### <a id="acceptvisitor" name="acceptvisitor"></a> acceptVisitor

▸ **acceptVisitor**(`userId`): `Promise`\<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`Promise`\<`unknown`\>

___

### <a id="authorize" name="authorize"></a> authorize

▸ **authorize**(`ownerPublicKey`, `serverSecret`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ownerPublicKey` | `Dictionary`\<`any`\> |
| `serverSecret` | `string` |

#### Returns

`Promise`\<`any`\>

___

### <a id="budd" name="budd"></a> budd

▸ **budd**(): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

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

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

▸ **budd**(`options`): `Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keys?` | `JsonWebKey` |
| `options.storage?` | `number` |
| `options.targetChannel?` | `string` |

#### Returns

`Promise`\<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

___

### <a id="decryptchannelmessage" name="decryptchannelmessage"></a> deCryptChannelMessage

▸ **deCryptChannelMessage**(`m00`, `m01`): `Promise`\<`undefined` \| [`ChannelMessage`](../interfaces/ChannelMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `m00` | `string` |
| `m01` | [`EncryptedContents`](../interfaces/EncryptedContents.md) |

#### Returns

`Promise`\<`undefined` \| [`ChannelMessage`](../interfaces/ChannelMessage.md)\>

___

### <a id="downloaddata" name="downloaddata"></a> downloadData

▸ **downloadData**(): `Promise`\<`unknown`\>

Channel.downloadData

#### Returns

`Promise`\<`unknown`\>

___

### <a id="getadmindata" name="getadmindata"></a> getAdminData

▸ **getAdminData**(): `Promise`\<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

Channel.getAdminData

#### Returns

`Promise`\<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

___

### <a id="getcapacity" name="getcapacity"></a> getCapacity

▸ **getCapacity**(): `Promise`\<`any`\>

getCapacity

#### Returns

`Promise`\<`any`\>

___

### <a id="getjoinrequests" name="getjoinrequests"></a> getJoinRequests

▸ **getJoinRequests**(): `Promise`\<`any`\>

getJoinRequests

#### Returns

`Promise`\<`any`\>

___

### <a id="getlastmessagetimes" name="getlastmessagetimes"></a> getLastMessageTimes

▸ **getLastMessageTimes**(): `void`

Channel.getLastMessageTimes

#### Returns

`void`

___

### <a id="getmother" name="getmother"></a> getMother

▸ **getMother**(): `Promise`\<`any`\>

getMother

Get the channelID from which this channel was budded. Note that
this is only accessible by Owner (as well as hosting server)

#### Returns

`Promise`\<`any`\>

___

### <a id="getoldmessages" name="getoldmessages"></a> getOldMessages

▸ **getOldMessages**(`currentMessagesLength?`, `paginate?`): `Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

Channel.getOldMessages

Will return most recent messages from the channel.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `currentMessagesLength` | `number` | `100` | number to fetch (default 100) |
| `paginate` | `boolean` | `false` | if true, will paginate from last request (default false) |

#### Returns

`Promise`\<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

___

### <a id="getstoragelimit" name="getstoragelimit"></a> getStorageLimit

▸ **getStorageLimit**(): `Promise`\<`any`\>

getStorageLimit (current storage budget)

#### Returns

`Promise`\<`any`\>

___

### <a id="getstoragetoken" name="getstoragetoken"></a> getStorageToken

▸ **getStorageToken**(`size`): `Promise`\<`string`\>

returns a storage token (promise); basic consumption of channel budget

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`Promise`\<`string`\>

___

### <a id="islocked" name="islocked"></a> isLocked

▸ **isLocked**(): `Promise`\<`boolean`\>

isLocked

#### Returns

`Promise`\<`boolean`\>

___

### <a id="lock" name="lock"></a> lock

▸ **lock**(`key?`): `Promise`\<\{ `locked`: `boolean` ; `lockedKey`: `JsonWebKey`  }\>

Channel.lock()

Locks the channel, so that new visitors need an "ack" to join.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `CryptoKey` |

#### Returns

`Promise`\<\{ `locked`: `boolean` ; `lockedKey`: `JsonWebKey`  }\>

___

### <a id="ownerkeyrotation" name="ownerkeyrotation"></a> ownerKeyRotation

▸ **ownerKeyRotation**(): `void`

#### Returns

`void`

___

### <a id="postpubkey" name="postpubkey"></a> postPubKey

▸ **postPubKey**(`_exportable_pubKey`): `Promise`\<\{ `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_exportable_pubKey` | `JsonWebKey` |

#### Returns

`Promise`\<\{ `success`: `boolean`  }\>

___

### <a id="send" name="send"></a> send

▸ **send**(`_msg`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_msg` | `string` \| [`SBMessage`](SBMessage.md) |

#### Returns

`Promise`\<`string`\>

___

### <a id="setmotd" name="setmotd"></a> setMOTD

▸ **setMOTD**(`motd`): `Promise`\<`any`\>

Set message of the day

#### Parameters

| Name | Type |
| :------ | :------ |
| `motd` | `string` |

#### Returns

`Promise`\<`any`\>

___

### <a id="storagerequest" name="storagerequest"></a> storageRequest

▸ **storageRequest**(`byteLength`): `Promise`\<`Dictionary`\<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteLength` | `number` |

#### Returns

`Promise`\<`Dictionary`\<`any`\>\>

___

### <a id="updatecapacity" name="updatecapacity"></a> updateCapacity

▸ **updateCapacity**(`capacity`): `Promise`\<`any`\>

Update (set) the capacity of the channel; Owner only

#### Parameters

| Name | Type |
| :------ | :------ |
| `capacity` | `number` |

#### Returns

`Promise`\<`any`\>

___

### <a id="uploadchannel" name="uploadchannel"></a> uploadChannel

▸ **uploadChannel**(`channelData`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelData` | [`ChannelData`](../interfaces/ChannelData.md) |

#### Returns

`Promise`\<`any`\>
