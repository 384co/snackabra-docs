[JSLib Reference Manual](jslib2.md) / Exports

# JSLib Reference Manual

## Table of contents

### Namespaces

- [Interfaces](modules/Interfaces.md)

### Classes

- [Channel](classes/Channel.md)
- [ChannelSocket](classes/ChannelSocket.md)
- [MessageBus](classes/MessageBus.md)
- [SB384](classes/SB384.md)
- [SBCrypto](classes/SBCrypto.md)
- [SBMessage](classes/SBMessage.md)
- [SBObjectHandle](classes/SBObjectHandle.md)
- [Snackabra](classes/Snackabra.md)

### Interfaces

- [ChannelAdminData](interfaces/ChannelAdminData.md)
- [ChannelData](interfaces/ChannelData.md)
- [ChannelKeyStrings](interfaces/ChannelKeyStrings.md)
- [ChannelKeys](interfaces/ChannelKeys.md)
- [ChannelMessage](interfaces/ChannelMessage.md)
- [EncryptedContents](interfaces/EncryptedContents.md)
- [EncryptedContentsBin](interfaces/EncryptedContentsBin.md)
- [ImageMetaData](interfaces/ImageMetaData.md)
- [SBChannelHandle](interfaces/SBChannelHandle.md)
- [SBPayload](interfaces/SBPayload.md)
- [SBServer](interfaces/SBServer.md)

### Type Aliases

- [ChannelMessageTypes](modules.md#channelmessagetypes)
- [SB384Hash](modules.md#sb384hash)
- [SBChannelId](modules.md#sbchannelid)
- [SBKey](modules.md#sbkey)
- [SBObjectHandleVersions](modules.md#sbobjecthandleversions)
- [SBObjectType](modules.md#sbobjecttype)
- [SBUserId](modules.md#sbuserid)
- [SBUserKey](modules.md#sbuserkey)
- [SBUserKeyString](modules.md#sbuserkeystring)

### Variables

- [SB](modules.md#sb)
- [sbCrypto](modules.md#sbcrypto)
- [version](modules.md#version)

### Functions

- [arrayBuffer32ToBase62](modules.md#arraybuffer32tobase62)
- [arrayBufferToBase62](modules.md#arraybuffertobase62)
- [arrayBufferToBase64](modules.md#arraybuffertobase64)
- [assemblePayload](modules.md#assemblepayload)
- [base62ToArrayBuffer](modules.md#base62toarraybuffer)
- [base62ToArrayBuffer32](modules.md#base62toarraybuffer32)
- [base62ToBase64](modules.md#base62tobase64)
- [base64ToArrayBuffer](modules.md#base64toarraybuffer)
- [base64ToBase62](modules.md#base64tobase62)
- [compareBuffers](modules.md#comparebuffers)
- [decodeB64Url](modules.md#decodeb64url)
- [encodeB64Url](modules.md#encodeb64url)
- [encryptedContentsMakeBinary](modules.md#encryptedcontentsmakebinary)
- [extractPayload](modules.md#extractpayload)
- [getRandomValues](modules.md#getrandomvalues)
- [isBase62Encoded](modules.md#isbase62encoded)
- [isSBKey](modules.md#issbkey)
- [jsonParseWrapper](modules.md#jsonparsewrapper)
- [partition](modules.md#partition)

## Type Aliases

### <a id="channelmessagetypes" name="channelmessagetypes"></a> ChannelMessageTypes

Ƭ **ChannelMessageTypes**: ``"ack"`` \| ``"keys"`` \| ``"invalid"`` \| ``"ready"`` \| ``"encrypted"``

___

### <a id="sb384hash" name="sb384hash"></a> SB384Hash

Ƭ **SB384Hash**: `string`

___

### <a id="sbchannelid" name="sbchannelid"></a> SBChannelId

Ƭ **SBChannelId**: [`SB384Hash`](modules.md#sb384hash)

___

### <a id="sbkey" name="sbkey"></a> SBKey

Ƭ **SBKey**: `SBAES256Key` \| `SBPrivateKey` \| `SBPublicKey`

___

### <a id="sbobjecthandleversions" name="sbobjecthandleversions"></a> SBObjectHandleVersions

Ƭ **SBObjectHandleVersions**: ``"1"`` \| ``"2"``

___

### <a id="sbobjecttype" name="sbobjecttype"></a> SBObjectType

Ƭ **SBObjectType**: ``"f"`` \| ``"p"`` \| ``"b"`` \| ``"t"``

SBObjectType

SBObjectType is a single character string that indicates the
type of object. Currently, the following types are supported:

- 'f' : full object (e.g. image, this is the most common)
- 'p' : preview object (e.g. thumbnail)
- 'b' : block/binary object (e.g. 64KB block)
- 't' : test object (for testing purposes)

The 't' type is used for testing purposes, and you should
not expect it to have any particular SLA or longevity.

Note that when you retrieve any object, you must have the
matching object type.

___

### <a id="sbuserid" name="sbuserid"></a> SBUserId

Ƭ **SBUserId**: `string`

___

### <a id="sbuserkey" name="sbuserkey"></a> SBUserKey

Ƭ **SBUserKey**: `SBPrivateKey` \| `SBPublicKey`

___

### <a id="sbuserkeystring" name="sbuserkeystring"></a> SBUserKeyString

Ƭ **SBUserKeyString**: `string`

## Variables

### <a id="sb" name="sb"></a> SB

• **SB**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Channel` | typeof [`Channel`](classes/Channel.md) |
| `SB384` | typeof [`SB384`](classes/SB384.md) |
| `SBCrypto` | typeof [`SBCrypto`](classes/SBCrypto.md) |
| `SBMessage` | typeof [`SBMessage`](classes/SBMessage.md) |
| `Snackabra` | typeof [`Snackabra`](classes/Snackabra.md) |
| `arrayBufferToBase64` | (`buffer`: ``null`` \| `ArrayBuffer` \| `Uint8Array`, `variant`: ``"url"`` \| ``"b64"``) => `string` |
| `sbCrypto` | [`SBCrypto`](classes/SBCrypto.md) |
| `version` | `string` |

___

### <a id="sbcrypto" name="sbcrypto"></a> sbCrypto

• `Const` **sbCrypto**: [`SBCrypto`](classes/SBCrypto.md)

This is the GLOBAL SBCrypto object, which is instantiated
immediately upon loading the jslib library.

You should use this guy, not instantiate your own. We don't
use static functions in SBCrypto(), because we want to be
able to add features (like global key store) incrementally.

___

### <a id="version" name="version"></a> version

• `Const` **version**: ``"2.0.0-alpha.5 (build 20)"``

## Functions

### <a id="arraybuffer32tobase62" name="arraybuffer32tobase62"></a> arrayBuffer32ToBase62

▸ **arrayBuffer32ToBase62**(`buffer`): `Base62Encoded`

Convenience wrapper.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `ArrayBuffer` |

#### Returns

`Base62Encoded`

___

### <a id="arraybuffertobase62" name="arraybuffertobase62"></a> arrayBufferToBase62

▸ **arrayBufferToBase62**(`buffer`): `string`

Converts any array buffer to base62.
Restriction: ArrayBuffer must be size multiple of 4 bytes (32 bits).

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `ArrayBuffer` |

#### Returns

`string`

___

### <a id="arraybuffertobase64" name="arraybuffertobase64"></a> arrayBufferToBase64

▸ **arrayBufferToBase64**(`buffer`, `variant?`): `string`

Standardized 'btoa()'-like function, e.g., takes a binary string
('b') and returns a Base64 encoded version ('a' used to be short
for 'ascii'). Defaults to URL safe ('url') but can be overriden
to use standardized Base64 ('b64').

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `buffer` | ``null`` \| `ArrayBuffer` \| `Uint8Array` | `undefined` | binary string |
| `variant` | ``"url"`` \| ``"b64"`` | `'url'` | 'b64' or 'url' |

#### Returns

`string`

- returns Base64 encoded string

___

### <a id="assemblepayload" name="assemblepayload"></a> assemblePayload

▸ **assemblePayload**(`data`): `ArrayBuffer` \| ``null``

Assemble payload. This creates a single binary (wire) format
of an arbitrary set of (named) binary objects.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SBPayload`](interfaces/SBPayload.md) |

#### Returns

`ArrayBuffer` \| ``null``

___

### <a id="base62toarraybuffer" name="base62toarraybuffer"></a> base62ToArrayBuffer

▸ **base62ToArrayBuffer**(`s`): `ArrayBuffer`

base62ToArrayBuffer

Converts a base62 string to matchin ArrayBuffer.
Restriction: the original array buffer size must have
been a multiple of 4 bytes (32 bits), eg. this
function will always return such an ArrayBuffer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`ArrayBuffer`

___

### <a id="base62toarraybuffer32" name="base62toarraybuffer32"></a> base62ToArrayBuffer32

▸ **base62ToArrayBuffer32**(`s`): `ArrayBuffer`

Convenience wrapper, enforces array32 format

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `Base62Encoded` |

#### Returns

`ArrayBuffer`

___

### <a id="base62tobase64" name="base62tobase64"></a> base62ToBase64

▸ **base62ToBase64**(`s`): `string`

base62ToBase64 converts a base62 encoded string to a base64 encoded string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `Base62Encoded` | base62 encoded string |

#### Returns

`string`

base64 encoded string

**`Throws`**

Error if the string is not a valid base62 encoded string

___

### <a id="base64toarraybuffer" name="base64toarraybuffer"></a> base64ToArrayBuffer

▸ **base64ToArrayBuffer**(`str`): `Uint8Array`

Standardized 'atob()' function, e.g. takes the a Base64 encoded
input and decodes it. Note: always returns Uint8Array.
Accepts both regular Base64 and the URL-friendly variant,
where `+` => `-`, `/` => `_`, and the padding character is omitted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | string in either regular or URL-friendly representation. |

#### Returns

`Uint8Array`

- returns decoded binary result

___

### <a id="base64tobase62" name="base64tobase62"></a> base64ToBase62

▸ **base64ToBase62**(`s`): `Base62Encoded`

Convenience function.

base64ToBase62 converts a base64 encoded string to a base62 encoded string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | base64 encoded string |

#### Returns

`Base62Encoded`

base62 encoded string

**`Throws`**

Error if the string is not a valid base64 encoded string

___

### <a id="comparebuffers" name="comparebuffers"></a> compareBuffers

▸ **compareBuffers**(`a`, `b`): `boolean`

Compare buffers

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | ``null`` \| `ArrayBuffer` \| `Uint8Array` |
| `b` | ``null`` \| `ArrayBuffer` \| `Uint8Array` |

#### Returns

`boolean`

___

### <a id="decodeb64url" name="decodeb64url"></a> decodeB64Url

▸ **decodeB64Url**(`input`): `string`

Decode b64 URL

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

___

### <a id="encodeb64url" name="encodeb64url"></a> encodeB64Url

▸ **encodeB64Url**(`input`): `string`

Encode into b64 URL

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

___

### <a id="encryptedcontentsmakebinary" name="encryptedcontentsmakebinary"></a> encryptedContentsMakeBinary

▸ **encryptedContentsMakeBinary**(`o`): [`EncryptedContentsBin`](interfaces/EncryptedContentsBin.md)

Force EncryptedContents object to binary (interface
supports either string or arrays). String contents
implies base64 encoding.

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | [`EncryptedContents`](interfaces/EncryptedContents.md) |

#### Returns

[`EncryptedContentsBin`](interfaces/EncryptedContentsBin.md)

___

### <a id="extractpayload" name="extractpayload"></a> extractPayload

▸ **extractPayload**(`payload`): [`SBPayload`](interfaces/SBPayload.md)

Extract payload - this decodes from our binary (wire) format
to a JS object. This provides a binary encoding of any JSON,
and it allows some elements of the JSON to be raw (binary).

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `ArrayBuffer` |

#### Returns

[`SBPayload`](interfaces/SBPayload.md)

___

### <a id="getrandomvalues" name="getrandomvalues"></a> getRandomValues

▸ **getRandomValues**(`buffer`): `Uint8Array`

Fills buffer with random data

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Uint8Array` |

#### Returns

`Uint8Array`

___

### <a id="isbase62encoded" name="isbase62encoded"></a> isBase62Encoded

▸ **isBase62Encoded**(`value`): value is Base62Encoded

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `Base62Encoded` |

#### Returns

value is Base62Encoded

___

### <a id="issbkey" name="issbkey"></a> isSBKey

▸ **isSBKey**(`key`): key is SBKey

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

key is SBKey

___

### <a id="jsonparsewrapper" name="jsonparsewrapper"></a> jsonParseWrapper

▸ **jsonParseWrapper**(`str`, `loc?`): `any`

There are many problems with JSON parsing, adding a resilient wrapper to capture more info.
The 'loc' parameter should be a (unique) string that allows you to find the usage
in the code; one approach is the line number in the file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | ``null`` \| `string` |
| `loc?` | `string` |

#### Returns

`any`

___

### <a id="partition" name="partition"></a> partition

▸ **partition**(`str`, `n`): `void`

Partition

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `n` | `number` |

#### Returns

`void`
