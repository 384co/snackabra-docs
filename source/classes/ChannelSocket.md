[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / ChannelSocket

# Class: ChannelSocket

ChannelSocket

## Hierarchy

- [`Channel`](Channel.md)

  ↳ **`ChannelSocket`**

## Table of contents

### Constructors

- [constructor](ChannelSocket.md#constructor)

### Properties

- [#ChannelReadyFlag](ChannelSocket.md##channelreadyflag)
- [#ChannelSocketReadyFlag](ChannelSocket.md##channelsocketreadyflag)
- [#SB384ReadyFlag](ChannelSocket.md##sb384readyflag)
- [#ack](ChannelSocket.md##ack)
- [#channelApi](ChannelSocket.md##channelapi)
- [#channelId](ChannelSocket.md##channelid)
- [#channelKeys](ChannelSocket.md##channelkeys)
- [#channelServer](ChannelSocket.md##channelserver)
- [#channelSignKey](ChannelSocket.md##channelsignkey)
- [#cursor](ChannelSocket.md##cursor)
- [#exportable\_privateKey](ChannelSocket.md##exportable_privatekey)
- [#exportable\_pubKey](ChannelSocket.md##exportable_pubkey)
- [#firstMessageEventHandlerReference](ChannelSocket.md##firstmessageeventhandlerreference)
- [#hash](ChannelSocket.md##hash)
- [#onMessage](ChannelSocket.md##onmessage)
- [#privateKey](ChannelSocket.md##privatekey)
- [#resolveFirstMessage](ChannelSocket.md##resolvefirstmessage)
- [#sbServer](ChannelSocket.md##sbserver)
- [#sbServer](ChannelSocket.md##sbserver-1)
- [#traceSocket](ChannelSocket.md##tracesocket)
- [#ws](ChannelSocket.md##ws)
- [admin](ChannelSocket.md#admin)
- [adminData](ChannelSocket.md#admindata)
- [channelReady](ChannelSocket.md#channelready)
- [channelSocketReady](ChannelSocket.md#channelsocketready)
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
- [hash](ChannelSocket.md#hash)
- [keys](ChannelSocket.md#keys)
- [onMessage](ChannelSocket.md#onmessage)
- [ownerChannelId](ChannelSocket.md#ownerchannelid)
- [privateKey](ChannelSocket.md#privatekey)
- [readyFlag](ChannelSocket.md#readyflag)
- [sbServer](ChannelSocket.md#sbserver)
- [status](ChannelSocket.md#status)

### Methods

- [#callApi](ChannelSocket.md##callapi)
- [#channelSocketReadyFactory](ChannelSocket.md##channelsocketreadyfactory)
- [#firstMessageEventHandler](ChannelSocket.md##firstmessageeventhandler)
- [#insideFirstMessageHandler](ChannelSocket.md##insidefirstmessagehandler)
- [#loadKeys](ChannelSocket.md##loadkeys)
- [#processMessage](ChannelSocket.md##processmessage)
- [#setKeys](ChannelSocket.md##setkeys)
- [acceptVisitor](ChannelSocket.md#acceptvisitor)
- [authorize](ChannelSocket.md#authorize)
- [budd](ChannelSocket.md#budd)
- [downloadData](ChannelSocket.md#downloaddata)
- [getAdminData](ChannelSocket.md#getadmindata)
- [getCapacity](ChannelSocket.md#getcapacity)
- [getJoinRequests](ChannelSocket.md#getjoinrequests)
- [getLastMessageTimes](ChannelSocket.md#getlastmessagetimes)
- [getMother](ChannelSocket.md#getmother)
- [getOldMessages](ChannelSocket.md#getoldmessages)
- [getStorageLimit](ChannelSocket.md#getstoragelimit)
- [isLocked](ChannelSocket.md#islocked)
- [lock](ChannelSocket.md#lock)
- [ownerKeyRotation](ChannelSocket.md#ownerkeyrotation)
- [postPubKey](ChannelSocket.md#postpubkey)
- [send](ChannelSocket.md#send)
- [setMOTD](ChannelSocket.md#setmotd)
- [storageRequest](ChannelSocket.md#storagerequest)
- [updateCapacity](ChannelSocket.md#updatecapacity)
- [uploadChannel](ChannelSocket.md#uploadchannel)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new ChannelSocket**(`sbServer`, `onMessage`, `key?`, `channelId?`)

ChannelSocket constructor

This extends Channel. Use this instead of ChannelEndpoint if you
are going to be sending/receiving messages.

You send by calling channel.send(msg: SBMessage | string), i.e.
you can send a quick string.

You can set your message handler upon creation, or later by using
channel.onMessage = (m: ChannelMessage) => { ... }.

This implementation uses websockeds to connect all participating
clients through a single servlet (somewhere), with very fast
forwarding.

You don't need to worry about managing resources, like closing it,
or checking if it's open. It will close based on server behavior,
eg it's up to the server to close the connection based on inactivity.
The ChannelSocket will re-open if you try to send against a closed
connection. You can check status with channelSocket.status if you
like, but it shouldn't be necessary.

Messages are delivered as type ChannelMessage. Usually they are
simple blobs of data that are encrypted: the ChannelSocket will
decrypt them for you. It also handles a simple ack/nack mechanism
with the server transparently.

Be aware that if ChannelSocket doesn't know how to handle a certain
message, it will generally just forward it to you as-is.

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

### <a id="#channelreadyflag" name="#channelreadyflag"></a> #ChannelReadyFlag

• `Private` **#ChannelReadyFlag**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[#ChannelReadyFlag](Channel.md##channelreadyflag)

___

### <a id="#channelsocketreadyflag" name="#channelsocketreadyflag"></a> #ChannelSocketReadyFlag

• `Private` **#ChannelSocketReadyFlag**: `boolean` = `false`

___

### <a id="#sb384readyflag" name="#sb384readyflag"></a> #SB384ReadyFlag

• `Private` **#SB384ReadyFlag**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[#SB384ReadyFlag](Channel.md##sb384readyflag)

___

### <a id="#ack" name="#ack"></a> #ack

• `Private` **#ack**: `Map`<`string`, (`value`: `string` \| `PromiseLike`<`string`\>) => `void`\>

___

### <a id="#channelapi" name="#channelapi"></a> #channelApi

• `Private` **#channelApi**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[#channelApi](Channel.md##channelapi)

___

### <a id="#channelid" name="#channelid"></a> #channelId

• `Private` `Optional` **#channelId**: `string`

#### Inherited from

[Channel](Channel.md).[#channelId](Channel.md##channelid)

___

### <a id="#channelkeys" name="#channelkeys"></a> #channelKeys

• `Private` `Optional` **#channelKeys**: [`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Inherited from

[Channel](Channel.md).[#channelKeys](Channel.md##channelkeys)

___

### <a id="#channelserver" name="#channelserver"></a> #channelServer

• `Private` **#channelServer**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[#channelServer](Channel.md##channelserver)

___

### <a id="#channelsignkey" name="#channelsignkey"></a> #channelSignKey

• `Private` `Optional` **#channelSignKey**: `CryptoKey`

#### Inherited from

[Channel](Channel.md).[#channelSignKey](Channel.md##channelsignkey)

___

### <a id="#cursor" name="#cursor"></a> #cursor

• `Private` **#cursor**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[#cursor](Channel.md##cursor)

___

### <a id="#exportable_privatekey" name="#exportable_privatekey"></a> #exportable\_privateKey

• `Private` `Optional` **#exportable\_privateKey**: `JsonWebKey`

#### Inherited from

[Channel](Channel.md).[#exportable_privateKey](Channel.md##exportable_privatekey)

___

### <a id="#exportable_pubkey" name="#exportable_pubkey"></a> #exportable\_pubKey

• `Private` `Optional` **#exportable\_pubKey**: `JsonWebKey`

#### Inherited from

[Channel](Channel.md).[#exportable_pubKey](Channel.md##exportable_pubkey)

___

### <a id="#firstmessageeventhandlerreference" name="#firstmessageeventhandlerreference"></a> #firstMessageEventHandlerReference

• `Private` **#firstMessageEventHandlerReference**: (`e`: `MessageEvent`<`any`\>) => `void`

#### Type declaration

▸ (`e`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MessageEvent`<`any`\> |

##### Returns

`void`

___

### <a id="#hash" name="#hash"></a> #hash

• `Private` `Optional` **#hash**: `string`

#### Inherited from

[Channel](Channel.md).[#hash](Channel.md##hash)

___

### <a id="#onmessage" name="#onmessage"></a> #onMessage

• `Private` **#onMessage**: (`_m`: [`ChannelMessage`](../interfaces/ChannelMessage.md)) => `void` = `noMessageHandler`

#### Type declaration

▸ (`_m`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_m` | [`ChannelMessage`](../interfaces/ChannelMessage.md) |

##### Returns

`void`

___

### <a id="#privatekey" name="#privatekey"></a> #privateKey

• `Private` `Optional` **#privateKey**: `CryptoKey`

#### Inherited from

[Channel](Channel.md).[#privateKey](Channel.md##privatekey)

___

### <a id="#resolvefirstmessage" name="#resolvefirstmessage"></a> #resolveFirstMessage

• `Private` **#resolveFirstMessage**: (`value`: [`ChannelSocket`](ChannelSocket.md) \| `PromiseLike`<[`ChannelSocket`](ChannelSocket.md)\>) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ChannelSocket`](ChannelSocket.md) \| `PromiseLike`<[`ChannelSocket`](ChannelSocket.md)\> |

##### Returns

`void`

___

### <a id="#sbserver" name="#sbserver"></a> #sbServer

• `Private` **#sbServer**: [`SBServer`](../interfaces/SBServer.md)

#### Inherited from

[Channel](Channel.md).[#sbServer](Channel.md##sbserver)

___

### <a id="#sbserver-1" name="#sbserver-1"></a> #sbServer

• `Private` **#sbServer**: [`SBServer`](../interfaces/SBServer.md)

#### Inherited from

Channel.#sbServer

___

### <a id="#tracesocket" name="#tracesocket"></a> #traceSocket

• `Private` **#traceSocket**: `boolean` = `false`

___

### <a id="#ws" name="#ws"></a> #ws

• `Private` **#ws**: `WSProtocolOptions`

___

### <a id="admin" name="admin"></a> admin

• **admin**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[admin](Channel.md#admin)

___

### <a id="admindata" name="admindata"></a> adminData

• `Optional` **adminData**: `Dictionary`<`any`\>

#### Inherited from

[Channel](Channel.md).[adminData](Channel.md#admindata)

___

### <a id="channelready" name="channelready"></a> channelReady

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

### <a id="channelsocketready" name="channelsocketready"></a> channelSocketReady

• **channelSocketReady**: `Promise`<[`ChannelSocket`](ChannelSocket.md)\>

___

### <a id="locked" name="locked"></a> locked

• `Optional` **locked**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[locked](Channel.md#locked)

___

### <a id="motd" name="motd"></a> motd

• `Optional` **motd**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[motd](Channel.md#motd)

___

### <a id="owner" name="owner"></a> owner

• **owner**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[owner](Channel.md#owner)

___

### <a id="ready" name="ready"></a> ready

• **ready**: `Promise`<[`ChannelSocket`](ChannelSocket.md)\>

#### Overrides

[Channel](Channel.md).[ready](Channel.md#ready)

___

### <a id="sb384ready" name="sb384ready"></a> sb384Ready

• **sb384Ready**: `Promise`<[`SB384`](SB384.md)\>

#### Inherited from

[Channel](Channel.md).[sb384Ready](Channel.md#sb384ready)

___

### <a id="username" name="username"></a> userName

• **userName**: `string` = `''`

#### Inherited from

[Channel](Channel.md).[userName](Channel.md#username)

___

### <a id="verifiedguest" name="verifiedguest"></a> verifiedGuest

• **verifiedGuest**: `boolean` = `false`

#### Inherited from

[Channel](Channel.md).[verifiedGuest](Channel.md#verifiedguest)

## Accessors

### <a id="_id" name="_id"></a> \_id

• `get` **_id**(): `string`

#### Returns

`string`

#### Inherited from

Channel.\_id

___

### <a id="api" name="api"></a> api

• `get` **api**(): `this`

#### Returns

`this`

#### Inherited from

Channel.api

___

### <a id="channelid" name="channelid"></a> channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

Channel.channelId

___

### <a id="channelsignkey" name="channelsignkey"></a> channelSignKey

• `get` **channelSignKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

Channel.channelSignKey

___

### <a id="enabletrace" name="enabletrace"></a> enableTrace

• `set` **enableTrace**(`b`): `void`

Enables debug output

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `boolean` |

#### Returns

`void`

___

### <a id="exportable_owner_pubkey" name="exportable_owner_pubkey"></a> exportable\_owner\_pubKey

• `get` **exportable_owner_pubKey**(): `CryptoKey`

#### Returns

`CryptoKey`

___

### <a id="exportable_privatekey" name="exportable_privatekey"></a> exportable\_privateKey

• `get` **exportable_privateKey**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

Channel.exportable\_privateKey

___

### <a id="exportable_pubkey" name="exportable_pubkey"></a> exportable\_pubKey

• `get` **exportable_pubKey**(): `JsonWebKey`

#### Returns

`JsonWebKey`

#### Inherited from

Channel.exportable\_pubKey

___

### <a id="hash" name="hash"></a> hash

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

### <a id="keys" name="keys"></a> keys

• `get` **keys**(): [`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Returns

[`ChannelKeys`](../interfaces/ChannelKeys.md)

#### Inherited from

Channel.keys

___

### <a id="onmessage" name="onmessage"></a> onMessage

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

### <a id="ownerchannelid" name="ownerchannelid"></a> ownerChannelId

• `get` **ownerChannelId**(): `string`

#### Returns

`string`

#### Inherited from

Channel.ownerChannelId

___

### <a id="privatekey" name="privatekey"></a> privateKey

• `get` **privateKey**(): `CryptoKey`

#### Returns

`CryptoKey`

#### Inherited from

Channel.privateKey

___

### <a id="readyflag" name="readyflag"></a> readyFlag

• `get` **readyFlag**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Channel.readyFlag

___

### <a id="sbserver" name="sbserver"></a> sbServer

• `get` **sbServer**(): [`SBServer`](../interfaces/SBServer.md)

#### Returns

[`SBServer`](../interfaces/SBServer.md)

#### Inherited from

Channel.sbServer

___

### <a id="status" name="status"></a> status

• `get` **status**(): ``"CLOSED"`` \| ``"CONNECTING"`` \| ``"OPEN"`` \| ``"CLOSING"``

#### Returns

``"CLOSED"`` \| ``"CONNECTING"`` \| ``"OPEN"`` \| ``"CLOSING"``

## Methods

### <a id="#callapi" name="#callapi"></a> #callApi

▸ `Private` **#callApi**(`path`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[#callApi](Channel.md##callapi)

▸ `Private` **#callApi**(`path`, `body`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `body` | `any` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[#callApi](Channel.md##callapi)

___

### <a id="#channelsocketreadyfactory" name="#channelsocketreadyfactory"></a> #channelSocketReadyFactory

▸ `Private` **#channelSocketReadyFactory**(): `Promise`<[`ChannelSocket`](ChannelSocket.md)\>

#### Returns

`Promise`<[`ChannelSocket`](ChannelSocket.md)\>

___

### <a id="#firstmessageeventhandler" name="#firstmessageeventhandler"></a> #firstMessageEventHandler

▸ `Private` **#firstMessageEventHandler**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MessageEvent`<`any`\> |

#### Returns

`void`

___

### <a id="#insidefirstmessagehandler" name="#insidefirstmessagehandler"></a> #insideFirstMessageHandler

▸ `Private` **#insideFirstMessageHandler**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `MessageEvent`<`any`\> |

#### Returns

`void`

___

### <a id="#loadkeys" name="#loadkeys"></a> #loadKeys

▸ `Private` **#loadKeys**(`keyStrings`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyStrings` | [`ChannelKeyStrings`](../interfaces/ChannelKeyStrings.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Channel](Channel.md).[#loadKeys](Channel.md##loadkeys)

___

### <a id="#processmessage" name="#processmessage"></a> #processMessage

▸ `Private` **#processMessage**(`msg`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`Promise`<`void`\>

___

### <a id="#setkeys" name="#setkeys"></a> #setKeys

▸ `Private` **#setKeys**(`k`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | [`ChannelKeys`](../interfaces/ChannelKeys.md) |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Channel](Channel.md).[#setKeys](Channel.md##setkeys)

___

### <a id="acceptvisitor" name="acceptvisitor"></a> acceptVisitor

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

### <a id="authorize" name="authorize"></a> authorize

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

### <a id="budd" name="budd"></a> budd

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

### <a id="downloaddata" name="downloaddata"></a> downloadData

▸ **downloadData**(): `Promise`<`unknown`\>

Channel.downloadData

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[Channel](Channel.md).[downloadData](Channel.md#downloaddata)

___

### <a id="getadmindata" name="getadmindata"></a> getAdminData

▸ **getAdminData**(): `Promise`<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

Channel.getAdminData

#### Returns

`Promise`<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

#### Inherited from

[Channel](Channel.md).[getAdminData](Channel.md#getadmindata)

___

### <a id="getcapacity" name="getcapacity"></a> getCapacity

▸ **getCapacity**(): `Promise`<`any`\>

getCapacity

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[getCapacity](Channel.md#getcapacity)

___

### <a id="getjoinrequests" name="getjoinrequests"></a> getJoinRequests

▸ **getJoinRequests**(): `Promise`<`any`\>

getJoinRequests

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[getJoinRequests](Channel.md#getjoinrequests)

___

### <a id="getlastmessagetimes" name="getlastmessagetimes"></a> getLastMessageTimes

▸ **getLastMessageTimes**(): `Promise`<`unknown`\>

Channel.getLastMessageTimes

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[Channel](Channel.md).[getLastMessageTimes](Channel.md#getlastmessagetimes)

___

### <a id="getmother" name="getmother"></a> getMother

▸ **getMother**(): `Promise`<`any`\>

getMother

Get the channelID from which this channel was budded. Note that
this is only accessible by Owner (as well as hosting server)

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[getMother](Channel.md#getmother)

___

### <a id="getoldmessages" name="getoldmessages"></a> getOldMessages

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

### <a id="getstoragelimit" name="getstoragelimit"></a> getStorageLimit

▸ **getStorageLimit**(): `Promise`<`any`\>

getStorageLimit (current storage budget)

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[getStorageLimit](Channel.md#getstoragelimit)

___

### <a id="islocked" name="islocked"></a> isLocked

▸ **isLocked**(): `Promise`<`boolean`\>

isLocked

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Channel](Channel.md).[isLocked](Channel.md#islocked)

___

### <a id="lock" name="lock"></a> lock

▸ **lock**(): `Promise`<`unknown`\>

Channel.lock()

Locks the channel, so that new visitors need an "ack" to join..

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[Channel](Channel.md).[lock](Channel.md#lock)

___

### <a id="ownerkeyrotation" name="ownerkeyrotation"></a> ownerKeyRotation

▸ **ownerKeyRotation**(): `void`

#### Returns

`void`

#### Inherited from

[Channel](Channel.md).[ownerKeyRotation](Channel.md#ownerkeyrotation)

___

### <a id="postpubkey" name="postpubkey"></a> postPubKey

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

### <a id="send" name="send"></a> send

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

___

### <a id="setmotd" name="setmotd"></a> setMOTD

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

### <a id="storagerequest" name="storagerequest"></a> storageRequest

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

### <a id="updatecapacity" name="updatecapacity"></a> updateCapacity

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

### <a id="uploadchannel" name="uploadchannel"></a> uploadChannel

▸ **uploadChannel**(`channelData`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelData` | [`ChannelData`](../interfaces/ChannelData.md) |

#### Returns

`Promise`<`any`\>

#### Inherited from

[Channel](Channel.md).[uploadChannel](Channel.md#uploadchannel)
