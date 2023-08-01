[JSLib Reference Manual](jslib2.md) / Exports

# JSLib Reference Manual

## Table of contents

### Namespaces

- [Interfaces](modules/Interfaces.md)

### Classes

- [Channel](classes/Channel.md)
- [ChannelEndpoint](classes/ChannelEndpoint.md)
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
- [SBObjectMetadata](interfaces/SBObjectMetadata.md)
- [SBPayload](interfaces/SBPayload.md)
- [SBServer](interfaces/SBServer.md)

### Type Aliases

- [ChannelMessageTypes](modules.md#channelmessagetypes)
- [SB384Hash](modules.md#sb384hash)
- [SBChannelId](modules.md#sbchannelid)
- [SBObjectType](modules.md#sbobjecttype)
- [SBUserId](modules.md#sbuserid)

### Variables

- [SB](modules.md#sb)
- [sbCrypto](modules.md#sbcrypto)
- [version](modules.md#version)

### Functions

- [arrayBuffer32ToBase62](modules.md#arraybuffer32tobase62)
- [arrayBufferToBase64](modules.md#arraybuffertobase64)
- [assemblePayload](modules.md#assemblepayload)
- [base62ToArrayBuffer32](modules.md#base62toarraybuffer32)
- [base62ToBase64](modules.md#base62tobase64)
- [base64ToArrayBuffer](modules.md#base64toarraybuffer)
- [base64ToBase62](modules.md#base64tobase62)
- [cleanBase32mi](modules.md#cleanbase32mi)
- [compareBuffers](modules.md#comparebuffers)
- [decodeB64Url](modules.md#decodeb64url)
- [encodeB64Url](modules.md#encodeb64url)
- [encryptedContentsMakeBinary](modules.md#encryptedcontentsmakebinary)
- [extractPayload](modules.md#extractpayload)
- [getRandomValues](modules.md#getrandomvalues)
- [isBase62Encoded](modules.md#isbase62encoded)
- [jsonParseWrapper](modules.md#jsonparsewrapper)
- [partition](modules.md#partition)
- [simpleRand256](modules.md#simplerand256)
- [simpleRandomString](modules.md#simplerandomstring)

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

### <a id="sbobjecttype" name="sbobjecttype"></a> SBObjectType

Ƭ **SBObjectType**: ``"f"`` \| ``"p"`` \| ``"b"`` \| ``"t"``

___

### <a id="sbuserid" name="sbuserid"></a> SBUserId

Ƭ **SBUserId**: [`SB384Hash`](modules.md#sb384hash)

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

You should use this guy, not instantiate your own.

___

### <a id="version" name="version"></a> version

• `Const` **version**: ``"1.1.25 (pre) build 01"``

## Functions

### <a id="arraybuffer32tobase62" name="arraybuffer32tobase62"></a> arrayBuffer32ToBase62

▸ **arrayBuffer32ToBase62**(`buffer`): `string`

arrayBuffer32ToBase62 converts an ArrayBuffer32 to a base62 encoded string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | `ArrayBuffer` | ArrayBuffer32 |

#### Returns

`string`

base62 encoded string

___

### <a id="arraybuffertobase64" name="arraybuffertobase64"></a> arrayBufferToBase64

▸ **arrayBufferToBase64**(`buffer`, `variant?`): `string`

Standardized 'btoa()'-like function, e.g., takes a binary string
('b') and returns a Base64 encoded version ('a' used to be short
for 'ascii').

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

▸ **assemblePayload**(`data`): `BodyInit` \| ``null``

Assemble payload. This creates a single binary (wire) format
of an arbitrary set of (named) binary objects.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`SBPayload`](interfaces/SBPayload.md) |

#### Returns

`BodyInit` \| ``null``

___

### <a id="base62toarraybuffer32" name="base62toarraybuffer32"></a> base62ToArrayBuffer32

▸ **base62ToArrayBuffer32**(`s`): `ArrayBuffer`

base62ToArrayBuffer32 converts a base62 encoded string to an ArrayBuffer32.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | base62 encoded string |

#### Returns

`ArrayBuffer`

ArrayBuffer32

___

### <a id="base62tobase64" name="base62tobase64"></a> base62ToBase64

▸ **base62ToBase64**(`s`): `string`

base62ToBase64 converts a base62 encoded string to a base64 encoded string.

**`Throws`**

Error if the string is not a valid base62 encoded string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | base62 encoded string |

#### Returns

`string`

base64 encoded string

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

▸ **base64ToBase62**(`s`): `string`

base64ToBase62 converts a base64 encoded string to a base62 encoded string.

**`Throws`**

Error if the string is not a valid base64 encoded string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `s` | `string` | base64 encoded string |

#### Returns

`string`

base62 encoded string

___

### <a id="cleanbase32mi" name="cleanbase32mi"></a> cleanBase32mi

▸ **cleanBase32mi**(`s`): `string`

This function disambiguates strings that are known to be 'base32mi' type.
Below is the list of base32 characters, and the disambiguation table.
base32mi is designed to be human-friendly, so this function can be 
safely called anywhere you have human input - including as an 
event on an input field that immediately makes any correction. 

You can think of the translation either in terms of many-to-one
(all entered characters that map to a specific base32mi character),
or as a one-to-one correspondence (where '.' means 'no change').

**`Example`**

```ts
'base32mi': '0123456789abcdefyhEjkLmNHpFrRTUW'

    Disambiguation transformations:

    [OoQD] -> '0'
    [lIiJ] -> '1'
    [Zz] -> '2'
    [A] -> '4'
    [Ss] -> '5'
    [G] -> '6'
    [t] -> '7'
    [B] -> '8'
    [gq] -> '9'
    [C] -> 'c'
    [Y] -> 'y'
    [KxX] -> 'k'
    [M] -> 'm'
    [n] -> 'N'
    [P] -> 'p'
    [uvV] -> 'U'
    [w] -> 'W'

    0123456789abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ
    ................9.1..1.N0.9.57UUk.248c0EF6.11kLm.0p0.5..Uky2
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`string`

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
| `value` | `string` |

#### Returns

value is Base62Encoded

___

### <a id="jsonparsewrapper" name="jsonparsewrapper"></a> jsonParseWrapper

▸ **jsonParseWrapper**(`str`, `loc`): `any`

There are many problems with JSON parsing, adding a wrapper to capture more info.
The 'loc' parameter should be a (unique) string that allows you to find the usage
in the code; one approach is the line number in the file (at some point).

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | ``null`` \| `string` |
| `loc` | `string` |

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

___

### <a id="simplerand256" name="simplerand256"></a> simpleRand256

▸ **simpleRand256**(): `number`

Returns random number

#### Returns

`number`

integer 0..255

___

### <a id="simplerandomstring" name="simplerandomstring"></a> simpleRandomString

▸ **simpleRandomString**(`n`, `code`): `string`

Returns a random string in requested encoding

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |
| `code` | `string` |

#### Returns

`string`

random string

base32mi: ``0123456789abcdefyhEjkLmNHpFrRTUW``
