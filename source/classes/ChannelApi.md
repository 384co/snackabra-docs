[JSLib Reference Manual](../README.md) / [Exports](../modules.md) / ChannelApi

# Class: ChannelApi

Channel API

Requires a Channel object to initialize. That can be a ChannelSocket, for
example, or if you just need access to send commands to the channel you
can use ChannelEndpoint (since "Channel" is an abstract class)

## Table of contents

### Constructors

- [constructor](ChannelApi.md#constructor)

### Accessors

- [channelId](ChannelApi.md#channelid)

### Methods

- [acceptVisitor](ChannelApi.md#acceptvisitor)
- [authorize](ChannelApi.md#authorize)
- [budd](ChannelApi.md#budd)
- [downloadData](ChannelApi.md#downloaddata)
- [getAdminData](ChannelApi.md#getadmindata)
- [getCapacity](ChannelApi.md#getcapacity)
- [getJoinRequests](ChannelApi.md#getjoinrequests)
- [getLastMessageTimes](ChannelApi.md#getlastmessagetimes)
- [getMother](ChannelApi.md#getmother)
- [getOldMessages](ChannelApi.md#getoldmessages)
- [getStorageLimit](ChannelApi.md#getstoragelimit)
- [isLocked](ChannelApi.md#islocked)
- [lock](ChannelApi.md#lock)
- [ownerKeyRotation](ChannelApi.md#ownerkeyrotation)
- [postPubKey](ChannelApi.md#postpubkey)
- [setMOTD](ChannelApi.md#setmotd)
- [storageRequest](ChannelApi.md#storagerequest)
- [updateCapacity](ChannelApi.md#updatecapacity)
- [uploadChannel](ChannelApi.md#uploadchannel)

## Constructors

### constructor

• **new ChannelApi**(`channel`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | [`Channel`](Channel.md) |

## Accessors

### channelId

• `get` **channelId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

## Methods

### acceptVisitor

▸ **acceptVisitor**(`pubKey`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubKey` | `string` |

#### Returns

`Promise`<`unknown`\>

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

___

### budd

▸ **budd**(): `Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

"budd" will spin a channel off an existing one.
You need to provide one of the following combinations of info:

- nothing (special case, create new channel and transfer all storage budget)
- just storage amount (creates new channel with that amount)
- just a target channel (moves all storage budget to that channel)
- just keys (creates new channel with those keys and transfers all storage budget)
- keys and storage amount (creates new channel with those keys and that storage amount)

In the first (special) case you can just call budd(), in the other
cases you need to fill out the options object.

Another way to remember the above: all combinations are valid except
both a target channel and assigning keys.

Note: if you're specifying the target channel, then the return values will
not include the private key (that return value will be empty).

#### Returns

`Promise`<[`SBChannelHandle`](../interfaces/SBChannelHandle.md)\>

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

___

### downloadData

▸ **downloadData**(): `Promise`<`unknown`\>

downloadData

#### Returns

`Promise`<`unknown`\>

___

### getAdminData

▸ **getAdminData**(): `Promise`<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

getAdminData

#### Returns

`Promise`<[`ChannelAdminData`](../interfaces/ChannelAdminData.md)\>

___

### getCapacity

▸ **getCapacity**(): `Promise`<`any`\>

getCapacity

#### Returns

`Promise`<`any`\>

___

### getJoinRequests

▸ **getJoinRequests**(): `Promise`<`any`\>

getJoinRequests

#### Returns

`Promise`<`any`\>

___

### getLastMessageTimes

▸ **getLastMessageTimes**(): `Promise`<`unknown`\>

getLastMessageTimes

#### Returns

`Promise`<`unknown`\>

___

### getMother

▸ **getMother**(): `Promise`<`any`\>

getMother

Get the channelID from which this channel was budded. Note that
this is only accessible by Owner (as well as hosting server)

#### Returns

`Promise`<`any`\>

___

### getOldMessages

▸ **getOldMessages**(`currentMessagesLength?`, `paginate?`): `Promise`<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

getOldMessages

Will return most recent messages from the channel.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `currentMessagesLength` | `number` | `100` | number to fetch (default 100) |
| `paginate` | `boolean` | `false` | if true, will paginate from last request (default false) TODO: this needs to be able to check that the channel socket is ready, otherwise the keys might not be ... currently before calling this, make a ready check on the socket |

#### Returns

`Promise`<[`ChannelMessage`](../interfaces/ChannelMessage.md)[]\>

___

### getStorageLimit

▸ **getStorageLimit**(): `Promise`<`any`\>

getStorageLimit (current storage budget)

#### Returns

`Promise`<`any`\>

___

### isLocked

▸ **isLocked**(): `Promise`<`boolean`\>

isLocked

#### Returns

`Promise`<`boolean`\>

___

### lock

▸ **lock**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

___

### ownerKeyRotation

▸ **ownerKeyRotation**(): `void`

#### Returns

`void`

___

### postPubKey

▸ **postPubKey**(`_exportable_pubKey`): `Promise`<{ `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_exportable_pubKey` | `JsonWebKey` |

#### Returns

`Promise`<{ `success`: `boolean`  }\>

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

___

### storageRequest

▸ **storageRequest**(`byteLength`): `Promise`<`Dictionary`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteLength` | `number` |

#### Returns

`Promise`<`Dictionary`<`any`\>\>

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

___

### uploadChannel

▸ **uploadChannel**(`channelData`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channelData` | [`ChannelData`](../interfaces/ChannelData.md) |

#### Returns

`Promise`<`any`\>
