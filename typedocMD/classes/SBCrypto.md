[JSLib Reference Manual](../jslib2.md) / [Exports](../modules.md) / SBCrypto

# Class: SBCrypto

SBCrypto

SBCrypto contains all the SB specific crypto functions,
as well as some general utility functions.

## Table of contents

### Constructors

- [constructor](SBCrypto.md#constructor)

### Methods

- [ab2str](SBCrypto.md#ab2str)
- [addKnownKey](SBCrypto.md#addknownkey)
- [channelKeyStringsToCryptoKeys](SBCrypto.md#channelkeystringstocryptokeys)
- [compareHashWithKey](SBCrypto.md#comparehashwithkey)
- [compareKeys](SBCrypto.md#comparekeys)
- [deriveKey](SBCrypto.md#derivekey)
- [encrypt](SBCrypto.md#encrypt)
- [exportKey](SBCrypto.md#exportkey)
- [extractPubKey](SBCrypto.md#extractpubkey)
- [generateIdKey](SBCrypto.md#generateidkey)
- [generateKeys](SBCrypto.md#generatekeys)
- [importKey](SBCrypto.md#importkey)
- [lookupKey](SBCrypto.md#lookupkey)
- [lookupKeyGlobal](SBCrypto.md#lookupkeyglobal)
- [sb384Hash](SBCrypto.md#sb384hash)
- [sign](SBCrypto.md#sign)
- [str2ab](SBCrypto.md#str2ab)
- [unwrap](SBCrypto.md#unwrap)
- [verify](SBCrypto.md#verify)
- [verifyChannelId](SBCrypto.md#verifychannelid)
- [wrap](SBCrypto.md#wrap)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new SBCrypto**()

## Methods

### <a id="ab2str" name="ab2str"></a> ab2str

▸ **ab2str**(`buffer`): `string`

Standardized 'ab2str()' function, array buffer to string.
This assumes one byte per character.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Uint8Array` |

#### Returns

`string`

string

___

### <a id="addknownkey" name="addknownkey"></a> addKnownKey

▸ **addKnownKey**(`key`): `Promise`<`void`\>

SBCrypto.addKnownKey()

Adds any key to the list of known keys; if it's known
but only as a public key, then it will be 'upgraded'.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `CryptoKey` \| `JsonWebKey` \| [`SB384`](SB384.md) |

#### Returns

`Promise`<`void`\>

___

### <a id="channelkeystringstocryptokeys" name="channelkeystringstocryptokeys"></a> channelKeyStringsToCryptoKeys

▸ **channelKeyStringsToCryptoKeys**(`keyStrings`): `Promise`<[`ChannelKeys`](../interfaces/ChannelKeys.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyStrings` | [`ChannelKeyStrings`](../interfaces/ChannelKeyStrings.md) |

#### Returns

`Promise`<[`ChannelKeys`](../interfaces/ChannelKeys.md)\>

___

### <a id="comparehashwithkey" name="comparehashwithkey"></a> compareHashWithKey

▸ **compareHashWithKey**(`hash`, `key`): `Promise`<`boolean`\>

SBCrypto.compareHashWithKey()

Checks if an existing SB384Hash is 'compatible' with a given key.

Note that you CAN NOT have a hash, and a key, generate a hash
from that key, and then compare the two. The hash generation per
se will be deterministic and specific AT ANY POINT IN TIME,
but may change over time, and this comparison function will 
maintain ability to compare over versions.

For example, this comparison will accept a simple straight
b64-encoded hash without iteration or other processing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `key` | `JsonWebKey` |

#### Returns

`Promise`<`boolean`\>

___

### <a id="comparekeys" name="comparekeys"></a> compareKeys

▸ **compareKeys**(`key1`, `key2`): `boolean`

SBCrypto.compareKeys()

Compare JSON keys, true if the 'same', false if different. We consider
them "equal" if both have 'x' and 'y' properties and they are the same.
(Which means it doesn't care about which or either being public or private)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key1` | `Dictionary`<`any`\> |
| `key2` | `Dictionary`<`any`\> |

#### Returns

`boolean`

___

### <a id="derivekey" name="derivekey"></a> deriveKey

▸ **deriveKey**(`privateKey`, `publicKey`, `type`, `extractable`, `keyUsages`): `Promise`<`CryptoKey`\>

SBCrypto.deriveKey()

Derive key. Takes a private and public key, and returns a Promise to a cryptoKey for 1:1 communication.

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `CryptoKey` |
| `publicKey` | `CryptoKey` |
| `type` | `string` |
| `extractable` | `boolean` |
| `keyUsages` | `KeyUsage`[] |

#### Returns

`Promise`<`CryptoKey`\>

___

### <a id="encrypt" name="encrypt"></a> encrypt

▸ **encrypt**(`data`, `key`, `_iv?`, `returnType?`): `Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

SBCrypto.encrypt()

Encrypt. if no nonce (iv) is given, will create it. Returns a Promise
that resolves either to raw array buffer or a packaged EncryptedContents.
Note that for the former, nonce must be given.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BufferSource` |
| `key` | `CryptoKey` |
| `_iv?` | ``null`` \| `Uint8Array` |
| `returnType?` | ``"encryptedContents"`` |

#### Returns

`Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

▸ **encrypt**(`data`, `key`, `_iv?`, `returnType?`): `Promise`<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `BufferSource` |
| `key` | `CryptoKey` |
| `_iv?` | ``null`` \| `Uint8Array` |
| `returnType?` | ``"arrayBuffer"`` |

#### Returns

`Promise`<`ArrayBuffer`\>

___

### <a id="exportkey" name="exportkey"></a> exportKey

▸ **exportKey**(`format`, `key`): `Promise`<`undefined` \| `JsonWebKey`\>

SBCrypto.exportKey()

Export key; note that if there's an issue, this will return undefined.
That can happen normally if for example the key is restricted (and
not extractable).

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | ``"jwk"`` |
| `key` | `CryptoKey` |

#### Returns

`Promise`<`undefined` \| `JsonWebKey`\>

___

### <a id="extractpubkey" name="extractpubkey"></a> extractPubKey

▸ **extractPubKey**(`privateKey`): ``null`` \| `JsonWebKey`

Extracts (generates) public key from a private key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `JsonWebKey` |

#### Returns

``null`` \| `JsonWebKey`

___

### <a id="generateidkey" name="generateidkey"></a> generateIdKey

▸ **generateIdKey**(`buf`): `Promise`<{ `id`: `string` ; `key`: `string`  }\>

Hashes and splits into two (h1 and h1) signature of data, h1
is used to request (salt, iv) pair and then h2 is used for
encryption (h2, salt, iv)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buf` | `ArrayBuffer` | blob of data to be stored |

#### Returns

`Promise`<{ `id`: `string` ; `key`: `string`  }\>

___

### <a id="generatekeys" name="generatekeys"></a> generateKeys

▸ **generateKeys**(): `Promise`<`CryptoKeyPair`\>

SBCrypto.generatekeys()

Generates standard ``ECDH`` keys using ``P-384``.

#### Returns

`Promise`<`CryptoKeyPair`\>

___

### <a id="importkey" name="importkey"></a> importKey

▸ **importKey**(`format`, `key`, `type`, `extractable`, `keyUsages`): `Promise`<`CryptoKey`\>

SBCrypto.importKey()

Import keys

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `KeyFormat` |
| `key` | `BufferSource` \| `JsonWebKey` |
| `type` | ``"ECDH"`` \| ``"AES"`` \| ``"PBKDF2"`` |
| `extractable` | `boolean` |
| `keyUsages` | `KeyUsage`[] |

#### Returns

`Promise`<`CryptoKey`\>

___

### <a id="lookupkey" name="lookupkey"></a> lookupKey

▸ **lookupKey**(`key`, `array`): `number`

SBCrypto.lookupKey()

Uses compareKeys() to check for presense of a key in a list of keys.
Returns index of key if found, -1 if not found.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `JsonWebKey` |
| `array` | `JsonWebKey`[] |

#### Returns

`number`

___

### <a id="lookupkeyglobal" name="lookupkeyglobal"></a> lookupKeyGlobal

▸ **lookupKeyGlobal**(`hash`): `undefined` \| `knownKeysInfo`

SBCrypto.lookupKeyGlobal()

Given any sort of SB384Hash, returns the corresponding known key, if any

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`undefined` \| `knownKeysInfo`

___

### <a id="sb384hash" name="sb384hash"></a> sb384Hash

▸ **sb384Hash**(`key?`): `Promise`<`undefined` \| `string`\>

SBCrypto.sb384Hash()

Takes a JsonWebKey and creates the SB384Hash. Returns

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `CryptoKey` \| `JsonWebKey` |

#### Returns

`Promise`<`undefined` \| `string`\>

___

### <a id="sign" name="sign"></a> sign

▸ **sign**(`secretKey`, `contents`): `Promise`<`string`\>

SBCrypto.sign()

Sign

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKey` | `CryptoKey` |
| `contents` | `string` |

#### Returns

`Promise`<`string`\>

___

### <a id="str2ab" name="str2ab"></a> str2ab

▸ **str2ab**(`string`): `Uint8Array`

Standardized 'str2ab()' function, string to array buffer.
This assumes on byte per character.

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`Uint8Array`

buffer

___

### <a id="unwrap" name="unwrap"></a> unwrap

▸ **unwrap**(`k`, `o`, `returnType`): `Promise`<`string`\>

SBCrypto.unwrap

Decrypts a wrapped object, returns (promise to) decrypted contents
per se (either as a string or arrayBuffer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `CryptoKey` |
| `o` | [`EncryptedContents`](../interfaces/EncryptedContents.md) |
| `returnType` | ``"string"`` |

#### Returns

`Promise`<`string`\>

▸ **unwrap**(`k`, `o`, `returnType`): `Promise`<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `CryptoKey` |
| `o` | [`EncryptedContents`](../interfaces/EncryptedContents.md) |
| `returnType` | ``"arrayBuffer"`` |

#### Returns

`Promise`<`ArrayBuffer`\>

___

### <a id="verify" name="verify"></a> verify

▸ **verify**(`verifyKey`, `sign`, `contents`): `Promise`<`boolean`\>

SBCrypto.verify()

Verify signature.

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifyKey` | `CryptoKey` |
| `sign` | `string` |
| `contents` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### <a id="verifychannelid" name="verifychannelid"></a> verifyChannelId

▸ **verifyChannelId**(`owner_key`, `channel_id`): `Promise`<`boolean`\>

'Compare' two channel IDs. Note that this is not constant time.

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner_key` | `JsonWebKey` |
| `channel_id` | `string` |

#### Returns

`Promise`<`boolean`\>

___

### <a id="wrap" name="wrap"></a> wrap

▸ **wrap**(`k`, `b`, `bodyType`): `Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `CryptoKey` |
| `b` | `string` |
| `bodyType` | ``"string"`` |

#### Returns

`Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

▸ **wrap**(`k`, `b`, `bodyType`): `Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `CryptoKey` |
| `b` | `ArrayBuffer` |
| `bodyType` | ``"arrayBuffer"`` |

#### Returns

`Promise`<[`EncryptedContents`](../interfaces/EncryptedContents.md)\>
